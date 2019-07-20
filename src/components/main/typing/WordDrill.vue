<template>
    <div id="main-content">
        <div class="words row">
            <div class="word word-1 word-active col">
                <span v-for="(ch, index) in word_1" :key="'word_1_key-' + index" :class="{'ch-active': index == 0}"><span v-if="ch != ' '">{{ ch }}</span><span v-else>&nbsp;</span></span>
            </div>
            <div class="word word-2 col">
                <span  v-for="(ch, index) in word_2" :key="'word_2_key-' + index" :class="{'ch-active': index == 0 && word_which == 2}"><span v-if="ch != ' '">{{ ch }}</span><span v-else>&nbsp;</span></span>
            </div>
            <div class="word word-3 col">
                <span v-for="(ch, index) in word_3" :key="'word_3_key-' + index"><span v-if="ch != ' '" :class="{'ch-active': index == 0 && word_which == 3}">{{ ch }}</span><span v-else>&nbsp;</span></span>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    data () {
        return {
            exData : {
                content: ['jazz', 'fox', 'zero', 'wax', 'dozen', 'mixup', 'buzzer', 'annex', 'Zaire', 'Xerxes', 'sixty', 'jazzy', 'tuxedo', 'zircon', 'pixel', 'extreme', 'amazing', 'blizzard', 'Zanzibar', 'Xavier', 'flexible', 'fixture', 'azure', 'bazaar', 'exact', 'lexicon', 'citizen', 'lizard', 'Zurich', 'Xylophone', 'luxury', 'mixture', 'sixteen', 'pizzas', 'syntax', 'complex', 'ozone', 'puzzle', 'excuse', 'deluxe', 'mezzo', 'nozzle']
            },
            currentIndex: 0,
            word_1: null,
            word_2: null,
            word_3: null,
            word_which : 1,
            mistype: false
        }
    },
    computed: {
        
    },
    methods: {
        keyListener (data) {
            var index = 0
            if (this.word_which == 1) {
                if (this.word_1[index] == data) {
                    $('.ch-active').removeClass('error')
                    this.word_1.shift()
                    if (this.word_1.length == 0) {
                        if (this.word_which != 3) {
                            this.word_which++
                        }
                        else
                            this.word_which = 1
                    }
                }
                else {
                    eventBus.$emit('error')
                    $('.ch-active').addClass('error')
                }
            }
            else if (this.word_which == 2) {
                 if (this.word_2[index] == data) {
                    $('.ch-active').removeClass('error')
                    this.word_2.shift()
                    if (this.word_2.length == 0) {
                        if (this.word_which != 3) {
                            this.word_which++
                        }
                        else
                            this.word_which = 1
                    }
                }
                else {
                    eventBus.$emit('error')
                    $('.ch-active').addClass('error')
                }
            }
            else {
                if (this.word_which == 3 && this.word_3[index] == data) {
                    $('.ch-active').removeClass('error')
                    this.word_3.shift()
                    if (this.word_3.length == 0) {
                        if (this.word_which != 3) {
                            this.word_which++
                        }
                        else
                            this.word_which = 1
                    }
                }
                else {
                    eventBus.$emit('error')
                    $('.ch-active').addClass('error')
                }
            }
            if (index < this.exData.content[this.currentIndex].length)
                index++
            else
                index = 0
        },
        wordsSetter () {
            this.word_1 = this.exData.content[this.currentIndex].split('')
            this.word_2 = this.exData.content[this.currentIndex].split('')
            this.word_3 = this.exData.content[this.currentIndex].split('')
            if (this.word_1[this.word_1.length - 1] != " ") {
                this.word_1.push(" ")
            }
            if (this.word_2[this.word_2.length - 1] != " ") {
                this.word_2.push(" ")
            }
            if (this.word_3[this.word_3.length - 1] != " ") {
                this.word_3.push(" ")
            }
        }
    },
    created () {
        eventBus.$on('keyEvent', data => {
            this.keyListener(data)
        })
    },
    mounted () {
        this.$nextTick(() => {
            this.wordsSetter()
            eventBus.$emit('activate', 'charType')
        })
    },
    watch: {
        word_1 () {
            if (this.word_1.length == 0) {
                $('.word-1').removeClass('word-active')
                $('.word-2').addClass('word-active')
            }
        },
        word_2 () {
            if (this.word_2.length == 0) {
                $('.word-2').removeClass('word-active')
                $('.word-3').addClass('word-active')
            }
        },
        word_3 () {
            if (this.word_3.length == 0) {
                $('.word-3').removeClass('word-active')
                $('.word-1').addClass('word-active')
                if (this.currentIndex < this.exData.content.length - 1)
                    this.currentIndex++
                else
                    this.currentIndex = 0
                this.wordsSetter()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #main-content {
        position: absolute;
        width: 100%;
        margin-top: 80px;
    }

    .words {
        width: 80%;
        margin-left: 30px;
        justify-content: space-around;
    }

    .word {
        font-size: 2em;
        color: #212529;
        letter-spacing: .1em;
    }

    .word-active {
        color: rgb(5, 5, 255);
    }

    .ch-active {
        text-decoration: underline;
    }

    .error {
        color: red;
    }
</style>
