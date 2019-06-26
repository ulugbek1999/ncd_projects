<template>
    <div>
        <ncd-loader v-if="loading"></ncd-loader>
        <div v-else>
            <ncd-header></ncd-header>
            <div class="row" style="margin-top: 50px">
                <div class="col-sm-3">
                    <ncd-sidebar></ncd-sidebar>
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

