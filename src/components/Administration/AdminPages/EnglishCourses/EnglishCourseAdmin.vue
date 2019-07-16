<template>
    <div>
        <h2>{{ getCourseName }}</h2>
        <ncd-processing v-if="requestProcessed" color="#000" style="margin-top: 200px"></ncd-processing>
        <div class="detail" v-if="courseUnits != null">
            <h4 style="margin-bottom: 20px">Beginner</h4>
            <div class="card" style="width: 18rem;" v-for="(unit, index) in courseUnits[0].unit" :key="'unit-' + index">
                <div class="card-img-top" :style="{backgroundImage: 'url(' + unit.picture + ')'}"></div>
                <div class="card-body">
                    <h5 class="card-title">{{ unit.name }}</h5>
                    <p class="card-text">{{ unit.description }}</p>
                    <button class="btn btn-secondary" @click="navigateToManager" :data-unit="unit.unit">Manage</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { customAxios } from '../../../../CustomAxios'
import { eventBus } from '../../../../main'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import Loader from 'vue-spinner/src/ClipLoader'
export default {
    data () {
        return {
            
        }
    },
    computed: {
        getCourseName () {
            return this.$route.params.course
        },
        ...mapGetters([
            'requestProcessed',
            'courseUnits'
            ])
    },
    methods: {
        loadEnlishCourseData () {
            if (!this.courseUnits) {
                this.$store.dispatch('requestProcessedSetter', true)
                customAxios.get('/english-course', {name: this.$route.params.course}, {Headers: {Authorization: 'JWT' + this.$store.state.adminToken}})
                .then(response => {
                    if (response.status === 200) {
                        eventBus.$emit('success', 'Successfully loaded data!')
                        this.$store.dispatch('courseUnitsDispatcher', response.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.errorOccured = true
                    eventBus.$emit('errorOccured', 'Something went wrong when loading the data!')
                })
                .finally(() => {
                    this.$store.dispatch('requestProcessedSetter', false)
                })
            }
        },
        navigateToManager () {
            this.$router.replace({name: 'english-course-manage', params: {course: this.$route.params.course, unit: 'Unit ' + event.target.dataset.unit}})
        }
    },
    components: {
        'ncd-processing' : Loader
    },
    mounted () {
        this.loadEnlishCourseData()
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');

    h2 {
        font-family: 'Patua One', 'Arial', cursive;
        margin-bottom: 20px;
    }

    .card {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        min-height: 400px;
    }

    .card-img-top {
        width: 286px;
        height: 204px;
        background: {
            position: center;
            repeat: no-repeat;
            size: cover;
        }
    }
</style>
