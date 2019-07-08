<template>
    <div class="introduction-container" :class="{'overflowHidden' : overflowHidden}">
        <span class="closer" @click="close">&times;</span>
        <div> 
            <div class="main-content-container">
                <h1 class="fadeInUp welcome-message">{{ stages[currentStage - 1].heading }}</h1>
                <h3 class="heading-2">{{ stages[currentStage - 1].heading2 }}</h3>
                <p class="lesson-informator fadeInUp">{{ stages[currentStage - 1].text_above }}</p>
                <div class="list" v-if="stages[currentStage - 1].points">
                    <dl>
                        <span v-for="(object, index) in stages[currentStage - 1].points" :key="index">
                            <dt>{{ object.part }}</dt>
                            <dd>{{ object.explanation }}</dd>
                        </span>          
                    </dl>
                </div>
                <div class="study-english fadeIn" v-if="stages[currentStage - 1].picture" :style="{ backgroundImage: 'url(' + stages[currentStage - 1].src + ')' }"></div>
                <p class="lesson-informator">{{ stages[currentStage - 1].text_below }}</p>
                <div class="yes-no fadeInUpBig" v-if="stages[currentStage - 1].stage === 'Greeting'">
                    <span class="yes" @click="startTraining"><h3>Yes, let's start!</h3></span>
                    <span class="no" @click="closeWithMessage"><h3>No, maybe later</h3></span>
                </div>
            </div>
        </div>
            <div class="message-container fadeIn"></div>
        <div class="puss-in-boots fadeInUp"></div>
        <div class="arrow-right" @click="switcher();">&#8594;</div>
        <router-link tag="span" class="skip" :to="{name: 'course', params: {id: 1}}">Skip tutorial</router-link>
    </div>
</template>

<script>
export default {
    data () {
        return {
            stages: [
                {
                    id: 1,
                    stage: "Greeting",
                    heading: "Welcome, coursehunters!", 
                    pussInBoots: "Hello! Are you ready to challenge yourself?",
                    type: "picture",
                    text_above: 'Now you can learn English with us using our platform.',
                    points: null,
                    picture: true,
                    src: require('../assets/main/study-english-w500.png')
                },
                {
                    id: 2,
                    stage: "Structure",
                    heading: "",
                    heading2: "Each unit consist of  5 parts",
                    text_above: "",
                    points: [
                        {
                            part: "Theoretical part",
                            explanation: "where explanations are given about topic-related grammar and others"
                        },
                        {
                            part: "Listening part",
                            explanation: 'where you can check your ability to listen to the expressions of a new language'
                        },
                        {
                            part: "Reading part",
                            explanation: 'where you can consolidate your knowledge reading different texts'
                        },
                        {
                            part: "Vocabulary part",
                            explanation: 'where you can check out new words with an opportunity to add them to your dictionary'
                        },
                        {
                            part: "Writing part",
                            explanation: 'where you can improve your writing skills as well as your typing of a new letters an words'
                        }
                    ],
                    picture: false
                },
                {
                    id: 3,
                    stage: "Theory",
                    heading: "Theoretical part",
                    text_above: "Theory will provide a clear vision of the topic and grammar for each specific unit",
                    points: null,
                    text_below: "Learn rules and see the examples to succesfully apply them in practical part",
                    picture: true,
                    src: require('../assets/main/theory.jpg')
                },
                {
                    id: 4,
                    stage: "Listening",
                    heading: "Listening part",
                    text_above: "Listening will improve your ability to listen to English speech",
                    points: null,
                    text_below: "Try to understand everything you listen to",
                    picture: true,
                    src: require('../assets/main/listening.jpg')
                },
                {
                    id: 5,
                    stage: "Reading",
                    heading: "Reading part",
                    text_above: "This part is about improving your skills in reading foreign texts",
                    points: null,
                    text_below: "Several texts with different topics will be given for you with different levels of difficulty",
                    picture: true,
                    src: require('../assets/main/reading.jpg')
                },
                {
                    id: 6,
                    stage: "Vocabulary",
                    heading: "Vocabulary part",
                    text_above: "Learning vocabulary is one of the best ways to learn a new language",
                    points: null,
                    text_below: "Try to learn every new single word by heart",
                    picture: true,
                    src: require('../assets/main/vocabulary.jpg')
                },
                {
                    id: 7,
                    stage: "Writing",
                    heading: "Writing part",
                    text_above: "This part will assist you in improving your writing skills",
                    points: null,
                    text_below: "Develop your writing as well as typing skills",
                    picture: true,
                    src: require('../assets/main/writing.jpg')
                },
                {
                    id: 8,
                    stage: "End",
                    heading: "Good luck!",
                    text_above: "",
                    picture: true,
                    text_below: "Now let's get started",
                    src: require('../assets/main/learn.jpg')
                }
            ],
            overflowHidden: true,
            currentStage: 1
        }
    },
    methods: {
        animateMessageText (message) {
            var string = message
            var str = string.split("");
            var el = document.querySelector('.message-container');
            (function animate() {
            str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running); 
            var running = setTimeout(animate, 90);
            })();
        },
        pussInBoots () {
            var cat = document.querySelector('.puss-in-boots')
            cat.style.display = "block"

        },
        showHideMessage() {
            $('.message-container').css({'display' : 'none'})
            $('.message-container').css({'display' : 'block'})
        },
        mountedAnimationHandler () {
            $('.welcome-message').css('display', 'block')
            setTimeout(() => {
                this.pussInBoots()
            }, 1000)
            setTimeout(() => {
                $('.message-container').css({'display' : 'block'})
            }, 1750)
            setTimeout(() => {
                this.animateMessageText(this.stages[this.currentStage - 1].pussInBoots)
            }, 2000)
            setTimeout(() => {
                $('.lesson-informator').css({'display' : 'block'})
            }, 5900)
            setTimeout(() => {
                $('.study-english').css({'display' : 'block'})
                $('.yes-no').css({'display' : 'flex'})
                
            }, 7000)
        },
        close() {
            $('.introduction-container').addClass('slideOutRight')
            setTimeout(() => {
                this.$store.dispatch('lessonCloseOpenDispatcher', false)
            }, 1000)   
        }, 
        closeWithMessage() {
            $('.main-content-container').addClass('fadeOut')
            $('.yes').css('pointer-events', 'none')
            $('.no').css('pointer-events', 'none')
            var el = document.querySelector('.message-container');
            $('.message-container').addClass('fadeOut')
            setTimeout(() => {
            $('.message-container').html('')
            $('.message-container').removeClass('fadeOut')
            $('.arrow-right').addClass('fadeOut')
            $('.arrow-right').css('pointer-events', 'none')
            this.showHideMessage()
            this.animateMessageText("What's a pity! Maybe next time then...")
            }, 1000)
            setTimeout(() => {
                this.close()
            }, 5000)
            // 
        },
        clearAllTimeOuts () {
            var id = window.setTimeout(function() {}, 0);

            while (id--) {
                window.clearTimeout(id); // will do nothing if no timeout with id is present
            }
        },
        startTraining () {
            $('.yes').css('pointer-events', 'none')
            $('.no').css('pointer-events', 'none')
            $('.puss-in-boots').removeClass('fadeInUp')
            $('.puss-in-boots').addClass('fadeOutDown')
            $('.message-container').addClass('fadeOut')
            $('.main-content-container').addClass('main-content-container-animator')
            setTimeout(() => {
                $('.main-content-container').addClass('fadeOut')
            }, 1500)
            setTimeout(() => {
                this.currentStage++
                $('.main-content-container').removeClass('fadeOut')
                $('.main-content-container').addClass('fadeIn')
            }, 2500)
        },
        switcher () {
            if (this.currentStage == 1) {
                this.startTraining()
            }
            else if (this.currentStage < this.stages.length) {
                $('.main-content-container').addClass('fadeOutLeft')
                $('.main-content-container').removeClass('fadeInRight')
                setTimeout(() => {
                    this.currentStage++
                    $('.main-content-container').removeClass('fadeOutLeft')
                    $('.main-content-container').addClass('fadeInRight')
                }, 500)
            }
            else {
                this.$router.push({name: 'course'})
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.mountedAnimationHandler()
            
        })
    },
    created () {
        
    },
    destroyed () {
        this.clearAllTimeOuts()
    }
}
</script>



