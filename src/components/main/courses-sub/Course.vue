<template>
    <div>
        <ncd-video v-if="videoOpened" @close="openVideo"></ncd-video>
        <ncd-header></ncd-header>
        <div class="course-container">
            <div class="row">
                <div class="col-3 col-md-3">
                    <ncd-sidebar :sideLinks="sideLinks" :extra="false"></ncd-sidebar>
                </div>
                <div class="col course-parts">
                    <section class="theory">
                        <h3 class="main-heading" :style="'color: rgb(64, 36, 224)'">Theoretical part</h3>
                        <div class="theory-elements">
                            <div class="each-part-element video" @click="openVideo">
                                <img src="@/assets/main/course-video.jpg" alt="" class="course-parts-icon">
                                <h4 class="course-parts-header">Video Lessons</h4>
                            </div>
                            <div class="each-part-element theory">
                                <div class="center-aligner"> 
                                    <img src="@/assets/main/course-theory.jpg" alt="" class="course-parts-icon">
                                    <h4 class="course-parts-header">Theory</h4>
                                </div>
                            </div>
                            <div class="each-part-element grammar">
                                <img src="@/assets/main/course-grammar.jpg" alt="" class="course-parts-icon">
                                <h4 class="course-parts-header">Grammar Rules</h4>
                            </div>
                            <div class="each-part-element topic">
                                <img src="@/assets/main/course-topic.jpg" alt="" class="course-parts-icon">
                                <h4 class="course-parts-header">Topic</h4>
                            </div>
                        </div>
                    </section>
                    <section class="listening">
                        <h3 class="main-heading" :style="'color: #dfb313'">Listening part</h3>
                        <div class="theory-elements">
                            <div class="each-part-element audio" @click="navigator">
                                <div class="center-aligner"> 
                                    <img src="@/assets/main/course-audio.jpg" alt="" class="course-parts-icon">
                                    <h4 class="course-parts-header">Listen and repeat</h4>
                                </div>
                            </div>
                            <div class="each-part-element story">
                                <img src="@/assets/main/course-tale.png" alt="" class="course-parts-icon">
                                <h4 class="course-parts-header">Story</h4>
                            </div>
                            <router-link tag="div" :to="{name: 'restore-text'}" class="each-part-element exercise">
                                <img src="@/assets/main/course-exercise.jpg" alt="" class="course-parts-icon">
                                <h4 class="course-parts-header">Restore text</h4>
                            </router-link>
                        </div>
                    </section>
                    <section class="reading">
                        <h3 class="main-heading" :style="'color: rgb(73, 223, 19)'">Reading part</h3>
                        <div class="theory-elements">
                            <div class="each-part-element book">
                                <div class="center-aligner"> 
                                    <img src="@/assets/main/course-book.jpg" alt="" class="course-parts-icon">
                                    <h4 class="course-parts-header">Read texts</h4>
                                </div>
                            </div>
                            <div class="each-part-element story" @click="$router.push({name: 'put-spaces'})">
                                <img src="@/assets/main/put-spaces.png" alt="" class="course-parts-icon">
                                <h4 class="course-parts-header">Put spaces</h4>
                            </div>
                            <div class="each-part-element topic">
                                <img src="@/assets/main/course-exercise.jpg" alt="" class="course-parts-icon">
                                <h4 class="course-parts-header">Exercise</h4>
                            </div>
                        </div>
                    </section>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../Header'
import Sidebar from '../Sidebar'
import Video from '../lightbox/Video'
export default {
    components: {
        'ncd-header': Header,
        'ncd-sidebar': Sidebar,
        'ncd-video': Video
    },
    data() {
        return {
            videoOpened: false
        }
    },
    computed: {
        getUserId() {
            return this.$store.getters.getUserId
        },
        sideLinks () {
            return [
                {
                    name: 'Learning route',
                    toNavigate: {name: 'learning-route'},
                    mainImage: require('../../../assets/main/route.png')
                },
                {
                    name: 'My progress',
                    toNavigate: {name: 'dashboard', params: {userId: this.getUserId}},
                    mainImage: require('../../../assets/main/progress-report.png'),
                },
                {
                    name: "Notifications",
                    toNavigate: {name: 'notifications', params: {userId: this.getUserId}},
                    mainImage: require('../../../assets/main/notification.png')
                }
            ]
        },
        getColorSet () {
            return this.$store.getters.colorsetReturner
        }
    },
    methods: {
        navigator() {
            this.$router.push({name: 'listen-and-repeat-model', params: {id: this.$store.state.englishFile[1-1].unit}})
        },
        openVideo () {
            this.videoOpened = !this.videoOpened
        },
    }
}
</script>

<style lang="scss" scoped>
   @import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');

    .course-container {
        margin-top: 50px;
    }

    section {
        margin-bottom: 80px;
    }

    .course-parts {
        padding-left: 80px;
    }

    .each-part-element:hover {
        cursor: pointer;
        background-color: #F2F8FB;
    }

    .main-heading {
        border-bottom: 1px solid rgb(126, 125, 125);
        padding-bottom: 15px;
        font-family: 'Patua One', cursive;
        opacity: 0.7;
        
    }


    .each-part-element {
        width: calc((100% - 70px) / 3);
        height: 90px;
        border-radius: 5px;
        display: inline-block;
        font-size: 30px;
        border: 1px solid #e1e1e1;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.09);
        margin: 30px 20px 30px 0;
        padding-top: 15px;
        padding-left: 20px;
    }

    .each-part-element

    .course-parts-header {
        padding-top: 8px;
        font: {
            size: .875em;
            weight: 700;
        }
        color: #007db8
    }

    .course-parts-icon {
        width: 50px;
        height: 50px;
        border: 1px solid #e1e1e1;
        border-radius: 50%;
        margin-right: 10px;
        float: left;
        background: {
            size: cover;
            position: center;
        }
    }
</style>
