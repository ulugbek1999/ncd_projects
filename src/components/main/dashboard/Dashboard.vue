<template>
    <div>
        <div style="display: flex; justify-content: space-around">
            <div class="dashboard-card dashboard-card-active achievements">
                <div class="achievement-image"></div>
                <div class="dash-number">10</div>
                <div class="dash-text">Achievements</div>
            </div>
            <div class="dashboard-card certificates">
                <div class="certificate-image"></div>
                <div class="dash-number">0</div>
                <div class="dash-text">Certificates</div>
            </div>
            <div class="dashboard-card courses">
                <div class="course-image"></div>
                <div class="dash-number">4</div>
                <div class="dash-text">Courses</div>
            </div>
            <div class="dashboard-card tasks">
                <div class="task-image"></div>
                <div class="dash-number">73</div>
                <div class="dash-text">Tasks</div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../Sidebar.vue';
export default {
    data () {
        return {
            example: '',
            title: 'Dashboard'
        }
    },
    components: {
        
    },
    mounted () {
        this.$nextTick(() => {
            document.title = this.title
        })
    }
}
</script>


<style lang="scss" scoped>
    .dashboard-card {
        background: #FFFFFF;
        /* Gray / Divider */
        border: 1px solid #E5E5E5;
        box-sizing: border-box;
        border-radius: 4px;
        width: 220px;
        height: 220px;
        text-align: center;
        padding: 50px 0;
    }

    .achievement-image {
        background: {
            size: cover;
            repeat: no-repeat;
            image: url('../../../assets/main/trophy.png')
        }
        width: 30px;
        height: 30px;
        margin: 0 auto;
        opacity: 0.24;
    }

    .dash-number {
        margin-top: 15px;
        font-family: 'Roboto', 'Arial', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 36px;
        /* or 150% */
        text-align: center;
        color: #9E9E9E;
    }

    .dash-text {
        /* Caption - reg 12 (15px, 0.4px) */
        font-family: 'Roboto', 'Arial', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 15px;
        /* or 125% */
        align-items: center;
        text-align: center;
        letter-spacing: 0.4px;
        color: rgba(0, 0, 0, 0.24);
    }

    .certificate-image {
        @extend .achievement-image;
        background-image: url('../../../assets/main/certificate.png')
    }

    .course-image {
        @extend .achievement-image;
        background-image: url('../../../assets/main/course.png')
    }

    .task-image {
        @extend .achievement-image;
        background-image: url('../../../assets/main/task.png')
    }

    .dashboard-card:hover, .dashboard-card-active {
       /* Primary / 500 - Accent */
        background: #2196F3;
        /* 6 dp */
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2);
        border-color: #2196F3;
    }

    .dashboard-card:hover {
        cursor: pointer;
    }

    .dashboard-card:hover .dash-number, .dashboard-card-active .dash-number {
        color: #fff;
    }

    .dashboard-card:hover .dash-text, .dashboard-card-active .dash-text {
        color: rgba(255, 255, 255, 0.54);
    }

    .achievements:hover .achievement-image, .dashboard-card-active .achievement-image {
        background-image: url('../../../assets/main/trophy-active.png');
        opacity: 1;
    }

    .certificates:hover .certificate-image, .dashboard-card-active .certificate-image {
        background-image: url('../../../assets/main/certificate-active.png');
        opacity: 1;
    }

    .courses:hover .course-image, .dashboard-card-active .course-image {
        background-image: url('../../../assets/main/course-active.png');
        opacity: 1;
    }

    .tasks:hover .task-image, .dashboard-card-active .task-image {
        background-image: url('../../../assets/main/task-active.png');
        opacity: 1;
    }
</style>

