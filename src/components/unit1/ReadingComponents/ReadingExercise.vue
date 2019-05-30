<template>
    <div style="position: absolute">
        <tests class="tests_container"></tests>
    </div>
</template>

<script>
import Tests from './ReadingTests'

export default {
    data () {
        return {

        }
    },
    components: {
        tests: Tests
    }
}
</script>

<style scoped>
    .tests_container {
        width: 820px;
        height: 420px;
        box-shadow: 0 0 10px lightgray;
        position: relative;
        top: 50px;
        left: 90px;
        background-color: #fff;
        padding: 10px 20px;
    }

    @media screen and (max-width: 1000px) {
        .tests_container {
            top: unset;
            left: unset;
            margin: 50px 5vw;
            width: 89vw;
        }
    }
</style>
