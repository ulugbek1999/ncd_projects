<template>
    <div id="listen-and-repeat">
        <div style="width: inherit; height: inherit; position: absolute; text-align: center" v-if="!completed">
            <img src="@/assets/main/Model/speaker.png" alt="" class="speaker">
            <h5 class="how-many-left">Cards: {{ this.currentIndex + 1 }} out of <span>{{ numberOfQuestions }}</span></h5>
            <div>
                <svg version="1.1" @click="playStopAudio" id="play" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="100px" width="100px"
                viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <path class="stroke-solid" v-if="!audioPlayed" fill="none" stroke="rgb(18, 108, 239)"  d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
                        C97.3,23.7,75.7,2.3,49.9,2.5"/>
                    <path class="stroke-dotted" v-else fill="none" stroke="rgb(18, 108, 239)"  d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
                        C97.3,23.7,75.7,2.3,49.9,2.5"/>
                    <path class="icon" fill="rgb(18, 108, 239)" d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"/>
                </svg>
                <input type="text" v-model="repeatInput" @keypress="pressedEnter" class="form-control repeat-input" :class="{'disabled' : correctness == 'correct'}" id="repeat-input">
                <img v-if="correctness == 'correct'" src="@/assets/main/Model/correct.png" alt="" class="correct-icon">
                <label for="repeat-input">Type the phrase from the audio</label>
                <div class="alert alert-success" v-if="correctness == 'correct'">Correct! Well done.</div>
                <div class="alert alert-danger" v-else-if="correctness == 'incorrect'">Incorrect! Try again...</div>
            </div>
            <button class="check-and-next btn btn-primary" v-if="correctness != 'correct'"  @click="checkCorrectness">Check</button>
            <button class="check-and-next btn btn-primary" v-else @click="switchNext">Next</button>
            <button class="skip btn btn-danger" @click="switchNext" v-if="correctness != 'correct'">Skip</button>
            <button class="skip btn btn-danger" @click="switchPrevious" v-else>Previous</button>
        </div>
        <div v-else class="congratulate" style="text-align: center; padding: 70px">
            <img :src="require('@/assets/main/Model/congratulate.png')" alt="" class="congratulate-image">
            <h3 style="margin-top: 20px; font-weight: bold; letter-spacing: 1px; color: #0c0">Congratulations!</h3>
            <p style="color: #555; font-size: 16px; margin-top: 30px">You have successfully <br> answered all questions! Keep going...</p>
            <button @click="goBack" style="margin-top: 80px" class="return-back">Continue</button>
        </div>
        <audio id="lar-audio" preload="metadata" v-if="!completed">
            <source :src="statusActiveQuestions[currentIndex].audio_link"/>
        </audio>
        
    </div>
</template>

