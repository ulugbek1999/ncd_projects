<template>
    <div id="main-content">
        <fullscreen ref="fullscreen" @change="fullScreenChange" background="#fff" style="overflow-y: unset" class="fullscreenClass">
            <header style="background-color: #fff;">
                <a @click="$router.go(-1)" class="back-navigator"></a>
                <h2 :style="'color: ' + getModelInfo.color">{{ getModelInfo.name }}</h2>
                <a class="fullscreen"  title="Fullscreen" v-if="!fullscreen" @click="toggle" :style="{backgroundImage: 'url(' + require('../../../assets/main/fullscreen.png') + ')' }"></a>
                <a class="fullscreen" title="Fullscreen" v-else @click="toggle" :style="{backgroundImage: 'url(' + require('../../../assets/main/exit-fullscreen.png') + ')' }"></a>
            </header>
            <main style="height: 100%; padding-top: 60px">
                <router-view style="height: 100%"></router-view>
            </main>
            <footer>
                <div class="back-forward-arrows">
                    <img src="@/assets/main/Model/back-arrow.png" @click="previous" alt="" class="back-arrow">
                    <img src="@/assets/main/Model/forward-arrow.png" @click="next" alt="" class="forward-arrow">
                </div>
            </footer>
        </fullscreen>
    </div>
</template>

<script>
var screenExpanded = false
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
import { eventBus } from '../../../main'

Vue.use(fullscreen)

export default {
    computed: {
        getModelInfo () {
            return this.$store.getters.modelInfoGetter
        }
    },
    methods: {
        openFullscreen () {
            if (document.fullscreenEnabled) {
                document.documentElement.requestFullscreen()
            }
            else {
                alert('Full screen is not enabled in your browser!')
            }
        },
        toggle () {
            this.$refs['fullscreen'].toggle()
        },
        fullScreenChange (fullscreen) {
            this.fullscreen = fullscreen
        },
        next () {
            eventBus.$emit('next')
        },
        previous () {
            eventBus.$emit('previous')
        }
    },
    data() {
        return {
            fullscreen: false
        }
    },
    destroyed () {
        $('body').css('overflow-y' , 'unset')
        if (this.screenExpanded) {
            document.exitFullscreen()
        }
    },
    mounted () {
        this.$nextTick(() => {
            $('body').css('overflow-y' , 'hidden')
            $("html, body").animate({ scrollTop: 0 }, "fast");
        })
    }
}
</script>

<style>
    html, body {
        height: 100%;
    }
</style>


<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');

    main {
        height: 100%;
        background-color: rgba(0, 238, 79, 0.548);
    }

    #main-content {
        height: 100%;
    }

    header {
        min-height: 5.625rem;
        box-shadow: inset 0 -0.1875rem rgba(0,0,0,0.15);
    }

    header h2 {
        font: {
            family: 'Patua One', cursive;
            size: 2em;
        } 
        text-align: center;
        padding-top: 20px;
    }

    .back-navigator {
        position: absolute;
        width: 50px;
        height: 50px;
        background: {
            image: url('../../../assets/main/back.png');
            size: cover;
        }
        top: 15px;
        left: 20px;
        opacity: 0.8;
    }

    .back-navigator:hover {
        opacity: 1;
        cursor: pointer;
    }

    .fullscreen {
        @extend .back-navigator;
        left: unset;
        right: 30px;
        width: 40px;
        height: 40px;
        top: 20px;
    }

    .fullscreenClass {
        cursor: unset !important;
        height: 100%;
    }

    .fullscreen:hover {
        @extend .back-navigator:hover;
    }

    .back-arrow {
        position: absolute;
        bottom: 20px;
        left: 20px;
        opacity: 0.8;
        width: 80px;
    }

    .forward-arrow {
        @extend .back-arrow;
        right: 20px;
        left: unset;
    }

    .forward-arrow:hover, .back-arrow:hover {
        opacity: 1;
        cursor: pointer;
    }
</style>