<style lang="scss" scoped>

    .fadeIn {
        animation-duration: 0.5s !important;
    }

    .introduction-container {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 100;
        overflow-y: scroll;
        background: {
            image: url('../assets/main/introduction-background-1.png');
            position: center;
            size: 1900px;
            repeat: no-repeat;
            color: #2195f3;
        }
    }

    .skip {
        color: #fff;
        font-size: 18px;
        position: absolute;
        bottom: 0;
        right: 90px;
        padding: 30px;
        opacity: 0.7;
    }

    .skip:hover {
        opacity: 1;
        cursor: pointer;
    }

    .closer {
        position: absolute;
        right: 20px;
        color: #fff;
        font-size: 60px;
        opacity: 0.8;
        user-select: none;
    }

    * {
        user-select: none;
    }

    .closer:hover {
        cursor: pointer;
        opacity: 1;
    }

    .puss-in-boots {
        display: none;
        position: absolute;
        width: 300px;
        height: 313px;
        bottom: 0;
        left: 10px;
        background-image: url('../assets/main/guide-w500.png');
        background: {
            repeat: no-repeat;
            size: cover;
            position: center;
        }
    }

    .message-container {
        bottom: 280px;
        position: absolute;
        left: 270px;
        background-color: #fff;
        width: 250px;
        transition: all .3s ease;
        min-height: 99px;
        padding: 15px;
        padding-bottom: 60px;
        clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 48% 76%, 21% 100%, 33% 75%, 0% 75%);
        display: none;
    }

    .main-content-container {
        max-width: 960px;
        transition: all 1.5s ease-out;
        padding: 70px 0;
        margin: 0 0 0 30%;
        text-align: center;
        color: #fff;
    }

    .main-content-container h1 {
        font-size: 3.5em;
        margin-bottom: 10px;
    }

    .main-content-container p {
        margin: 20px 0;
    }

    .study-english {
        width: 500px;
        height: 357px;
        background: {
            size: cover;
            repeat: no-repeat;
            position: center;
        }
        margin: 30px auto;
        border: 2px solid #fff;
    }

    .welcome-message, .lesson-informator, .study-english {
        display: none;
    }

    .yes-no {
        width: 500px;
        margin: 0 auto;
        display: none;
        justify-content: space-between;
    }

    .yes:hover {
        cursor: pointer;
        color: rgb(0, 255, 0);
    }

    .no:hover {
        cursor: pointer;
        color: rgb(221, 31, 31);
    }

    .overflowHidden {
        overflow: hidden;
    }

    .arrow-right {
        position: absolute;
        color: white;
        font-size: 100px;
        bottom: -20px;
        right: 20px;
        opacity: 0.7;
        user-select: none;
    }

    .arrow-right:hover {
        opacity: 1;
        cursor: pointer;
    }

    .main-content-container-animator {
        margin: 0 20% !important;
    }

    dd {
        margin: 20px 0;
    }

    dt {
        font-size: 25px
    }

    dl {
        font-size: 20px
    }
</style>
