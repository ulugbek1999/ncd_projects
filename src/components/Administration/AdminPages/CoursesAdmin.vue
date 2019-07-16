<template>
    <div>
        <div style="display: flex; justify-content: space-between">
            <h2>All available courses</h2>
            <button class="add-course"><span style="margin-right: 5px; font-weight: bold">+</span>Add course</button>
        </div>
        <ncd-processing v-if="requestProcessed && !courses" style="width: 50px; height: 50px; margin: 200px auto;" :color="'#000'"></ncd-processing>
        <div class="courses" v-if="courses">
            <div class="course" v-for="(course, index) in courses" :key="'A-' + index">
                <div class="row">
                    <div class="col-md-3">
                        <div class="course-img-holder" :style="{backgroundImage: 'url(' + course.picture + ')'}"></div>
                    </div>
                    <div class="col-md-6">
                        <h4 style="margin-bottom: 0 !important">{{ course.name }}</h4>
                        <div class="metadata" v-if="course.metadata">
                            <ul>
                                <li v-for="(data, index) in course.metadata.split('#')" :key="'metadata-' + index">{{ data }}</li>
                            </ul>
                        </div>
                        <p class="course-info">{{ course.description }}</p>
                    </div>
                    <div class="col">
                        <button @click="navigateToCourse" class="btn btn-secondary" :data-course="course.name" style="position: absolute; right: 30px; bottom: 10px;">Manage</button>
                    </div>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { customAxios } from '../../../CustomAxios'
import Loader from 'vue-spinner/src/ClipLoader'
import { eventBus } from '../../../main'
export default {
    computed: {
        ...mapGetters([
            'courses',
            'requestProcessed'
        ])
    },
    methods: {
        loadCourses () {
            
            if (!this.courses) {
                this.$store.dispatch('requestProcessedSetter', true)
                customAxios.get('/course', {Headers: {Authorization: 'JWT' + this.$store.state.adminToken}})
                    .then(response => {
                        if (response.status === 200) {
                            eventBus.$emit('success', 'Successfully loaded data!')
                            this.$store.dispatch('coursesDispatcher', response.data)
                        }
                    })
                    .catch(error => {
                        eventBus.$emit('errorOccured', 'Something went wrong when loading the data!')
                    })
                    .finally(() => {
                        this.$store.dispatch('requestProcessedSetter', false)
                    })
            }
        },
        navigateToCourse (event) {
            this.$router.push({name: 'english-course-admin', params: {course: event.target.dataset.course}})
        }
    },
    components: {
        'ncd-processing' : Loader
    },
    mounted () {
        this.$nextTick(() => {
            this.loadCourses()
        })
    },
    data () {
        return {
            
        }
    },
    watch: {
       
    }
}
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');

    h2 {
        font-family: 'Patua One', 'Arial', cursive;
        margin-bottom: 20px;
    }

    .course {
        min-height: 160px;
        margin: 20px 0;
        padding: 10px 10px;
    }

    .course:hover {
        background-color: rgb(230, 230, 230);
    }

    .course-img-holder {
        width: 200px;
        height: 150px;
        background: {
            size: cover;
            position: center;
        }
    }

    .add-course {
        border: none;
        padding: 0 25px;
        max-height: 40px;
        background-color: rgb(7, 7, 182);
        color: #fff;
        opacity: 0.8;
        transition: opacity .2s ease;
    }

    .add-course:hover {
        opacity: 1
    }

    .course h4 {
        font-family: 'Open Sans', Helvetica, sans-serif;
        font: {
            size: 1.4rem;
        }
    }

    .metadata {
        margin-top: 5px;
    }

    .metadata ul {
        padding: 0;
        margin: 0;
    }

    .metadata ul > li {
        list-style-type: none;
        float: left;
        font-size: 14px;
        color: rgb(141, 135, 135)
    }

    .metadata ul > li::after {
        content: '\25CF';
        margin: 0 10px;
        font-size: 12px;
    }

    .metadata ul > li:last-of-type {
        float: unset;
    }

    .metadata ul > li:last-of-type::after {
        content: unset
    }

    .course-info {
        font-size: 15px;
        color: #777;
        margin: 25px 0 0;
    }
</style>
