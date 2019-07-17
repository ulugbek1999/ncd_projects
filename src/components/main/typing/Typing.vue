<template>
    <div class="main-content" >
        <div class="exit" @click="$router.go(-1)" style="font-size: 55px; position: absolute; color: #000; right: 20px;">&times;</div>
        <div class="placeholder">
            <header>
                <div class="logo_holder">
                    <div class="logo" :style="{backgroundImage: 'url(' + require('@/assets/logo_login.svg') + ')'}"></div>
                </div>
                <nav class="desktop">
                    <div class="course">
                        <img :src="require('@/assets/main/Typing/keyboard.png')" style="width: 40px; height: 40px; margin-right: 10px;"  alt="">
                        <h3>TypingCourse</h3>
                    </div>
                </nav>
                <div class="layers">
                    <div class="layer1"></div>
                    <div class="layer2"></div>
                </div>
            </header>
            <main>
                <router-view></router-view>
            </main>
            <footer>
                <div class="layer3"></div>
                <div class="navigators">
                    <div class="navigator home_navigator" :style="{backgroundImage: 'url(' + require('@/assets/main/Typing/navigation_button_small_bottom.png') + ')'}">Home</div>
                    <div class="navigator back_navigator" :style="{backgroundImage: 'url(' + require('@/assets/main/Typing/navigation_button_small_bottom.png') + ')'}">Back</div>
                    <div class="page_counter">1/5</div>
                    <div class="navigator next_navigator" :style="{backgroundImage: 'url(' + require('@/assets/main/Typing/navigation_button_small_bottom.png') + ')'}" @click="next">Next</div>
                </div>
            </footer>
        </div> 
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    created () {
        document.body.addEventListener('keyup', this.keyListener)
        $('html').css('height', '2000px')
        $('html').css('overflow-y', 'hidden')
        $("html, body").animate({ scrollTop: 0 }, "fast");
    },
    destroyed () {
        $('html').css('height', '100%')
        $('html').css('overflow-y', 'unset')
    },
    methods: {
        keyListener (event) {
            if (event.key === "OS" || event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Control")
                return
            eventBus.$emit('keyEvent', event.key)
            // console.log("working")
            // if (event.key == this.splitedText[0]) {
            //     this.splitedText.shift()
            // }
            // else if ((this.splitedText[0] == '\r' && this.splitedText[1] == '\n') && event.key == "Enter") {
            //     this.splitedText.shift()
            //     this.splitedText.shift()
            // }
            // else if ((this.splitedText[0] == '\n' || this.splitedText[0] == '\r') && event.key == "Enter") {
            //     this.splitedText.shift()
            // }
        },
        next () {
            eventBus.$emit('next')
        }
    },
    data() {
        return {
            splitedText: null
        }
    },
    mounted () {
        var string = `-The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
Need more than one paragraph? You can specify how many paragraphs you need by changing the first number in the Rand statement. For example, if you needed two paragraphs (with five sentences in each one), you could type this`
        this.splitedText = string.replace(/ +/g, ' ').split('')
    },
    watch: {
        splitedText () {
            if (this.splitedText.length == 0) {
                alert("finished")
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Courgette&display=swap');

    .main-content {
        background: {
            image: linear-gradient(right, #e1fde5, #d9e7ff)
        }
        height: 100%;
    }

    .logo_holder {
        position: relative;
        z-index: 20;
        width: 105px;
        height: 70px;
        background-color: #1f25af;
        padding-top: 3px;
        float: left;
    }

    .page_counter {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
        margin-left: -10px;
    }

    footer {
        position: relative;
        top: 520px;
        left: 270px;
    }

    .layer3 {
        height: 10px;
        width: 730px;
        background-color: #1f25af;
    }

    .navigator {
        background-size: auto 50px;
        background-repeat: no-repeat;
        width: 90px;
        height: 100px;
        margin-left: -20px;
        text-align: center;
        padding-left: 10px;
        opacity: 0.9;
        transition: all .1s ease;
        color: #fff
    }

    .navigator:hover {
        cursor: pointer;
        opacity: 1;
    }

    .course {
        float: right;
        margin-right: 130px;
        margin-top: 12px;
        display: flex;
    }

    .course h3 {
        font: {
            family: 'Courgette', cursive;
        }
        color: #fff;
        padding-top: 5px;
    }


    .logo {
        position: absolute;
        background-repeat: no-repeat;
        background-size: auto 38px;
        width: 115px;
        height: 60px;
        margin-top: 12px;
        left: 20px;
    }

    .navigators {
        position: absolute;
        display: flex;
        left: 435px;
    }

    .navigators div {
        margin-right: 20px;
        padding-top: 11px;
    }

    .layers {
        position: relative;
        top: 3px;
        display: flex;
        width: 100%;
    }

    .nav-link {
        clip-path: polygon(16% 80%, 91% 80%, 79% 100%, 0% 100%);
        background-color: white;
        display: inline-block;
    }

    .layer1 {
        width: 100px;
        height: 5px;
        background-color: #fc6188;
    }

    .layer2 {
        margin-left: 80px;
        width: 100%;
        height: 5px;
        background-color: #fc6188;
    }

    nav.desktop {
        background-color: #1f25af;
        width: 100%;
        height: 70px;
        position: relative;
        left: 102px;
    }

    .placeholder {
        position: relative;
        margin: 0 auto;
        top: 50px;
        max-width: 1000px;
        height: 650px;
        box-shadow: 0 0 10px lightblue;
        background-color: #f6f6e9;
        overflow: hidden;
    }

    .exit {
        opacity: 0.8;
    }

    .exit:hover {
        cursor: pointer;
        opacity: 1;
    }
</style>
