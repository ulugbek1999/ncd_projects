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
                <div class="row">
                    <div class="col">
                        <router-view></router-view>
                    </div>
                    <div class="col-md-3">
                        <div class="indicators" v-if="exerciseActivated">
                            <div class="timer-container">
                                <div style="display: flex; justify-content: center; flex-direction: row">
                                    <span class="indicator-text">TIME LEFT</span>
                                </div>
                                
                                <div class="timer">{{ timer }}</div>
                            </div>
                            <div class="speed-indicator">
                                <div style="display: flex; justify-content: center; flex-direction: row">
                                    <span class="indicator-text">TYPING SPEED</span>
                                </div>
                                <div class="speed-container">
                                    <div class="speed">
                                        {{ speed }}<br>
                                        <span class="secondary">WPM</span>
                                    </div>
                                </div>
                            </div>
                            <div class="error-indicator">
                                <div>
                                    <div style="display: flex; justify-content: center;">
                                        <span class="indicator-text">ACCURACY</span>
                                    </div>
                                    <div class="error-container">
                                        <div class="error">
                                            {{ accuracy }}<br>
                                            <span class="secondary">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div class="layer3"></div>
                <div class="navigators">
                    <div class="navigator home_navigator" @click="$router.push({name: 'MainPage'})" :style="{backgroundImage: 'url(' + require('@/assets/main/Typing/navigation_button_small_bottom.png') + ')'}">Home</div>
                    <div class="navigator back_navigator" :style="{backgroundImage: 'url(' + require('@/assets/main/Typing/navigation_button_small_bottom.png') + ')'}" @click="back">Back</div>
                    <div class="page_counter">{{ typingCurrent }}/{{ typingPage }}</div>
                    <div class="navigator next_navigator" :style="{backgroundImage: 'url(' + require('@/assets/main/Typing/navigation_button_small_bottom.png') + ')'}" @click="next">Next</div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/main'
import { mapState } from 'vuex'
export default {
    created () {
        document.body.addEventListener('keyup', this.keyListener)
        $('html').css('height', '2000px')
        $('html').css('overflow-y', 'hidden')
        $("html, body").animate({ scrollTop: 0 }, "fast");
        eventBus.$on('activate', data => {
            this.type = data
            $('.indicators').css('display', 'block')
            this.exerciseActivated = true
        })
        eventBus.$on('error', () => {
            this.errors++
        })
        eventBus.$on('start', goal => {
            this.accuracyRequired = goal
        })
        eventBus.$on('disactivate', () => {
            this.exerciseActivated = false
            var interval_id = window.setInterval("", 9999);
            for (var i = 1; i < interval_id; i++)
                window.clearInterval(i);

            var id = window.setTimeout(function() {}, 0);
            while (id--) {
                window.clearTimeout(id); // will do nothing if no timeout with id is present
            }
            this.minutes = 1
        })
    },
    destroyed () {
        $('html').css('height', '100%')
        $('html').css('overflow-y', 'unset')
    },
    methods: {
        keyListener (event) {
            if (this.exerciseActivated) {
                this.characters++
                if (event.key == " ") {
                    this.spaces++
                }
            }
            if (event.key === "OS" || event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Control" || event.key === "Shift")
                return
            eventBus.$emit('keyEvent', event.key)
        },
        playAudio (event) {
            event.target.play()
        },
        next () {
            eventBus.$emit('next')
        },
        launchTimer () {
            setTimeout(() => {
                var obj = {
                    errors: this.errors,
                    speed: this.speed,
                    accuracy: this.accuracy,
                    goal: this.accuracyRequired
                }
                this.$store.commit('typingResultsSetter', obj)
                this.exerciseActivated = false
                this.$store.commit('typingCurrentPageSetter')
                this.minutes = 1
                this.seconds = 0
                this.$router.push({name: 'typing-result'})
            }, (this.minutes * 60 + this.seconds) * 1000)
            var interval = setInterval(() => {
                if (this.seconds == 0) {
                    if (this.minutes == 0) {
                        clearInterval(interval)
                    }
                    else {
                        this.minutes--
                        this.seconds = 59
                    }
                } 
                else
                    this.seconds--
            }, 1000)
        },
        speedChanger () {
            var interval = setInterval(() => {
                this.secondsPassed += 1
                this.speed = Math.floor(this.spaces * 60 / this.secondsPassed)
            }, 1000);
        },
        back () {
            eventBus.$emit('back')
        },
        accuracyChanger () {
            var interval = setInterval(() => {
                if (this.characters == 0 || this.spaces == 0)
                    this.accuracy = 0
                else
                    if (this.type === "charType") {
                        this.accuracy = Math.floor((this.characters - this.errors) / this.characters * 100)
                    }
                    else {
                        this.accuracy = Math.floor((this.spaces - this.errors) / this.spaces * 100)
                    }
            }, 1000)
        }
    },
    data() {
        return {
            splitedText: null,
            minutes: 1,
            spaces: 0,
            seconds: 0,
            secondsPassed: 0,
            speed: 0,
            exerciseActivated: false,
            errors: 0,
            characters: 0,
            accuracy: 0,
            type: null,
            accuracyRequired: null
        }
    },
    mounted () {
        this.$nextTick(() => {

        })
    },
    watch: {
        exerciseActivated () {
            if (this.exerciseActivated == true) {
                this.launchTimer()
                this.speedChanger()
                this.accuracyChanger()
            }
            else {
                var interval_id = window.setInterval("", 9999);
                for (var i = 1; i < interval_id; i++)
                    window.clearInterval(i);
            }
        }
    },
    computed: {
        timer () {
            var timer = "";
            if (this.seconds < 10)
                timer = this.minutes + ":" + '0' + this.seconds
            else
                timer = this.minutes + ":" + this.seconds
            return timer
        },
        ...mapState(['typingResult', 'typingPage', 'typingCurrent'])
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Courgette&display=swap');

    .indicators {
        position: absolute;
        right: 45px;
        top: 50px;
    }

    .indicator-text {
        font-size: 13px;
        color: #4747a3;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
    }

    .secondary {
        color: #000;
        position: relative;
        top: -10px;
        font: {
            family: Verdana, sans-serif;
            size: 14px;
        }
    }

    .timer {
        padding: 5px 10px 5px;
        font: {
            family: Verdana, sans-serif;
            size: 24px;
        }
        margin-top: 10px;
        color: #4747a3;
        box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.36);
        border-radius: 5px;
        border: 1px solid gray;
        background-color: white;
        margin-bottom: 40px;
        text-align: center;
    }

    .speed-container {
        @extend .timer;
    }

    .error-container {
        @extend .timer
    }

    .main-content {
        background-image: linear-gradient(right, #e1fde5, #d9e7ff);
        background-image: -moz-linear-gradient(right, #e1fde5, #d9e7ff);
        background-image: -webkit-linear-gradient(right, #e1fde5, #d9e7ff);
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
