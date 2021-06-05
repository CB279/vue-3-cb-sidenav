<template>
    <component
        :is="tag"
        :ref="label"
        side-nav-level
        class="side-nav-label"
        :style="`--level: ${level}`"
    >
        <slot :level="level" />
    </component>
</template>

<script>
import { computed, reactive, inject, onBeforeUnmount } from "vue";

export default {
    props: {
        unlink: Boolean,
        linkStyle: Object,
        tag: {
            type: String,
            default: "div",
        },
    },
    setup() {
        const state = reactive({
            height: 0,
        });

        const height = computed(() => state.el.scrollHeight);

        const self = reactive({
            height,
        });

        const __NAV_LEVEL__ = inject("__NAV_LEVEL__", undefined);
        const level = computed(() => {
            return 1 + (__NAV_LEVEL__ ? __NAV_LEVEL__.value : 0);
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

        const label = (el) => {
            if (el) {
                state.el = el;
            }
        };

        return {
            level,
            label,
        };
    },
};
</script>
