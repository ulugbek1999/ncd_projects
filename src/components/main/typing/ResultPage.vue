<template>
    <div class="results">
        <h2>Exercise results</h2>
        <div style="display: flex; margin-top: 20px;"><img :src="require('@/assets/main/Model/correct.png')" v-if="good" style="width: 20px; height: 20px; margin-right: 10px; margin-top: 2px;" alt=""><img :src="require('@/assets/main/Model/warning.png')" v-else style="width: 20px; height: 20px; margin-right: 10px; margin-top: 2px;" alt="">
            {{ message }}
        </div>
        <div class="row indicators">
            <div class="col">
                <div style="width: 120px; text-align: center;">   
                    <h5>Typing speed</h5>
                    <p class="result speed">{{ typingResult.speed }}</p>
                    <p style="position: relative; top: -13px;">WPM</p>
                </div>
            </div>
            <div class="col">
                <div style="width: 120px; text-align: center;">
                    <h5>Errors</h5>
                    <p class="result error">{{ typingResult.errors }}</p>
                    <p style="position: relative; top: -13px; color: #666">mistyped</p>
                </div>
                
            </div>
            <div class="col">
                <div style="width: 120px; text-align: center;">
                    <h5>Accuracy</h5>
                    <p class="result accuracy">{{ typingResult.accuracy }}</p>
                    <p style="position: relative; top: -13px">%</p>
                </div>             
            </div>
        </div>
        <button @click="$router.push({name: 'MainPage'})" style="margin-top: 40px; position: relative; left: 340px" class="return-back">Continue</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { eventBus } from '@/main';
export default {
    computed: {
        ...mapState([
            'typingResult'
        ]),
        message () {
            if (this.typingResult.accuracy === '-') {
                return "Impossible to calculate your score, since you haven't finished the exercise!"
            }
            if (this.typingResult.accuracy < 90) {
                return "You have too many mistyped characters or words!"
            }
            if (this.typingResult.speed < 10) {
                return "Your speed is very slow you need to practise more!"
            }
            else if ((10 <= this.typingResult.speed && this.typingResult.speed < 25) && (this.typingResult.goal > this.typingResult.accuracy)) {
                return "Your typing speed is slow and you need to didn't reach required accuracy goal!"
            }
            else if ((10 <= this.typingResult.speed && this.typingResult.speed < 25) && (this.typingResult.goal <= this.typingResult.accuracy)) {
                this.good = true
                return "You have reached required accuracy goal. Not bad!"
            }
            else if ((25 <= this.typingResult.speed && this.typingResult.speed < 45) && (this.typingResult.goal > this.typingResult.accuracy)) {
                return "Your speed is good, but accuracy is more important than speed!"
            }
            else if ((25 <= this.typingResult.speed && this.typingResult.speed < 45) && (this.typingResult.goal <= this.typingResult.accuracy)) {
                this.good = true
                return "You reached accuracy goal and you had a good speed. Well done!"
            }
            else if ((45 <= this.typingResult.speed && this.typingResult.speed < 60) && (this.typingResult.goal > this.typingResult.accuracy)) {
                return "You have an excellent speed, but try to be more accurate!"
            }
            else if ((45 <= this.typingResult.speed && this.typingResult.speed < 60) && (this.typingResult.goal <= this.typingResult.accuracy)) {
                this.good = true
                return "You have reached accuracy goal and you have excellent speed. Cool!"
            }
            else if ((60 <= this.typingResult.speed && this.typingResult.speed < 80) && (this.typingResult.goal > this.typingResult.accuracy)) {
                return "You speed is marvelous, however you haven't reached accuracy goal."
            }
            else if ((this.typingResult.speed >= 60) && (this.typingResult.goal <= this.typingResult.accuracy)) {
                this.good = true
                return "Unbelievable! You are very professional in typing. Congratulations!"
            }
        }
    },
    data () {
        return {
            good: false
        }
    },
    watch: {

    },
    destroyed () {
        location.reload()
    },
    created () {
        eventBus.$on('back', () => {
            this.$router.go(-1)
        })
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    .results {
        position: absolute;
        font-family: 'Roboto', sans-serif;
        width: 1000px;
        padding-left: 50px;
        margin: 50px 0;
    }

    .indicators {
        margin-top: 100px;
        position: relative;
        left: 60px;
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

    .result {
        top: 10px;
        font-size: 30px;
        margin: 20px 0;
    }

    .speed {
        color: #234867;
    }

    .error {
        color: rgb(255, 0, 0);
    }

    .accuracy {
        color: rgb(0, 116, 0);
    }
</style>
