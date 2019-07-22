<template>
    <div id="main-content">
        <div class="text">
            <span v-for="(word, index) in text" :key="'word-' + index">
                <span class="word" :class="'word-' + index" v-html="$options.filters.checkNewLine(word)" :data-value="word"></span> <span></span>
            </span>
        </div>
        <div class="input-container">
            <textarea id="input-model" v-model="userInput"  @mousedown="preventClick" @keydown="keyListener" @click="focusOnInput" placeholder="Click here to start!" spellcheck="false"></textarea>
        </div>
    </div>
</template>

<script>
import {  eventBus } from "@/main"
export default {
    data () {
        return {
            exData: {
               text: null
            },
            currentIndex: 0,
            metaIndex: 0,
            userInput: '',
            lineBreak: false,
            userInput: "",
            scroll: false,
            page: 1
        }
    },
    mounted() {
        this.$nextTick(() => {
            $('.text')[0].scrollTop = 0
        })
    },
    computed: {
        text () {
            var string = `Once upon a time, in a large forest, there lived an old woman and three maidens. They were all three beautiful, but the youngest was the fairest. Their hut was quite hidden by trees, and none saw their beauty but the sun by day, and the moon by night, and the eyes of the stars. The old woman kept the girls hard at work, from morning till night, spinning gold flax into yarn, and when one distaff was empty another was given them, so they had no rest. The thread had to be fine and even, and when done was locked up in a secret chamber by the old woman, who twice or thrice every summer went a journey. Before she went she gave out work for each day of her absence, and always returned in the night, so that the girls never saw what she brought back with her, neither would she tell them whence the gold flax came, nor what it was to be used for. 
Now, when the time came round for the old woman to set out on one of these journeys, she gave each maiden work for six days, with the usual warning: 
"Children, don't let your eyes wander, and on no account speak to a man, for, if you do, your thread will lose its brightness, and misfortunes of all kinds will follow." They laughed at this oft-repeated caution, saying to each other: "How can our gold thread lose its brightness, and have we any chance of speaking to a man?" 
On the third day after the old woman's departure a young prince, hunting in the forest, got separated from his companions, and completely lost. Weary of seeking his way, he flung himself down under a tree, leaving his horse to browse at will, and fell asleep. `
            this.exData.text = string
            return this.exData.text.split(' ')
        },
        userInputReturner () {
            if (this.metaIndex == 0) return this.userInput.replace(/\n/g, '')
            else return this.userInput.replace(/\n/g, " ").split(' ')[this.userInput.replace(/\n/g, " ").split(' ').length - 1]
        }
    },
    filters: {
        checkNewLine (value) {
            const regexp1 = /\n/g
            regexp1[Symbol.match] = false
            var counter = 0
            if (regexp1.test(value)) {
                return "<span class='enter-break'>&#8629;</span><br>" + value
            }
            else return value
        }
    },
    methods: {
        preventClick (event) {
            event.preventDefault()
        },
        focusOnInput (event) {
            event.target.focus()
            $(event.target).removeAttr('placeholder')
        },
        keyListener (event) {
            if (this.userInput.split('')[this.userInput.length - 1] === " " && event.keyCode === 8) { 
                event.preventDefault()
            }
            else {
                if (event.key === "Enter" && this.metaIndex < this.text.length - 1) {
                    if (($('.word-' + (this.metaIndex + 1)).children().length === 2) && ($('.word-' + this.metaIndex)[0].dataset.value.replace(/\n/, "") === this.userInputReturner)) {
                        $('.word-' + this.metaIndex).css('color', 'rgb(29, 201, 29)')
                        try {
                            $('.word-' + (this.metaIndex + 1)).children()[0].style.color = "rgb(29, 201, 29)"
                        } catch (error) {
                            
                        }
                        
                    }
                    else {
                        $('.word-' + this.metaIndex).css('color', 'rgb(241, 8, 8)')
                        try {
                            $('.word-' + (this.metaIndex + 1)).children()[0].style.color = 'rgb(241, 8, 8)'
                        } catch (error) {
                            
                        }
                        eventBus.$emit('error')
                    }
                    this.metaIndex++
                    if (this.metaIndex % 40 === 0 && this.metaIndex !== 0) {
                        document.querySelector('.text').scrollTo(0, $('.word-' + (this.metaIndex + 1))[0].offsetTop - $('.text')[0].offsetTop)
                        this.page++
                        return
                    }
                }
                else if (event.keyCode === 32 && this.metaIndex < this.text.length - 1) {
                    if (($('.word-' + (this.metaIndex + 1)).children().length === 2)) {
                        $('.word-' + this.metaIndex).css('color', 'rgb(241, 8, 8)')
                        eventBus.$emit('error')
                        return
                    }
                    if ($('.word-' + this.metaIndex)[0].dataset.value.replace(/\n/, "") === this.userInputReturner) {
                       
                        $('.word-' + this.metaIndex).css('color', 'rgb(29, 201, 29)')
                    }
                    else {
                        $('.word-' + this.metaIndex).css('color', 'rgb(241, 8, 8)')
                        eventBus.$emit('error')
                    }
                    this.metaIndex++
                    if (this.metaIndex % 40 === 0 && this.metaIndex !== 0) {
                        document.querySelector('.text').scrollTo(0, $('.word-' + (this.metaIndex + 1))[0].offsetTop - $('.text')[0].offsetTop)
                        this.page++
                        return
                    }
                }
            }
        }
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

    .text {
        max-height: 200px;
        overflow-y: scroll;
        padding: 0px 10px;
    }
</style>