<script>
import { eventBus } from '../../../main'
export default {
    mounted () {
        this.$nextTick(() => {
            eventBus.$on('next', () => {
                this.switchNext()
            })
            eventBus.$on('previous', () => {
                this.switchPrevious()
            })
            this.$store.dispatch('modelInfoDispatcher', {name: 'Listen and Repeat', color: 'rgb(73, 223, 19)'})
        })
    },
    created () {
        this.setDataEnglishFile()
    },
    data () {
        return {
            correctness: '',
            repeatInput: '',
            statusActiveQuestions: null,
            currentIndex: 0,
            audioPlayed : false
        }
    },
    methods: {
        playStopAudio () {
            var audio = $('audio')[0]
            var duration = this.statusActiveQuestions[this.currentIndex].audio_duration
            if (this.audioPlayed == false) {
                audio.load()
                audio.play()
                this.audioPlayed = true
                this.playerOff((duration + 1) * 1000)
            }
            else if (this.audioPlayed) {
                audio.pause()
                audio.currentTime = 0
                this.audioPlayed = false
                this.clearAllTimeOuts()
            }
        },
        playerOff (timeout) { 
            setTimeout(() => {
                this.audioPlayed = false
                this.clearAllTimeOuts()
            }, timeout)        
        },
        checkCorrectness () {
            var correctAnswers = this.statusActiveQuestions[this.currentIndex].lar_corrects
            for (let index = 0; index < correctAnswers.length; index++) {
                if (correctAnswers[index] == this.repeatInput) {
                    this.correctness = "correct"
                    break
                    return
                }
                this.correctness = "incorrect"
            }
            if (this.correctness == "correct" && this.statusActiveQuestions.length == 1) {
                this.completed = true
                this.statusActiveQuestions.splice(this.currentIndex, 1)
            }
        },
        pressedEnter (event) {
            if (event.keyCode == 13)
                this.checkCorrectness()
                if (this.correctness == "correct")
                    $(event.target).blur()
        },
        setDataEnglishFile () {
            const data = this.$store.state.englishFile[this.$route.params.id - 1].listening.listen_and_repeat_exercise
            this.statusActiveQuestions = data
        },
        switchNext () {
            $('#lar-audio')[0].pause()
            $('#lar-audio')[0].currentTime = 0
            this.audioPlayed = false
            this.clearAllTimeOuts()
            if (this.currentIndex < this.statusActiveQuestions.length - 1) {
                $('#listen-and-repeat').addClass('fadeOutLeft')
                $('#listen-and-repeat').removeClass('fadeInRight')
                setTimeout(() => {
                    if (this.correctness == "correct") {
                        this.statusActiveQuestions.splice(this.currentIndex, 1)
                    }
                    else 
                        this.currentIndex ++
                    this.correctness = ""
                    $('#listen-and-repeat').addClass('fadeInRight')
                    $('#listen-and-repeat').removeClass('fadeOutLeft')
                }, 1000)
                this.repeatInput = ""
            }
            else if (this.currentIndex = this.statusActiveQuestions.length - 1) {
                 $('#listen-and-repeat').addClass('fadeOutLeft')
                $('#listen-and-repeat').removeClass('fadeInRight')
                setTimeout(() => {
                    if (this.correctness == 'correct')
                        this.statusActiveQuestions.splice(this.currentIndex, 1)
                    this.currentIndex = 0
                    this.correctness = ""
                    $('#listen-and-repeat').addClass('fadeInRight')
                    $('#listen-and-repeat').removeClass('fadeOutLeft')
                }, 1000)
                this.repeatInput = ""
            }
            else if (this.statusActiveQuestions.length == 1 || this.statusActiveQuestions.length == 0) {
                return
            }
            
        },
        switchPrevious () {
            $('#lar-audio')[0].pause()
            $('#lar-audio')[0].currentTime = 0
            this.audioPlayed = false
            this.clearAllTimeOuts()
            if (this.statusActiveQuestions.length - 1 == 0 || this.statusActiveQuestions.length == 0) {
                return
            }
            else if (this.currentIndex == 0) {
               $('#listen-and-repeat').addClass('fadeOutRight')
               $('#listen-and-repeat').removeClass('fadeInLeft')
               setTimeout(() => {
                   if (this.correctness == "correct")
                        this.statusActiveQuestions.splice(this.currentIndex, 1)
                   this.currentIndex = this.statusActiveQuestions.length - 1
                   this.repeatInput = ""
                   this.correctness = false
                   $('#listen-and-repeat').addClass('fadeInLeft')
                   $('#listen-and-repeat').removeClass('fadeOutRight')
               }, 1000)
            }
            else if (0 < this.currentIndex < this.statusActiveQuestions.length) {
                $('#listen-and-repeat').addClass('fadeOutRight')
                $('#listen-and-repeat').removeClass('fadeInLeft')
                setTimeout(() => {
                    if (this.correctness == "correct")
                        this.statusActiveQuestions.splice(this.currentIndex, 1)
                    this.currentIndex --
                    this.repeatInput = ""
                    this.correctness = false
                    $('#listen-and-repeat').addClass('fadeInLeft')
                    $('#listen-and-repeat').removeClass('fadeOutRight')
                }, 1000)
            } 
        },
        clearAllTimeOuts () {
            var id = window.setTimeout(function() {}, 0);

            while (id--) {
                window.clearTimeout(id); // will do nothing if no timeout with id is present
            }
        },
        goBack () {
            this.$router.push({name: 'course', params: {id: this.$store.state.englishFile[1-1].unit_number}})
        }
    },
    computed: {
        baseStaticUrl () {
            return this.$store.state.baseStaticUrl
        },
        numberOfQuestions () {
            return this.statusActiveQuestions.length
        },
        completed () {
            return this.statusActiveQuestions.length == 0
        }
    },
    watch: {

    }
}
</script>

<style lang="scss" scoped link>
    #listen-and-repeat {
        height: 100%;
        width: 800px;
        height: 500px !important;
        background-color: #f8f8f8;
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(126, 125, 125);
    }

    .speaker {
        position: absolute;
        right: 15px;
        top: 20px;
        width: 30px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .stroke-dotted {
        opacity: 1;
        stroke-dasharray: 4,5;
        stroke-width: 4px;
        transform-origin: 50% 50%;
        animation: spin 4s infinite linear;
        transition: opacity 1s ease, 
        stroke-width 1s ease;
    }
    .stroke-solid {
        stroke-dashoffset: 0;
        stroke-dashArray: 300;
        stroke-width: 4px;
        transition: stroke-dashoffset 1s ease, 
        opacity 1s ease;
    }

    .icon {
        transform-origin: 50% 50%;
        transition: transform 200ms ease-out;
    }

    // Hover
    #play:hover {
        cursor: pointer;
    
    .icon {
            transform: scale(1.05);
        }
    }

    #play {
        margin-top: 80px
    }

    .congratulate-image {
        width: 100px;
    }

    .repeat-input {
        width: 50%;
        margin: 40px auto 5px;
    }

    label {
        font-size: 14px;
        color: rgb(105, 103, 103);
    }

    .check-and-next, .skip {
        z-index: 1000000;
        position: absolute;
    }

    .check-and-next {
        bottom: 15px;
        right: 15px;
    }

    .skip {
        bottom: 15px; 
        left: 15px;
    }

    .alert {
        width: 70%;
        margin: 60px auto;
    }

    .disabled {
        pointer-events: none;
        background-color: rgb(232, 232, 255);
        color: rgb(124, 124, 124)
    }

    .correct-icon {
        width: 45px;
        height: auto;
        position: absolute;
        right: 140px;
        top: 215px;
    }

    .how-many-left {
        position: absolute;
        left: 20px;
        top: 20px;
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
</style>