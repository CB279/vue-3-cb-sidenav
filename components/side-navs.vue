<template>
    <div class=".cb--side-navs">
        <slot />
    </div>
</template>

<script>
import { provide, reactive } from "vue";

export default {
    props: {
        autoClose: Boolean
    },
    setup(props) {
        const state = reactive({
            level: 0,
            _uid: null,
            update: 0
        });

        const option = {
            props,
            state
        };

        provide("__NAVS__", option);
    }
};
</script>
