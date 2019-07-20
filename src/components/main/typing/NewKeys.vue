<template>
    <div class="view" style="position: absolute;">
        <div v-if="stage == 'tutorial'">
            <h3 class="tutorial-header">{{ content[contentIndex].data }}</h3>
            <p><strong>Press Space to continue</strong></p>
            <img :src="require('@/assets/main/Typing/keyboard-big.png')" class="keyboard" alt="">
        </div>
        <div v-if="stage == 'exercise'">
            <h5 class="exercise-header">Type the key sentences, follow the highlighted key</h5>
            <div class="keys" v-if="this.interval == 2">
                <div class="row">
                    <div class="col">
                        <div class="key current-key" :id="'wordkey-' + (exIndex + 0)">
                            <strong> {{ currentExData.first[0] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 1)">
                            <strong> {{ currentExData.first[1] }} </strong>
                        </div>
                        <div class="key space" :id="'space-' + 0">
                            Space
                        </div>
                    </div>
                    <div class="col">
                         <div class="key" :id="'wordkey-' + (exIndex + 2)">
                            <strong> {{ currentExData.second[0] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 3)">
                            <strong> {{ currentExData.second[1] }} </strong>
                        </div>
                        <div class="key space" :id="'space-' + 1">
                            Space
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: 30px">
                    <div class="col">
                         <div class="key" :id="'wordkey-' + (exIndex + 4)">
                            <strong> {{ currentExData.third[0] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 5)">
                            <strong> {{ currentExData.third[1] }} </strong>
                        </div>
                        <div class="key space" :id="'space-' + 2">
                            Space
                        </div>
                    </div>
                    <div class="col">
                         <div class="key" :id="'wordkey-' + (exIndex + 6)">
                            <strong> {{ currentExData.fourth[0] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 7)">
                            <strong> {{ currentExData.fourth[1] }} </strong>
                        </div>
                        <div class="key space" :id="'space-' + 3">
                            Space
                        </div>
                    </div>
                </div>
            </div>
            <div class="keys" v-else style="width: 750px;">
                <div class="row">
                    <div class="col">
                        <div class="key current-key" :id="'wordkey-' + (exIndex + 0)">
                            <strong> {{ currentExData.first[0] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 1)">
                            <strong> {{ currentExData.first[1] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 2)">
                            <strong> {{ currentExData.first[2] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 3)">
                            <strong> {{ currentExData.first[3] }} </strong>
                        </div>
                        <div class="key space" :id="'space-' + 0">
                            Space
                        </div>
                    </div>
                    <div class="col">
                         <div class="key" :id="'wordkey-' + (exIndex + 4)">
                            <strong> {{ currentExData.second[0] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 5)">
                            <strong> {{ currentExData.second[1] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 6)">
                            <strong> {{ currentExData.second[2] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 7)">
                            <strong> {{ currentExData.second[3] }} </strong>
                        </div>
                        <div class="key space" :id="'space-' + 1">
                            Space
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: 30px">
                    <div class="col">
                         <div class="key" :id="'wordkey-' + (exIndex + 8)">
                            <strong> {{ currentExData.third[0] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 9)">
                            <strong> {{ currentExData.third[1] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 10)">
                            <strong> {{ currentExData.third[2] }} </strong>
                        </div>
                         <div class="key" :id="'wordkey-' + (exIndex + 11)">
                            <strong> {{ currentExData.third[3] }} </strong>
                        </div>
                        <div class="key space" :id="'space-' + 2">
                            Space
                        </div>
                    </div>
                    <div class="col">
                         <div class="key" :id="'wordkey-' + (exIndex + 12)">
                            <strong> {{ currentExData.fourth[0] }} </strong>
                        </div>
                        <div class="key" :id="'wordkey-' + (exIndex + 13)">
                            <strong> {{ currentExData.fourth[1] }} </strong>
                        </div>
                        <div class="key" :id="'wordkey-' + (exIndex + 14)">
                            <strong> {{ currentExData.fourth[2] }} </strong>
                        </div>
                        <div class="key" :id="'wordkey-' + (exIndex + 15)">
                            <strong> {{ currentExData.fourth[3] }} </strong>
                        </div>
                        <div class="key space" :id="'space-' + 3">
                            Space
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    data () {
        return {
            stage: 'tutorial',
            content: [
                {
                    data: "In this lesson you will learn the home row: A S D F and J K L ;"
                },
                {
                    data: "Starting from the little finger, place your left hand fingers on A, S, D, F."
                },
                {
                    data: "Starting from the index finger, place your right hand fingers on J, K, L, ;"
                },
                {
                    data: "Let your thumbs rest on the space bar."
                },
                {
                    data: "Now your hands in the basic position."
                },
                {
                    data: "Always use the same thumbs to press the space bar."
                },
                {
                    data: "Great now you can start the first drill."
                }
            ],
            exIndex: 0,
            contentIndex: 0,
            metaIndex: 0,
            break: false,
            spaceIndex: 0,
            counter: 0,
            api: [
                {
                    content: "aassddffjjkkll;;asdfasdfjkl;jkl;",
                    interval: 2
                },
                {
                    content: "asdfasdfjkl;jkl;", 
                    interval: 4
                },
                {
                    content: "aaddjjllssffkk;;",
                    interval: 2
                },
                {
                    content: "adjladjlsfk;sfk;",
                    interval: 4
                },
                {
                    content: "fjfjdkdk",
                    interval: 2
                },
                {
                    content: "slsla;a;",
                    interval: 2
                },
                {
                    content: "fjdkfjdksla;sla;",
                    interval: 4
                },
                {
                    content: "jajaksksldld;a;a",
                    interval: 2
                },
                {
                    content: "jaksjaksld;ald;a",
                    interval: 4,
                },
                {
                    content: "ajajdkdkdldlf;f;",
                    interval: 2
                },
                {
                    content: "ajskajskdlf;dlf;",
                    interval: 4
                },
                {
                    content: "adadsfsfjljlk;k;",
                    interval: 2
                },
                {
                    content: "adsfjlk;adsfjlk;",
                    interval: 4
                },
                {
                    content: ";j;jfafalklksdsd",
                    interval: 2
                },
                {
                    content: ";jfa;jfalksdlksd",
                    interval: 4
                },
                {
                    content: "aaddjjllssffkk;;",
                    interval: 2
                },
                {
                    content: "adjladjlsfk;sfk;",
                    interval: 4
                }
            ],
            currentAPI: 0,
            interval: 2
        }
    },
    methods: {
        next () {
            if (this.stage == "tutorial") {
                if (this.contentIndex < this.content.length - 1)
                    this.contentIndex++
                else  {
                    this.stage = "exercise"
                }
            }
        },
        back () {
            location.reload()
        },
        currentExDataSetter (array) {
            for (let index = 0; index < this.interval; index++) {
                array[index] = this.exData[this.counter]
                this.counter++
            }
        }
    },
    created () {
        eventBus.$on('keyEvent', data => {
            if (this.stage == 'tutorial') {
                if (data == ' ')
                    this.next()  
            }
            else {
                if (this.api[this.currentAPI].content.length == this.metaIndex) {
                    if (this.currentAPI < this.api.length - 1)
                        this.currentAPI++
                    else
                        this.currentAPI = 0
                    this.interval = this.api[this.currentAPI].interval
                    this.metaIndex = 0
                    this.exIndex = 0
                }
                if (!this.break) {
                    if (this.exData[this.metaIndex] == data) {
                        
                        $('#wordkey-' + this.metaIndex).addClass('correct')
                    }
                    else {
                        eventBus.$emit('error')
                        $('#wordkey-' + this.metaIndex).addClass('incorrect')
                    }
                    this.metaIndex++
                    if (this.interval == 2) {
                        if (this.metaIndex % 2 == 0 && this.metaIndex > 0) {
                            $('#space-' + this.spaceIndex).addClass('current-key')
                            this.break = true
                        }
                        else
                            $('#wordkey-' + this.metaIndex).addClass('current-key')
                    }
                    else if (this.interval == 4) {
                        if (this.metaIndex % 4 == 0 && this.metaIndex > 0) {
                            $('#space-' + this.spaceIndex).addClass('current-key')
                            this.break = true
                        }
                        else
                            $('#wordkey-' + this.metaIndex).addClass('current-key')
                    }
                }
                else {
                    $('#space-' + this.spaceIndex).removeClass('current-key')
                    if (data == " ") {
                        $('#space-' + this.spaceIndex).addClass('correct')
                    }
                    else {
                        eventBus.$emit('error')
                        $('#space-' + this.spaceIndex).addClass('incorrect')
                    }
                    this.spaceIndex++
                    $('#wordkey-' + this.metaIndex).addClass('current-key')
                    if (this.interval == 2) {
                        if (this.metaIndex % 8 == 0) {
                            this.exIndex = this.metaIndex
                            this.spaceIndex = 0
                            Array.from(document.querySelectorAll('.key')).forEach(element => {
                                $(element).removeClass('current-key')
                                $(element).removeClass('correct')
                                $(element).removeClass('incorrect')
                            })
                            $($('.key')[0]).addClass('current-key')
                        }
                    }
                    if (this.interval == 4) {
                        if (this.metaIndex % 16 == 0) {
                            this.exIndex = this.metaIndex
                            this.spaceIndex = 0
                            Array.from(document.querySelectorAll('.key')).forEach(element => {
                                $(element).removeClass('current-key')
                                $(element).removeClass('correct')
                                $(element).removeClass('incorrect')
                            })
                            $($('.key')[0]).addClass('current-key')    
                        }
                        
                    }
                    this.break = false
                }
            }
        })
        eventBus.$on('next', () => {
            this.next()
        })
        eventBus.$on('back', () => {
            this.back()
        })
    },
    computed: {
        currentExData () {
            var first = []
            var second = []
            var third = []
            var fourth = []
            var data = {}
            if (this.interval == 2) {
                first[0] = this.exData[this.exIndex]
                first[1] = this.exData[this.exIndex + 1]
                second[0] = this.exData[this.exIndex + 2]
                second[1] = this.exData[this.exIndex + 3]
                third[0] = this.exData[this.exIndex + 4]
                third[1] = this.exData[this.exIndex + 5]
                fourth[0] = this.exData[this.exIndex + 6]
                fourth[1] = this.exData[this.exIndex + 7]
            }
            else if (this.interval == 4) {
                first[0] = this.exData[this.exIndex]
                first[1] = this.exData[this.exIndex + 1]
                first[2] = this.exData[this.exIndex + 2]
                first[3] = this.exData[this.exIndex + 3]
                second[0] = this.exData[this.exIndex + 4]
                second[1] = this.exData[this.exIndex + 5]
                second[2] = this.exData[this.exIndex + 6]
                second[3] = this.exData[this.exIndex + 7]
                third[0] = this.exData[this.exIndex + 8]
                third[1] = this.exData[this.exIndex + 9]
                third[2] = this.exData[this.exIndex + 10]
                third[3] = this.exData[this.exIndex + 11]
                fourth[0] = this.exData[this.exIndex + 12]
                fourth[1] = this.exData[this.exIndex + 13]
                fourth[2] = this.exData[this.exIndex + 14]
                fourth[3] = this.exData[this.exIndex + 15]
            }
            data.first = first
            data.second = second
            data.third = third
            data.fourth = fourth
            return data
            // Not the best code I know.
        },
        exData: {
            get () {
                var string = this.api[this.currentAPI].content
                return string.split('')
            },
            set () {
                
            }
        }
    },
    watch: { 
        stage () {
            if (this.stage === 'exercise') {
                this.exIndex = 0
                this.metaIndex = 0
                this.spaceIndex = 0
                this.currentAPI = 0
                this.contentIndex = 0
                this.break = false
                eventBus.$emit('activate', 'charType')
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            
        })
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=PT+Sans+Caption&display=swap');

    .exercise-header {
        color: rgb(7, 156, 7);
    }

    .keys {
        margin-top: 70px;
    }

    .key {
        font: {
            family: 'Segoe UI', sans-serif;
            size: 25px;
        }
        border: 2px solid rgb(148, 144, 144);
        display: inline-block;
        padding: 8px 0;
        width: 55px;
        text-align: center;
        border-radius: 2px;
        background-color: #fff;
        margin-right: 10px;
    }

    .space {
        height: unset;
        font-size: 10px;
    }

    .current-key {
        background-color: #0101ce;
        color: #fff;
    }

    .correct {
        border: 2px solid rgb(7, 202, 7);
        background-color: #fff;
        opacity: 0.7;
        color: #000;
    }

    .incorrect {
        border: 2px solid rgb(231, 11, 11);
        opacity: 0.7;
        background-color: #fff;
        color: #000;
    }
    
    .view {
        margin-top: 50px;
        padding: 0 50px;
    }

    .tutorial-header {
        font-family: 'PT Sans Caption', sans-serif;
        height: 67.2px;
    }

    .keyboard {
        height: 300px;
        margin-top: 20px;
    }
</style>
