<template>
    <div class="listen-and-read">
        <div v-if="stage == 'listening'">
            <div class="wrapper">
                <div style="width: 80%; margin: 0 auto;">
                    <!-- <img class="headphone" src="@/assets/main/DragAndDrop/headphone.png" alt=""><br> -->
                    <h1>Listen and restore dialog</h1>
                </div>
                <div class="audio-controls">
                    <div style="position: absolute; left: 0; right: 0;">
                        <img :src="require('@/assets/main/DragAndDrop/pause.png')" v-if="audioPlayed" class="play-pause" alt="">
                        <img :src="require('@/assets/main/DragAndDrop/play.png')" v-else class="play-pause play" alt="">
                    </div> 
                    <svg class="audio-skeleton" width="210" height="210" @click="playStopAudio">
                        <circle class="path" cx="50%" cy="50%" r="100" fill="transparent"></circle>
                        <circle class="trail" cx="50%" cy="50%" r="100" fill="transparent"></circle>
                    </svg>
                    <audio id="audio-record" preload="auto" src="https://ncd-interlingvo.herokuapp.com/static/english-file/audios/unit-1/restore.mp3"></audio>
                </div>
            </div>
            <button class="start" @click="next">Start exercise</button>
        </div>
        <div v-if="stage == 'exercise'">
            <div class="hearts">
                <img :src="require('@/assets/main/heart.png')" v-for="(life, index) in lifes" :key="'life-' + index" alt="" class="heart">
                <img :src="require('@/assets/main/heart.png')" v-for="(life, index) in (totalLifes - lifes.length)" :key="'life-lost-' + index" alt="" class="heart life-lost">
            </div>
            <div class="disabler">

            </div>
            <div class="ex-container">
                <div class="item" v-for="(ex, index) in exData" :key="'dragger-' + index" :data-order="ex.order"><b v-html="ex.header"></b>{{ ex.main }}</div>
            </div>
            <div class="check-container">
                <button class="check" @click="checkOrder" v-if="!showAnswersState">
                    Check
                </button>
                <button class="continue" @click="continueEx" v-if="showAnswersState && !completed">
                    Continue
                </button>
            </div>
        </div>
        <div v-if="stage == 'failed'">
            <img :src="require('@/assets/main/failed.png')" alt="" class="fail-img">
            <h3 style="margin-top: 50px; color: #fff">To many incorrect attempts :(</h3>
            <button class="retry" @click="retry">
                Retry
            </button>
        </div>
        <div class="completed" v-if="stage == 'completed'">
            <div class="congratulate" style="text-align: center; padding: 70px">
                <img :src="require('@/assets/main/Model/congratulate.png')" alt="" class="congratulate-image">
                <h3 style="margin-top: 20px; font-weight: bold; letter-spacing: 1px; color: #0c0">Congratulations!</h3>
                <p style="color: #555; font-size: 16px; margin-top: 30px">You have successfully <br> answered all questions! Keep going...</p>
                <button @click="$router.go(-1)" style="margin-top: 80px" class="return-back">Continue</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Sortable } from '@shopify/draggable'

