<template>
    <div>
        <ncd-loader v-if="loading"></ncd-loader>
        <div v-else>
            <ncd-header></ncd-header>
            <div class="row" style="margin-top: 50px">
                <div class="col-sm-3">
                    <ncd-sidebar :credentials="true" :extra="true" :sideLinks="sideLinks" :extraLinks="extraLinks" :extraName="extraName"></ncd-sidebar>
                </div>
                <div class="col">
                    <router-view></router-view>
                </div>
            </div>

        </div> 
    </div>
</template>

<script>
import Header from './main/Header.vue'
import Sidebar from './main/Sidebar.vue';
import Loader from './Loader'
import axios from '../CustomAxios'
import AuthHandler from '../Authorization/AuthHandler'
export default {
    data () {
        return {
            sideLinks: [
                {
                    name: 'Dashboard',
                    toNavigate: {name: 'dashboard'},
                    mainImage: require('../assets/main/dashboard.png'),
                    hoverImage: require('../assets/main/dashboard-active.png')
                },
                {
                    name: 'Messages',
                    toNavigate: {name: 'messages'},
                    mainImage: require('../assets/main/message.png'),
                    hoverImage: require('../assets/main/message-active.png')
                },
                {
                    name: 'Tasks',
                    toNavigate: {name: 'tasks'},
                    mainImage: require('../assets/main/tasks.png'),
                    hoverImage: require('../assets/main/tasks-active.png')
                },
                {
                    name: 'Friends',
                    toNavigate: {name: 'friends'},
                    mainImage: require('../assets/main/friends.png'),
                    hoverImage: require('../assets/main/friends-active.png')
                }
            ],
            extraLinks: [
                {
                    name: 'Main Settings',
                    toNavigate: {name: 'settings'},
                    mainImage: require('../assets/main/settings.png'),
                    hoverImage: require('../assets/main/settings.png')
                },
                {
                    name: 'Notifications',
                    toNavigate: {name: 'notifications'},
                    mainImage: require('../assets/main/notification.png'),
                    hoverImage: require('../assets/main/notification-active.png')
                }
            ],
            extraName: 'Settings'
        }
    },
    components: {
        'ncd-header': Header,
        'ncd-sidebar': Sidebar,
        'ncd-loader' : Loader
    },
    computed: {
        loading () {
            return this.$store.getters.loadingProfile
        }
    },
    methods: {
        loadUserInformation () {
            var auth = new AuthHandler()
            auth.loadUserInformation()
        }
    },
    created () {
        this.loadUserInformation()
    }
}
</script>

<style lang="scss" scoped>

</style>

