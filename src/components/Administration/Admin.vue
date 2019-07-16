<template>
    <div>
        <div class="loader" v-if="loading" style="width: 100%;">
            <ncd-loader color="#000" style="position: absolute; right: 70px; top: 110px;"></ncd-loader>
        </div>
        <header>
            <header-page></header-page>
            <div class="error" v-if="errorOccured" style="position: absolute; left: 0; right: 0">{{ errorMessage }}</div>
            <div class="success" v-if="success" style="position: absolute; left: 0; right: 0">{{ successMessage }}</div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Header from './Subs/Header'
import { eventBus } from '../../main'
import { mapState } from 'vuex'
import Loader from 'vue-spinner/src/FadeLoader'

export default {
    components: {
        'header-page': Header,
        'ncd-loader': Loader
    },
    data () {
        return {
            errorOccured: false,
            errorMessage: '',
            success: false,
            successMessage: ''
        }
    },
    created () {
        eventBus.$on('errorOccured', data => {
            this.errorMessage = data
            this.errorOccured = true
            setTimeout(() => {
                $('.error').css('opacity', 1)
            }, 200)
        })
        eventBus.$on('success', data => {
            this.successMessage = data
            this.success = true
            setTimeout(() => {
                $('.success').css('opacity', 1)
            }, 200)
        })
    },
    watch: {
        errorOccured () {
            setTimeout(() => {
                $('.error').css('opacity', 0)
            }, 5000)

            setTimeout(() => {
                this.errorOccured = false
                $('.error').css('opacity', 1)
            }, 5500)
        },
        success () {
            setTimeout(() => {
                $('.success').css('opacity', 0)
            }, 5000)

            setTimeout(() => {
                this.success = false
                $('.error').css('opacity', 1)
            }, 5500)
        },
         $route (to, from) {
            this.success = false
            this.errorOccured = false
        }
    },
    computed: {
        ...mapState([
            'loading'
        ])
    }
}
</script>

<style scoped>
    main {
        margin: 70px auto 0;
        max-width: 960px;
        padding: 20px 25px;
        box-sizing: border-box;
    }

    .loader {
        position: absolute;
        z-index: 10000;
    }

    .hidden {
        display: hidden
    }

    .error {
        background-color: #f2d2d5;
        color: #752446;
        padding: 15px 15px;
        transition: opacity .3s ease;
        opacity: 0;
    }

    .success {
        background-color: #d4edda;
        color: #155724;
        padding: 15px 15px;
        transition: opacity .3s ease;
        opacity: 0;
    }
</style>