export default {
    data () {
        return {
            stage: 'listening',
            audioPlayed: false,
            audioDuration: null,
            dashoffset: null,
            lifes: [1, 2, 3],
            totalLifes: 3,
            showAnswersState: false,
            completed: false,
            exData : [
                {
                    header: "Receptionist: ",
                    main: "Hello. what's your name?",
                    order: 1
                },
                {
                    header: "Tom: ",
                    main: "Tom.",
                    order: 2
                },
                {
                    header: "Receptionist: ",
                    main: "Are you Tom Banks?",
                    order: 3
                },
                {
                    header: "Tom: ",
                    main: "No, I'm not. I'm Tom King.",
                    order: 4
                },
                {
                    header: "Receptionist: ",
                    main: "You're in room 2.",
                    order: 5
                },
                {
                    header: "Tom: ",
                    main: "What?",
                    order: 6
                },
                {
                    header: "Receptionist: ",
                    main: "You are in room 2.",
                    order: 7
                },
                {
                    header: "Tom: ",
                    main: "Ok. Thank you!",
                    order: 8
                }
            ]
        }
    },
    methods: {
        next () {
            $('.listen-and-read').addClass('fadeOut')
            $('.listen-and-read').removeClass('fadeIn')
            setTimeout(() => {
                this.stage = "exercise"
                $('.listen-and-read').removeClass('fadeOut')
                $('.listen-and-read').addClass('fadeIn')
            }, 1000)
            setTimeout(() => {
                this.dragger()
            }, 1001)
        },
        playStopAudio () {
            const trail = $('.trail')
            var dashoffset = 628;
            var duration = this.audioDuration
            console.log(this.audioDuration)
            var percent = 100 / duration;
            var do_proportion = dashoffset * percent / 100
            var intervals = []
            var audio = $('#audio-record')
            if (this.audioPlayed === true) {
                audio[0].pause()
                audio[0].currentTime = 0
                $('.trail').css('stroke-dashoffset', '628px')
                this.audioPlayed = false
                var interval_id = window.setInterval("", 9999);
                for (var i = 1; i < interval_id; i++)
                        window.clearInterval(i);
            }
            else {
                audio[0].play()
                this.audioPlayed = true
                var trailChanger = setInterval(() => {
                    dashoffset -= (do_proportion + 1) / 10
                    $('.trail').css('stroke-dashoffset', '' + dashoffset + 'px')
                    if (dashoffset <= 0) {
                        dashoffset = 0
                        clearInterval(trailChanger)
                    }      
                }, 100);
                setTimeout(() => {
                    audio[0].pause()
                    audio[0].currentTime = 0
                    $('.trail').css('stroke-dashoffset', '628px')
                    this.audioPlayed = false
                    var interval_id = window.setInterval("", 9999);
                    for (var i = 1; i < interval_id; i++)
                            window.clearInterval(i);
                }, (this.audioDuration + 2) * 1000)
            }
            
        },
        preloadMetadata () {
            var audio = $('#audio-record')[0]
            audio.addEventListener('loadedmetadata', () => {
                this.audioDuration = audio.duration
            })
        },
        shuffle (array) {
            return array.sort(() => Math.random() - 0.5)
        },
        continueEx () {
            $('.ex-container').removeClass('fadeIn')
            $('.ex-container').addClass('fadeOut')
            this.showAnswersState = false
            setTimeout(() => {
                Array.from($('.item')).forEach(element => {
                    $(element).css('pointer-events', 'unset')
                    $('.ex-container').removeClass('fadeOut')
                    $('.ex-container').addClass('fadeIn')
                    $(element).css('border-left', 'unset')
                })
            }, 1000)
        },
        checkOrder () {
            var counter = 1;
            var corrects = 0;
            this.showAnswersState = true
            $('.ex-container').removeClass('fadeIn')
            $('.ex-container').addClass('fadeOut')    
            setTimeout(() => {
                Array.from($('.item')).forEach(element => {
                    $(element).css('pointer-events', 'none')
                if (element.dataset.order == counter) {
                    $(element).css('border-left', '4px solid rgb(3, 255, 3)')
                    corrects++
                }
                else {
                    $(element).css('border-left', '4px solid #FF5B61')
                }
                counter++
                })
                if (corrects == this.exData.length) {
                    this.completed = true
                    setTimeout(() => {
                        $('.hearts').css('display', 'none')
                        $('.listen-and-read').removeClass('fadeIn')
                        $('.listen-and-read').removeClass('fadeInRight')
                        $('.listen-and-read').addClass('fadeOutLeft')
                    }, 2000)
                    setTimeout(() => {
                        
                        this.stage = "completed"
                        $('.listen-and-read').removeClass('fadeOutLeft')
                        $('.listen-and-read').addClass('fadeInRight')
                    }, 3000)
                }
                else {
                    if (this.lifes.length == 1) {
                        this.stage = 'failed'
                    }
                    else {
                        this.lifes.pop()
                    }
                }
                $('.ex-container').removeClass('fadeOut')
                $('.ex-container').addClass('fadeIn')
            }, 1000)
            
        },
        dragger () {
            var draggable = new Sortable(document.querySelectorAll('.ex-container'), {
                draggable: '.item'
            })
        },
        draggers () {
            return this.shuffle(this.exData)
        },
        retry () {
            $('.listen-and-read').removeClass('fadeIn')
            $('.listen-and-read').addClass('fadeOut')
            setTimeout(() => {
                $('.listen-and-read').removeClass('fadeOut')
                $('.listen-and-read').addClass('fadeIn')
                this.stage = "listening",
                this.lifes = [1, 2, 3]
            }, 1000)
        }
    },
    created () {
       
    },
    mounted () {
        this.$nextTick(() => {
            this.dragger()
            this.preloadMetadata()
           this.shuffle(this.exData)
        })
    },
    destroyed () {
        $('.trail').css('stroke-dashoffset', '628px')
        this.audioPlayed = false
        var interval_id = window.setInterval("", 9999);
        for (var i = 1; i < interval_id; i++)
                window.clearInterval(i);
    },
    watch: {
        stage: function () {
            
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>

    .play-pause {
        width: 80px;
        left: 0px;
        position: relative;
        top: 80px;
    }

    .play {
        left: 10px;
    }

    .congratulate-image {
        width: 100px;
    }

    .congratulate {
        height: 100%;
        width: 800px;
        height: 500px !important;
        background-color: #f8f8f8;
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(126, 125, 125);
    }

    .disabler {
        position: absolute;
        width: inherit;
        height: inherit;
    }

    .return-back {
        background-color: #28a745;
        font-size: 20px;
        border: none;
        color: #fff;
        padding: 5px 65px;
        border-radius: 20px;
        opacity: 0.7;
        transition: opacity .3s ease;
    }

    .return-back:hover {
        opacity: 1;
    }

    .fail-img {
        width: 100px;
    }

    .hearts {
        display: flex;
        position: absolute;
        left: 20px;
        top: 30px
    }

    .heart {
        width: 20px;
        margin-right: 5px;
    }

    .life-lost {
        opacity: 0.5;
    }

    .item {
        width: 930px;
        background: rgba(255, 255, 255, 0.1);
        text-align: left;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        margin: 20px 0;
        color: #fff;
        font-size: 20px;
        padding: 10px;
    }

    .ex-container {
        height: 500px;
        overflow-y: scroll;
    }

    .item:hover {
        cursor: pointer;
    }
  
    .draggable-mirror {
        width: 930px;
        padding: 10px;
        transform: translate3d(0)
    }

    .draggable-source--is-dragging {
        opacity: 0;
    }

    .check {
        margin-top: 50px;
        font: {
            size: 25px;
            weight: 500px;
        }
        padding: 5px 25px;
        border: 1px solid #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

    .continue {
        @extend .check;
    }

    .retry {
        @extend .check;
        margin-top: 200px;
    }

    ul > li {
        width: 100px;
        height: 20px;
        background-color: #fff;
        margin-bottom: 40px;
    }

    .listen-and-read {
        padding-top: 90px;
        margin: 0 auto;
        max-width: 960px;
        text-align: center;
    }

    .listen-and-read h1 {
        color: #fff;
        font-family: 'Patua One', sans-serif;
    }

    .headphone {
        width: 70px;
        float: right;
    }

    .start {
        font-size: 40px;
        border-radius: 5px;
        padding: 10px 50px;
        margin-top: 150px;
        transition: opacity .3s ease;
        opacity: 0.8;
        border: none;
        color: #fff;
        background-color: #0f1675cc;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
    }

    .start:hover {
        opacity: 1;
    }

    .start:focus {
        outline: none;
    }

    .listen-and-read h2 {
        color: #fff;
        font-size: 'Arial', sans-serif;
    }

    .listen-and-read h4 {
        color: rgb(204, 195, 195)
    }

    .audio-skeleton {
        position: relative;
        top: 15px;
        cursor: pointer;
    }
    

    .audio-controls {
        margin-top: 60px;
    }

    .path {
        stroke: rgba(233, 222, 222, 0.589);
        stroke-width: 4px;
        stroke-dashoffset: 0;
        stroke-dasharray: 628px;
    }

    .trail {
        transform-origin: center;
        transform: rotate(-90deg);
        stroke: #fff;
        stroke-width: 4px;
        stroke-dashoffset: 628px;
        stroke-dasharray: 628px;
        transition: stroke-dashoffset .10s ease-in;
    }

    .opacityZ {
        opacity: 0;
    }

    .playing {
        animation-name: playing;
        animation-duration: 53s;
    }
    

    @keyframes playing {
        from {
            stroke-dashoffset: 628px;
        }
        to {
            stroke-dashoffset: 0;
        }
    }

</style>
