<template>
    <div :class="['cb--side-nav', activeClass]" :level="level">
        <a
            :ref="link"
            class="side-nav-link"
            :href="to"
            side-nav-level
            :style="{ '--level': level, ...linkStyle }"
            @click.prevent="go"
        >
            <slot :active="active" :level="level" />
        </a>
        <div
            :class="['side-nav-collapse', isToggle]"
            :level="level"
            :style="{ height: heightCollapse + 'px' }"
            v-if="isChildren"
        >
            <slot name="children" :level="level" />
        </div>
    </div>
</template>

<script>
import {
    getCurrentInstance,
    computed,
    provide,
    reactive,
    inject,
    onMounted,
    onBeforeUnmount,
    watch,
    watchEffect,
} from "vue";
import { useRouter, RouterLink, useRoute, useLink } from "vue-router";

export default {
    props: {
        ...RouterLink.props,
        unlink: Boolean,
        linkStyle: Object,
    },
    setup(props, { slots }) {
        const router = useRouter();
        const r = useRoute();
        const { isActive } = useLink(props);

        const active = computed(() => {
            if (isChildren.value) {
                return new RegExp(`${props.to}/(.*)`).test(r.fullPath);
            } else {
                return isActive.value;
            }
        });

        const isChildren = computed(() => !!slots.children);

        const state = reactive({
            toggle: false,
            children: [],
            collapse: null,
            el: null,
        });

        const heightCollapse = computed(() =>
            state.toggle ? state.children.reduce((a, b) => a + b.height, 0) : 0
        );

        const height = computed(
            () => state.el.scrollHeight + heightCollapse.value
        );

        const __NAV_LEVEL__ = inject("__NAV_LEVEL__", undefined);
        const level = computed(() => {
            return 1 + (__NAV_LEVEL__ ? __NAV_LEVEL__.value : 0);
        });

        const self = reactive({
            active,
            isChildren,
            height,
            level,
        });

        const __NAV_CHILDDEN__ = inject("__NAV_CHILDDEN__", undefined);
        if (__NAV_CHILDDEN__) {
            __NAV_CHILDDEN__(self);
        }

        onBeforeUnmount(() => {
            if (__NAV_CHILDDEN__) {
                __NAV_CHILDDEN__(self);
            }
        });

        const update = () => {
            if (isChildren.value) {
                state.toggle = state.children.find((c) => c.active);
            }
        };

        if (isChildren.value) {
            const __NAVS__ = inject("__NAVS__", undefined);
            const uid = getCurrentInstance().uid;

            if (__NAVS__) {
                watchEffect(() => {
                    const toggle_uid = __NAVS__.state._uid;
                    if (
                        toggle_uid &&
                        toggle_uid != uid &&
                        __NAVS__.state.level == level.value
                    ) {
                        state.toggle = false;
                    }
                });
            }

            watch(
                () => state.toggle,
                () => {
                    if (
                        state.toggle &&
                        __NAVS__ &&
                        __NAVS__.props.autoClose &&
                        state.toggle
                    ) {
                        __NAVS__.state.level = level.value;
                        __NAVS__.state._uid = uid;
                    }
                }
            );

            const navChild = (child) => {
                const c = state.children.find((c) => c === child);
                if (c) {
                    state.children.splice(state.children.indexOf(c), 1);
                } else {
                    state.children.push(child);
                }
            };

            provide("__NAV_LEVEL__", level);
            provide("__NAV_CHILDDEN__", navChild);

            onMounted(() => {
                update();
            });
        }

        const link = (el) => {
            if (el) {
                state.el = el;
            }
        };

        const activeClass = computed(() =>
            active.value ? (isChildren.value ? "ex-active" : "active") : ""
        );

        const isToggle = computed(() => (state.toggle ? "collapsed" : ""));

        const go = () => {
            if (isChildren.value) {
                state.toggle = !state.toggle;
            }
            if (!props.unlink) {
                router.push(props.to);
            }
        };

        return {
            level,
            heightCollapse,
            link,
            isChildren,
            active,
            activeClass,
            isToggle,
            go,
            update,
        };
    },
};
</script>
