<template>
    <div id="put-spaces">
        <div class="exit" @click="$router.back(-1)" style="font-size: 55px; position: absolute; color: #fff; right: 20px; z-index: 100000">&times;</div>
        <transition name="change">
            <div class="hearts" v-if="stage === 'exercise'">
                <img :src="require('@/assets/main/heart.png')" v-for="(life, index) in lifes" :key="'life-' + index" alt="" class="heart">
                <img :src="require('@/assets/main/heart.png')" v-for="(life, index) in (totalLifes - lifes.length)" :key="'life-lost-' + index" alt="" class="heart life-lost">
            </div>
        </transition>
        <transition name="change">
            <div class="timer" v-if="stage === 'exercise'">
                3:00
            </div>
        </transition>
        <div class="wrapper">
            <transition name="change" mode="out-in">
                <div v-if="stage === 'beginning'" class="beginning" key="beginning">
                    <h1>Put spaces in places</h1>
                    <div class="demo-result">
                        <span style="opacity: 0">&nbsp;</span>
                        <transition-group name="result">
                            <span v-for="(result, index) in results" :key="'result-' + index" class="result-item">
                                {{ result }}&nbsp;
                            </span>
                        </transition-group>           
                    </div>
                    <div class="demo">
                        <div class="demo-wrapper">
                            <div class="divider"></div>
                            <div class="demo-text slide-fast">
                                <span v-for="(char, index) in splitDemoText" :key="'demo-' + index" :class="['demo-' + index, {upper: index == 0, lower: index != 0}]" class="demo-char demo-meta">{{ char | detectSpace }}</span>
                            </div>
                        </div>    
                    </div>
                    <button id="start-exercise" @click="start">Start exercise</button>
                </div>
                <div class="exercise" v-else key="exercise">
                    <div class="exercise-results">
                        &nbsp;
                        <transition-group name="result">
                            <span v-for="(result, index) in exerciseResults" :key="'exercise-result-' + index" :class="['exercise-result-' + index, 'result-item']">
                                {{ result }}&nbsp;
                            </span>
                        </transition-group>
                       
                    </div>
                    <div class="todo-container">
                        <div class="divider"></div>
                        <div class="data">
                            <span v-for="(ex, index) in splitExerciseText" :key="'ex-' + index" :class="['ex-' + index, {upper: index == 0, lower: index != 0}, 'ex-char', 'ex-meta']">{{ ex | detectSpace }}</span>
                        </div>
                    </div>
                </div>
            </transition>
            <div class="info">Use arrows and space to complete the exercise.</div>
        </div>
    </div>
</template>

