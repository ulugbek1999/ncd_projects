<template>
    <div id="main-content">
        <typing-starter v-bind="tsData" v-if="!started" @start="start"></typing-starter>
        <div class="paragraph">
            <span v-for="(word, index) in exData.paragraphs[this.currentIndex].split(' ')" :data-value="word" :key="'word-' + index" :class="['word-' + index, {'word-active' : metaIndex == index, 'disabled' : metaIndex > index}, 'word']"><span v-if="index < exData.paragraphs[currentIndex].split(' ').length - 1">{{ word }} </span><span v-else>{{ word }}&#8629; </span></span>
        </div>
        <div class="input-container">
            <textarea id="input-model" v-model="userInput" @mousedown="preventClick" @click="focusOnInput" @keydown="keyListener" spellcheck="false"></textarea>
        </div>
    </div>
</template>

<script>
import {  eventBus } from "@/main"
import TypingStarter from './Starter'
export default {
    data () {
        return {
            exData: {
                paragraphs: ["Sylvester plays in the Sydney Symphony Orchestra. He is a percussionist and he likes the sound of cymbals. He has to practise at least once every day. Being a musician is not always easy.", "Britney visited Bahamas in September last year. It was one of the best holidays she had ever been on. In the Bahamas, Britney spent a lot of time on the beach playing beach volleybals.", "In the tropics, it is very likely you'll hear bullfrog's croak. Bullfrogs can make a lot of ballyhoo in the evenings but that does not bother many people.", "Eucalyptus trees are very common in Australia. Koalas love to eat their leaves everyday. The scent of eucalyptus trees has become very popular, you can even but chewing gum and candy that tastes like eucalyptus."]
            },
            currentIndex: 0,
            metaIndex: 0,
            userInput: '',
            tsData: {
                accuracyGoal: "intermediate",
                objective: "Reinforcement practise to develop smooth and accurate keystrokes and even rythm.",
                duration: "5 minutes"
            },
            started: false
        }
    },
    methods: {
        keyListener (event) {
            if (this.started) {
                if (this.userInput.split('')[this.userInput.length - 1] === " " && event.keyCode === 8) {
                event.preventDefault()
                }
                else {
                    if (event.keyCode === 37 || event.keyCode === 39) {
                    event.preventDefault()
                    }
                    if (event.keyCode === 32 && this.metaIndex < this.exData.paragraphs[this.currentIndex].split(" ").length - 1) {
                        if (this.userInput.split('')[this.userInput.length - 1] == " ") {
                            event.preventDefault()
                        }
                        else {
                            if ($('.word-' + this.metaIndex)[0].dataset.value == this.userInputReturner) {
                            $('.word-' + this.metaIndex).css('color', 'rgb(29, 201, 29)')
                            }
                            else {
                                $('.word-' + this.metaIndex).css('color', 'rgb(241, 8, 8)')
                                eventBus.$emit('error')
                            }
                            this.metaIndex++
                        }
                    }
                    else if (event.key === "Enter"  && this.metaIndex < this.exData.paragraphs[this.currentIndex].split(" ").length - 1) {
                        $('.word-' + this.metaIndex).css('color', 'rgb(241, 8, 8)')
                        eventBus.$emit('error')
                        this.metaIndex++
                    }
                    else if ((this.metaIndex == (this.exData.paragraphs[this.currentIndex].split(' ').length - 1)) && (event.keyCode === 32 || event.key === "Enter")) {
                        if ($('.word-' + this.metaIndex)[0].dataset.value == this.userInputReturner) {
                            $('.word-' + this.metaIndex).css('color', 'rgb(29, 201, 29)')
                        }
                        else {
                            $('.word-' + this.metaIndex).css('color', 'rgb(241, 8, 8)')
                            eventBus.$emit('error')
                        }
                        document.querySelectorAll('.word').forEach(element => {
                            $(element).css('color', 'unset')
                        })
                        this.metaIndex = 0
                        if (this.currentIndex < this.exData.paragraphs.length - 1) {
                            this.currentIndex++
                        }
                        else {
                            this.currentIndex = 0
                        }
                        this.userInput = ""
                    }
                }
            }     
        },
        start () {
            eventBus.$emit('activate', 'wordType')
            this.started = true
            document.querySelector('#input-model').focus()
        },
        preventClick (event) {
            event.preventDefault()
        },
        focusOnInput (event) {
            event.target.focus()
        }
    },
    computed: {
        userInputReturner () {
            if (this.metaIndex == 0) return this.userInput.replace(/\n/g, '')
            else return this.userInput.replace(/\n/g, " ").split(' ')[this.userInput.replace(/\n/g, " ").split(' ').length - 1]            
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.$store.commit('typingPageSetter', 2)
        })
    },
    components: {
        TypingStarter
    },
    created () {
        eventBus.$on('next', () => {
            eventBus.$emit('disactivate')
            this.$store.commit('typingResultsSetter', {
                accuracy: '-',
                goal: '-',
                errors: '-',
                speed: '-'
            })
            this.$store.commit('typingCurrentPageSetter')
            this.$router.push({name: 'typing-result'})
        })
    }
}
</script>

<style lang="scss" scoped>
    #main-content {
        position: absolute;
        margin: 50px 70px;
        font-size: 1.3em;
        color: #212529;
    }

    textarea {
        overflow: hidden;
        width: 100%;
        height: 120px;
        resize: none;
        border: none;
        padding: 10px 0;
        margin-top: 30px;
        background-color: #f6f6e9;
        border-top: 1px solid black;
    }

    textarea:focus {
        outline: none !important;
    }

    .word-active {
        color: rgb(5, 5, 255);
    }

    .disabled {
        opacity: 0.5;
    }

</style>
