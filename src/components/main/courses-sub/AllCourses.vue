<template>
    <div>
        <ncd-introduction class="fadeInRight" v-if="lessonModalOpened"></ncd-introduction>
        <div :class="{'fadeIn' : !lessonModalOpened}" class="alter-to-intro" v-else>
            <div class="all-courses">
                <div class="row">
                    <div class="col">
                        <h1>Interactive lessons</h1>
                    </div>
                    <div class="col">
                        <div class="start-or-continue-lesson">
                            <p>Start learning and improving your English with us.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lessons">
                <div class="row">
                    <div class="col-md-2">
                        <strong>Beginner</strong>
                        <p class="level-description">If you are new to English language and want learn basics - it's a right place to start.</p>
                    </div>
                    <div class="col">
                        <div class="card" style="width: 18rem;">
                            <div class="card-img-top hello-image"></div>
                            <div class="card-body">
                                <h5 class="card-title">Hello!</h5>
                                <p class="card-text">Did you know that the word "Hello" was initially used as a way to attract attention not as a greeting?</p>
                                <button class="btn btn-success" @click="openIntro">Start lesson</button>
                            </div>
                        </div>
                        <div class="card" style="width: 18rem;">
                            <div class="card-img-top where-image"></div>
                            <div class="card-body">
                                <h5 class="card-title">Where are you from?</h5>
                                <p class="card-text">This lesson will teach you how to use the verb "to be" with pronouns like "he, she, it"</p>
                                <a href="#" class="btn btn-success">Start lesson</a>
                            </div>
                        </div>
                        <div class="card" style="width: 18rem;">
                            <div class="card-img-top alphabet-image"></div>
                            <div class="card-body">
                                <h5 class="card-title">The alphabet</h5>
                                <p class="card-text">"A, B, C, D, E, F, G". Recall your time at school when you were singing that song!</p>
                                <a href="#" class="btn btn-success">Start lesson</a>
                            </div>
                        </div>
                        <div class="card" style="width: 18rem;">
                            <div class="card-img-top remember-image"></div>
                            <div class="card-body">
                                <h5 class="card-title">What do you remember?</h5>
                                <p class="card-text">So far we have covered the usage the verb "to be" with personal pronouns. Now it's time to practice!</p>
                                <a href="#" class="btn btn-success">Start lesson</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <strong>Elementary</strong>
                        <p class="level-description">If you are already familiar with some basics and you are able to understand simple sentences and regular expressions, then this section is for you.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Introduction from '../../Introduction'
export default {
    data () {
        return {
            preloadNeededImages: []
        }
    },
    components: {
        'ncd-introduction' : Introduction,
    },
    methods: {
        openIntro () {
            $('.alter-to-intro').addClass('fadeOut')
            setTimeout(() => {
                this.$store.dispatch('lessonCloseOpenDispatcher', true)
            }, 1000)
        },
        imagePreloader (array) {
           var myimages=new Array()

        for (var i=0 ; i < array.length; i++){
                myimages[i] = new Image()
                myimages[i].src=array[i]
                console.log(myimages[i])
            }
        }
    },
    computed: {
        lessonModalOpened () {
            return this.$store.getters.lessonModalOpened
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.lessonModalOpened
            // this.imagePreloader(this.preloadNeededImages)
        })
    },
    created () {
        
    },
    destroyed () {
        if (this.lessonModalOpened) {
            this.$store.dispatch('lessonCloseOpenDispatcher', false)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Archivo+Black|Viga|Fira+Sans&display=swap');
    .all-courses {
        padding: 40px 40px;
    }


    .start-or-continue-lesson {
        float: right;
    }

    .start-or-continue-lesson p {
        color: #666;
        width: 350px;
        text-align: center;
        font-size: 14px;
    }

    .start-or-continue-lesson button {
        margin-left: 15px;
    }

    .start-or-continue-lesson button:hover {
        background-color: rgb(90, 75, 255)
    }

    @mixin button-common {
        font: {
            family: 'Fira Sans';
            style: normal;
            weight: 500;
            size: 14px;
        }
        line-height: 17px;
        background-color: #4737FF;
        color: #fff;
        border: none;
        padding: 12px 42px;
    }

    button.some-button {
        @include button-common();
        margin-left: 75px;
    }

    h1 {
        font: {
            family: 'Archivo Black', sans-serif;
            size: 2em;
        }
    }

    .lessons {
        @extend .all-courses;
        padding-top: 20px;
        background-color: #f8f8f8;
        font-size: 14px;
    }
    

    .level-description {
        margin-top: 10px;
        color: rgb(167, 166, 166);
        font-size: 12px;
    }
    
    .card {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        min-height: 400px;
    }

    .card-img-top {
        width: 287px;
        height: 204px;
        background: {
            position: center;
            repeat: no-repeat;
            size: cover;
        }
    }

    .hello-image {
        background-image: url("../../../assets/main/hello.png");
    }

    .where-image {
        background-image: url("../../../assets/main/where.jpg")
    }

    .alphabet-image {
        background-image: url('../../../assets/main/alphabet.jpg')
    }

    .remember-image {
        background-image: url('../../../assets/main/remember.jpg')
    }

    .lessons .row {
        padding-bottom: 40px;
    }
</style>