<script>
var exLeft;
var exRight = 0;
var distance;
export default {
    data () {
        return {
            lifes: [1, 2, 3],
            totalLifes: 3,
            demoText: 'Divide words starting from the first word.',
            results: [],
            stage : "beginning",
            exercise: `Once upon a time in the middle of winter, when the flakes of snow were falling like feathers from the clouds, a Queen sat at her palace window, which had an ebony black frame, stitching her husband's shirts. While she was thus engaged and looking out at the snow she pricked her finger, and three drops of blood fell upon the snow. Now the red looked so well upon the white that she thought to herself, "Oh, that I had a child as white as this snow, as red as this blood, and as black as the wood of this frame!" Soon afterwards a little daughter came to her, who was as white as snow, and with cheeks as red as blood, and with hair as black as ebony, and from this she was named “Snow-White.” And at the same time her mother died.`,
            exCharIndex: 0,
            exerciseResults: [],
            preventEvent: false,
            metaIndex: 0,
            mainIndex: 0,
            calculatedWidth: [],
            initialize: false
        }
    },
    methods: {
        animateDemo () {
            // Animation function for demonstration text

            //On component mount demonstration text should appear
            $('.demo-char').css('left', '0px')
            $('.demo-text').css('margin-left', $('.demo-text').css('margin-left'))
            setTimeout(() => {
                $('.demo-text').css('display', 'block')
            }, 1000)

            var intervalDelta = 0
            const array = $('.demo-char')
            var marginError = 0.1
            const wordCount = this.demoText.match(/\s/g).length
            var counter = 0

            // Looping through each character in demo text and 
            for (let index = 0; index < array.length; index++) {

                // Timing out for each character
                setTimeout(() => {
                    if (counter === wordCount) {
                        $('.demo-meta').addClass('leave-top')
                        this.results.push(this.demoText.split(' ')[counter])
                        this.$store.commit('clearAllTimeouts')
                        // Clear current timeout and stop executing function
                        return
                    }
                    var widthPrev = $('.demo-' + index).css('width').split('p')[0]

                    if ($('.demo-' + index).text() === "") {
                        // Detect empty character that previously was a space and display the word on the left in the results section
                        $('.animated-left').addClass('leave-top')
                        this.results.push(this.demoText.split(' ')[counter])
                        counter++
                    }
                    else {
                            // Change css left from the demo-char class with the current index and remove 'demo-meta' class
                            $('.demo-' + index).css('left', $('.demo-' + index).css('left').split('p')[0] - (11 + marginError + parseInt(widthPrev)) + 'px')
                            $('.demo-' + index).removeClass('demo-meta')
                        try {
                            $('.animated-left').css('left', $('.animated-left').css('left').split('p')[0] - Math.abs(widthPrev) + "px")
                        } catch (error) {
                            
                        }
                            $('.demo-' + index).addClass('animated-left')
                        try {
                            $('.demo-meta').css({'left': $('.demo-meta').css('left').split('p')[0] - Math.abs(widthPrev) + "px"})
                        } catch (error) {
                            
                        } 
                    }
                }, 2000 + intervalDelta)
                intervalDelta += 200
                marginError += 0.2
            }
        },
        start () {
            // Start the exercise
            this.$store.commit('clearAllTimeouts')
            this.stage = 'exercise'
        },
        workOnExercise (event) {
            if (this.preventEvent) return
            else {
                if (this.stage === 'exercise') {
                    if (event.keyCode == 37)  // When left arrow is pressed execute rightMover function
                        this.rightMover()
                    else if (event.keyCode == 39)  // When right arrow is pressed execute leftMover function
                        // this.leftMover()
                        this.leftMover()
                    else if (event.keyCode == 32) {
                        this.checkAnswer()
                    }
                }

                // Remove 'keydown' event listener and add it again only after the animated transitions of characters are finished
                document.removeEventListener('keydown', this.workOnExercise)
                setTimeout(() => {
                    document.addEventListener('keydown', this.workOnExercise)
                }, 110)
            }
        },
        leftMover () {
            if (this.exCharIndex == document.querySelectorAll('.ex-char').length) return
            var width = this.calculatedWidth[this.exCharIndex]

            // Calculate distance between the first character on the right and the element with a class 'divider'
            if (this.exCharIndex == 0) {
                exLeft = document.querySelector('.ex-' + this.exCharIndex).style.left.split('p')[0] - (distance * 2)
                $('.ex-' + (this.exCharIndex)).css('left', "-" + (distance * 2) + "px")
                this.initialize = true
            }
            else {
                $('.ex-' + this.exCharIndex).css('left', (exLeft - width) + "px")
            }
            
            $('.ex-' + (this.exCharIndex)).removeClass('ex-meta')
            if (this.exCharIndex != this.metaIndex) {
                // Should work if only there is a character on the left side of divider
                $('.ex-animated-left').css('left', exLeft - width + "px")
               
            }
            
            try {
                // Prevent from throwing an exception if on the right there is no character left
                $('.ex-meta').css('left', exRight - width + "px")
            } catch (error) {
                
            }   
            if (this.exCharIndex != 0)
                exLeft -= width
            exRight -= width
            $('.ex-' + this.exCharIndex).addClass('ex-animated-left')
            this.exCharIndex++
        },
        rightMover () {
            if (this.exCharIndex != this.metaIndex) {
                var width = this.calculatedWidth[this.exCharIndex - 1]
                
                // Calculate distance between last element on the left and the element with a class 'divider'
                $('.ex-' + (this.exCharIndex - 1)).css('left', exRight + width + "px")
                $('.ex-' + (this.exCharIndex - 1)).removeClass('ex-animated-left')

                try {
                    //Prevent from throwing an exception if there is not chars on the left
                    $('.ex-animated-left').css('left', exLeft + width + "px")
                } catch (error) {
                    
                }
                try {
                    //Prevent from throwing an exception when there is no character on the right
                    $('.ex-meta').css('left', exRight + width + "px")
                } catch (error) {
                    
                }

                // Add 'ex-meta' class after removing 'ex-animated-left' class
                $('.ex-' + (this.exCharIndex - 1)).addClass('ex-meta')

                exRight += width
                exLeft += width
                this.exCharIndex--
            }
        },
        calculateOnChange() {
            const a = document.querySelector('.ex-' + this.exCharIndex)
            const b = document.querySelector('.divider')
            distance = this.getDistanceBetweenElements(a, b)
            document.querySelectorAll('.ex-char').forEach(element => {
                const width = element.getBoundingClientRect().width
                this.calculatedWidth.push(width)
            })
        },
        retryTest () {
            $('.ex-0').css('left', $('.ex-0').css('left').split('p')[0] - 10 + "px")
        },
        getPositionAtCenter (element) {
            const {top, left, width, height} = element.getBoundingClientRect();
            return {
                x: left + width / 2,
                y: top + height / 2
            };
        },
        getDistanceBetweenElements (a, b) {
            const aPosition = this.getPositionAtCenter(a);
            const bPosition = this.getPositionAtCenter(b);

            // Formula to get a distance between to elements with x and y coordinates ((x1 - x2) ^ 2 + (y1 - y2) ^ 2)
            return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y)
        },
        checkAnswer () {
            if (false)
                return
            else
                if ((this.exCharIndex == this.metaIndex) || (this.exCharIndex >= $('.ex-char').length)) return
            else 
            {
                var str = []
                for (const iterator of document.querySelectorAll('.ex-animated-left')) {
                    str.push(iterator.innerHTML)
                }
                if (str.join('') === this.replaceSpecChars(this.exercise.replace(/\n/g, " ").replace(/–/g, "").replace(/ +/g, " ").split(' ')[this.mainIndex])) {
                    $('.ex-animated-left').addClass('leave-top')
                    this.metaIndex = this.exCharIndex
                    this.exerciseResults.push(this.exercise.replace(/\n/g, " ").replace(/ +/g, " ").split(' ')[this.mainIndex])
                    if (this.mainIndex == this.returnTextByWord.length - 2) {
                        $('.ex-meta').addClass('leave-top')
                        this.exerciseResults.push(this.exercise.split(' ')[this.mainIndex + 1])
                    }
                    $('.leave-top').removeClass('ex-animated-left')

                    const exerciseResults = document.querySelector('.exercise-results')
                    // Scroll each time when overflow is detected
                    if (exerciseResults.scrollHeight > exerciseResults.clientHeight)
                        exerciseResults.scrollTop = exerciseResults.scrollHeight - exerciseResults.clientHeight
                    this.mainIndex ++           
                }
                else {
                    $('.ex-animated-left')[0].style.marginLeft = parseInt($('.ex-animated-left').css('margin-right').split('p')[0]) - 15 + "px"
                    $('.ex-meta')[0].style.marginLeft = parseInt($('.ex-meta').css('margin-left').split('p')[0]) + 30 + "px"
                    $('.ex-char').css('color', '#b80000')
                    this.preventEvent = true
                    setTimeout(() => {
                        $('.ex-animated-left')[0].style.marginLeft = "unset"
                        $('.ex-meta')[0].style.marginLeft = "unset" 
                        $('.ex-char').css('color', 'unset')
                    }, 1000)
                    setTimeout(() => {
                        this.preventEvent = false
                    }, 1250)
                }
            }
        },
        replaceSpecChars (element) {
            return element.replace(/[\s\-=_!"#%&'*{},.\/:;?\(\)\[\]@\\$\^*+<>~`\u00a1\u00a7\u00b6\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30-\u2e39\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]+/g,"")
        }
    },
    computed: {
        splitDemoText () {
            return this.demoText.replace(/[\-=_!"#%&'*{},.\/:;?\(\)\[\]@\\$\^*+<>~`\u00a1\u00a7\u00b6\u00b7\u00bf\u037e\u0387\u055a-\u055f\u0589\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u166d\u166e\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u1805\u1807-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u2016\u2017\u2020-\u2027\u2030-\u2038\u203b-\u203e\u2041-\u2043\u2047-\u2051\u2053\u2055-\u205e\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00\u2e01\u2e06-\u2e08\u2e0b\u2e0e-\u2e16\u2e18\u2e19\u2e1b\u2e1e\u2e1f\u2e2a-\u2e2e\u2e30-\u2e39\u3001-\u3003\u303d\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufe10-\ufe16\ufe19\ufe30\ufe45\ufe46\ufe49-\ufe4c\ufe50-\ufe52\ufe54-\ufe57\ufe5f-\ufe61\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff07\uff0a\uff0c\uff0e\uff0f\uff1a\uff1b\uff1f\uff20\uff3c\uff61\uff64\uff65]+/g,"")
        },
        splitExerciseText () {
            return this.replaceSpecChars(this.exercise.replace(/\n/g, " ").replace(/–/g, "").replace(/ +/g, " ")).split('')
        },
        returnTextByWord() {
            return this.exercise.split(' ')
        }
    },
    mounted () {
        this.$nextTick(() => {
            
            this.animateDemo()
            document.addEventListener('keydown', this.workOnExercise)
        })
    },
    filters: {
        detectSpace: function (val) {
            if (val == " ") {
                return ""
            }
            else {
                return val
            }
        }
    },
    destroyed() {
        location.reload()
    },
    watch: {
        stage: {
            handler: function () {
                if (this.stage == 'exercise') {
                    setTimeout(() => {
                        this.calculateOnChange()
                        console.log(this.calculatedWidth)
                    }, 1000)    
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .data {
        position: absolute;
        margin-top: -43px;
        margin-left: 49%;
    }

    .ex-char {
        position: relative;
        transition: all .15s ease-in 0s;
        -webkit-transition: all .15s ease-in 0s;
        left: 0;
        display: initial;
    }

    .todo-container {
        padding: 25px;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        width: 100%;
    }

    .upper {
        text-transform: uppercase;
    }

    .lower {
        text-transform: lowercase;
    }

    .exercise-results {
        height: 200px;
        margin: 200px 20px 30px;
        overflow: hidden;
    }

    .timer {
        position: absolute;
        right: 0;
        left: 0;
        margin: 0 auto;
        font: {
            size: 25px;
            weight: bold;
        }
        letter-spacing: 1px;
        opacity: 0.7;
        color: #fff;
        text-align: center;
        top: 30px;
    }

    .change-enter-active, .change-leave-active {
        transition: all .5s ease;
    }

    .change-enter, .change-leave-to {
        opacity: 0
    }

    @keyframes enter-fade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @-webkit-keyframes enter-fade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    #start-exercise {
        position: relative;
        top: 350px;
        font-size: 40px;
        padding: 10px 40px;
        border-radius: 5px;
        border: none;
        color: #fff;
        background-color: #550288;
        transition: all .3s;
    }

    .info {
        position: absolute;
        right: 0;
        left: 0;
        margin: 0 auto;
        bottom: 30px;
        font-size: 17px;
        opacity: 0.7;
    }

    #start-exercise:hover {
        background-color: #3d0163
    }

    .result-item {
        display: inline-block;
    }

    .result-enter-active, .result-leave-active {
        transition: all .5s;
    }

    .result-enter, .result-leave-to {
        opacity: 0;
        transform: translateY(15px);
    }

    .wrapper {
        margin: 90px auto;
        text-align: center;
        color: rgb(255, 255, 255);
    }

    h1 {
        font-family: 'Patua One', sans-serif,
    }
    #put-spaces {
        position: absolute;
        background-image: linear-gradient(right, #3594e6, #f051a3);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 20px;
    }

    .exit:hover {
        cursor: pointer;
    }

    .hearts {
        display: flex;
        position: absolute;
        left: 20px;
        top: 30px;
    }

    .heart {
        width: 20px;
        margin-right: 5px;
    }

    .demo-result {
        position: relative;
        top: 130px
    }

    .demo {
        position: relative;
        top: 170px;
    }

    .demo-char {
        position: relative;
        transition: all .15s ease;
        -webkit-transition: all 0.2s ease
    }

    .demo-meta {
        transition: all .15s ease;
        -webkit-transition: all 0.2s ease
    }

    .demo-text {
        position: absolute;
        top: 8px;
        display: none;
        width: 500px;
        left: 50.5%;
        transition: all .5s ease;
        text-align: left;
    }

    .slide-fast {
        -webkit-animation: slidefast 0.6s forwards;
        animation: slidefast 0.6s forwards;
    }


    @keyframes slidefast {
        0% {
        opacity: 0;
        left: 2000px
        }
        60% {
        opacity: 1;
        left: 45%;
        }
        100% {
        left: 50.5%;
        }
    }

    @-webkit-keyframes slidefast {
        0% {
        opacity: 0;
        left: 1000px
        }
        80% {
        opacity: 1;
        left: -45px;
        }
        100% {
        left: 6px;
        }
    }

    .slide-left {
        animation: slideleft 0.3s forwards;
    }

    @keyframes slideleft {
        from {
            left: 0px;
        }
        to {
            left: -27px;
        }
    }

    @-webkit-keyframes slideleft {
        from {
            left: initial;
        }
        to {
            left: -27px;
        }
    }


    .divider {
        width: 2px;
        position: relative;
        margin: 0 auto;
        height: 50px;
        background-color: #fff;
    }

    .leave-top {
        animation: leave-top .2s forwards;
    }

    @keyframes leave-top {
        from {
            opacity: 1;
            top: 0px;
        }
        to {
            opacity: 0;
            top: -15px;
        }
    }

    @-webkit-keyframes leave-top {
        from {
            opacity: 1;
            top: 0px;
        }
        to {
            opacity: 0;
            top: -15px;
        }
    }
</style>
