<template>
    <div
        :class="['side-nav-collapse', toggleClass]"
        :level="level"
        :style="{ height: heightCollapse + 'px' }"
    >
        <slot />
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
    watch,
    watchEffect
} from "vue";

export default {
    setup() {
        const state = reactive({
            toggle: false,
            children: []
        });

        const heightCollapse = computed(() => {
            const h = state.toggle
                ? state.children.reduce((a, b) => a + b.height, 0)
                : 0;
            console.log(
                "state.children",
                state.children[0] && state.children[0].height,
                h
            );
            return h;
        });

        const __NAV_LEVEL__ = inject("__NAV_LEVEL__", undefined);
        const level = computed(() => {
            return 1 + (__NAV_LEVEL__ ? __NAV_LEVEL__.value : 0);
        });

        const update = () => {
            state.toggle = state.children.find(c => c.active);
        };

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

        const navChild = child => {
            const c = state.children.find(c => c === child);
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

        const toggleClass = computed(() => (state.toggle ? "collapsed" : ""));

        return {
            level,
            heightCollapse,
            toggleClass,
            update
        };
    }
};
</script>
