<template>
    <ncd-loader v-if="loading"></ncd-loader>
    <router-view v-else></router-view>
</template>


<script>
import { customAxios } from '../../CustomAxios'
import Loader from '../Loader'
export default {
    mounted () {
        customAxios.get('/units')
            .then(response => {
                if (response.status === 200) {
                    this.$store.dispatch('englishFileDispatcher', response.data)
                }
            })
            .catch(error => {
                console.log(error)
                this.$router.push({name: "ErrorPage"})
            })
            .finally (() => {
                this.$store.state.loadingEnglishFile = false
            })
    },
    components: {
        'ncd-loader': Loader
    },
    computed: {
        loading () {
            return this.$store.getters.loadingEnglishFile
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
        transition: opacity 1s ease;
        opacity: 0;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes fade-out {
        0% {
            transform: translateY(0)
        }
        100% {
            transform: translateY(-30px)
        }
    }
</style>
