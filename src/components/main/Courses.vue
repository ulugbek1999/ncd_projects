<template>
    <ncd-loader v-if="loading"></ncd-loader>
    <div v-else>
        <ncd-header></ncd-header>
        <div class="small-nav">
            <ul>
                <router-link tag="li" :to="{name: 'all-courses'}" active-class="active-small-nav">
                    <a><div class="icon-course"></div>All courses</a>
                </router-link>
                <router-link tag="li" :to="{name: 'learning-route'}" active-class="active-small-nav">
                    <a><div class="icon-route"></div>Learning route</a>
                </router-link>
            </ul>
        </div>
        <transition name="fade-custom" mode="out-in">
            <router-view></router-view>
        </transition>
        
    </div>
</template>

<script>
import Header from './Header'
import Loader from '../Loader'
export default {
    components: {
        'ncd-header': Header,
        'ncd-loader': Loader
    },
    data () {
        return {
            title: "Courses",
        }
    },
    created () {
        document.title = this.title
    },
    computed: {
        loading () {
            return this.$store.getters.beingLoaded
        }
    }
}
</script>

<style lang="scss" scoped>
    .fade-custom-enter {
        opacity: 0
    }

    .fade-custom-enter-active {
        animation: fade-in 1s ease-out forwards;
    }

    .fade-custom-leave {
        opacity: 1;
    }

    .fade-custom-leave-active {
        transition: opacity 0.5s ease;
        opacity: 0;
    }
    .small-nav {
        width: 100%;
        height: 40px;
        border-bottom: 3px solid #e8e8e8;
    }

    .small-nav > ul > li {
        list-style-type: none;
        float: left;
        margin-right: 20px;
        margin-top: 5px;
        padding-bottom: 8px;
    }

    .small-nav > ul > li a {
        text-decoration: none;
        color: #3c3c3c;
        display: flex;
    }

    .icon-course {
        background: {
            image: url('../../assets/main/online-class.png');
            size: cover;
            repeat: no-repeat;
        }
        width: 15px;
        height: 15px;
        margin-top: 5px;
        margin-right: 5px;
        opacity: 0.4;
    }
    .active-small-nav {
        border-bottom: 3px solid #f44c12;
    }

    .active-small-nav a {
        color: #f44c12 !important;
    }

    .active-small-nav .icon-course {
        background-image: url('../../assets/main/online-class-active.png')
    }

    .active-small-nav .icon-route {
        background-image: url('../../assets/main/route-active.png')
    }

    .icon-route {
        @extend .icon-course;
        background-image: url('../../assets/main/route.png')
    }
</style>
