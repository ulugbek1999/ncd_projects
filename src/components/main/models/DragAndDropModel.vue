<template>
    <div class="main">
        <div class="exit" @click="goBack" style="font-size: 55px; position: absolute; color: #fff; right: 20px;">&times;</div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {
        goBack () {
            this.$router.go(-1)
        }
    },
    created () {
        $('html').css('height', '2000px')
        $('html').css('overflow-y', 'hidden')
        $("html, body").animate({ scrollTop: 0 }, "fast");
    },
    destroyed () {
        $('html').css('height', '100%')
        $('html').css('overflow-y', 'unset')
    }
}
</script>

<style lang="scss" scoped>

    .main {
        height: 100% !important;
        background: {
            repeat: no-repeat;
            image: linear-gradient(right, #01cefd, #394ad5);
        }
    }

    .exit {
        opacity: 0.8;
        transition: opacity .3s ease;
    }

    .exit:hover {
        cursor: pointer;
        opacity: 1;
    }


</style>
