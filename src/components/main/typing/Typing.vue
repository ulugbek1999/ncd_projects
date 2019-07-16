<template>
    <div class="main-content">
        <div class="exit" @click="$router.go(-1)" style="font-size: 55px; position: absolute; color: #000; right: 20px;">&times;</div>
        <h2>What Is Touch Typing?</h2>
    </div>
</template>

<script>
export default {
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
    .main-content {
        background: {
            image: linear-gradient(right, #e1fde5, #d9e7ff)
        }
        height: 100%;
        color: rgb(10, 48, 218);
    }

    .exit {
        opacity: 0.8;
    }

    .exit:hover {
        cursor: pointer;
        opacity: 1;
    }
</style>
