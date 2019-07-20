<template>
    <div id="main-content">
        <div class="sentence" v-if="loaded">
            <span class="word" :class="[{'word-active' : index === wordIndex}, 'word-' + index]" v-for="(word, index) in splitByWord" :key="'word-' + index"><span v-for="(ch, i) in word.split('') + 1" :key="'ch-' + i" :class="['word-' + index + '-ch-' + i]" :data-symbol="ch"><span v-if="sentence[index][i] != ' '" :class="{'ch-active' : i == 0 && index == wordIndex}">{{ sentence[index][i] }}</span><span v-else :class="{'ch-active' : i == 0 && index == wordIndex}">&nbsp;</span></span></span><span class="enter" :class="{'ch-active' : enterBreak}">&#8629;</span>
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    data () {
        return {
            exData: {
                sentences: ["Zanzibar is an exotic island next to Tanzania.", "Computers can be so exasperating sometimes.", "Beatrix passed the exam with the highest score.", "Xavier went to an exquisite art exhibition yesterday.", "Zeke goes to many jazz festivals every summer.", "The Spanish poet Jimenez has won the Nobel prize.", "Many lizards have become extinct after excessive hunting.", "Car exhaust fumes affect the ozone layer in an adverse way.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsum consequatur mollitia, asperiores placeat architecto magnam. Labore, deleniti fugit, sed quaerat ducimus beatae maxime eaque accusamus nam, tempora voluptate ipsam."]
            },
            currentIndex: 0,
            wordIndex: 0,
            charIndex: 0,
            chLength: 0,
            enterBreak: false,
            sentence: [],
            loaded: false
        }
    },
    computed: {
        splitByWord () {
            return this.exData.sentences[this.currentIndex].split(' ')
        },
        charGetter () {
            return $(`.word-${this.wordIndex}-ch-${this.charIndex}`)
        } 
    },
    methods: {
        splitChar () {
            var wordArray = this.exData.sentences[this.currentIndex].split(' ')
            
            return 
        },
        deleteChar () {
            $('.word-0').remove()
        },
        chLengthSetter () {
            this.chLength = $('.word-' + this.wordIndex).children().length
        },
        wordLength () {
            return this.exData.sentences[this.currentIndex].split(' ')
        },
        sentenceSetter () {
            var data = []
            for (let index = 0; index < this.wordLength().length; index++) {
                data[index] = this.wordLength()[index].split('')
                if (index != this.wordLength().length - 1)
                    data[index].push(' ')
            }
            this.sentence = data
            this.loaded = true
        },
        changer () {
            if (this.currentIndex < this.exData.sentences.length - 1) {
                this.currentIndex++
            }
            else {
                this.currentIndex = 0
            }
            this.wordIndex = 0
            this.sentenceSetter()
        }
    },
    created () {
        eventBus.$on('keyEvent', data => {
            if (!this.enterBreak) {
                 if (data === this.sentence[this.wordIndex][0]) {
                    $('.ch-active').removeClass('error')
                    this.sentence[this.wordIndex].shift()
                    this.charIndex++
                }
                else {
                    eventBus.$emit('error')
                    $('.ch-active').addClass('error')
                }
            }
            else {
                if (data === "Enter") {
                    $('.ch-active').removeClass('error')
                    this.changer()
                    this.enterBreak = false
                }
                else {
                    eventBus.$emit('error')
                    $('.ch-active').addClass('error')
                }
            }
               
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.sentenceSetter()
            eventBus.$emit('activate', 'charType')
        })
    },
    watch: {
        sentence () {
            if (this.sentence[this.wordIndex].length == 0) {
                this.wordIndex++
                this.charIndex = 0
            }
            if (this.sentence[this.sentence.length - 1].length == 0) {
               this.enterBreak = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #main-content {
        position: absolute;
        margin: 80px 70px;
    }

    .sentence {
        font-size: 2em;
        color: #212529;
        width: 720px;
        overflow: hidden;
    }

    .word-active {
        color: rgb(5, 5, 255);
    }

    .ch-active {
        text-decoration: underline;
        color: rgb(5, 5, 255);
    }

    .error {
        color: red;
    }
</style>
