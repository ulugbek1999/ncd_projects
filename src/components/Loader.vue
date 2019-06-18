<template>
    <div class="loader">
        <loader :color="color" size="10px"></loader>
    </div>
</template>


<script>
import Loader from 'vue-spinner/src/ScaleLoader'
export default {
    components: {
        Loader,
    },
    data () {
        return {
            color: "#4737ff",
        }
    }
}
</script>

<style lang="scss" scoped>
    .loader {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        padding-top: 22%;
    }
</style>
