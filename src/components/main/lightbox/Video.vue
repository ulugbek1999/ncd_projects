<template>
    <div id="video-container">
        <span class="close" @click="close" style="font-size: 40px; margin-right: 10px; color: #fff; opacity: 0.9">&times;</span>
        <div class="video animate">
            <div class="overlay" @click="playPause">

            </div>
            <div class="play-big-container" v-if="!played" style="position: absolute; top: 40%;">
                <div class="play-big" style="z-index: 10000"></div>
                <div class="white-pseudo" style="width: 30px; height: 30px; background-color: #fff; top: 17px; position: relative;left: 20px;"></div>
            </div>
            
            <video @timeupdate="timeUpdater" preload="auto" poster="https://prod-images.edx-video.net/video-images/14b9c14738be494c9934927b4e346bf1.png" id="lesson-video" :src="require('@/assets/videos/lecture_0.mp4')"></video>
            <div style="display: flex">
                <div class="progress__player">
                    <div class="progress_filled">

                    </div>
                    <div class="progress_pseudo" @click="scrubVideo"></div>
                </div>
            </div>
            <div class="controls">
                <button class="play-pause-button" @click="playPause">
                    <span v-if="!played"><img :src="require('@/assets/main/play-arrow.png')" alt=""></span>
                    <span v-else><img :src="require('@/assets/main/pause-bars.png')" alt=""></span>
                </button>
                <div class="timer">
                    {{ timer }}
                </div>
                <div class="secondary">
                    <div class="speed-controller">
                        <span>Speed</span>
                        <div class="speed">
                            <ul>
                                <li @click="speed = 0.8" :class="{'active-speed': speed === 0.8}">0.8</li>
                                <li @click="speed = 1.0" :class="{'active-speed': speed === 1.0}">1.0</li>
                                <li @click="speed = 1.2" :class="{'active-speed': speed === 1.2}">1.2</li>
                                <li @click="speed = 1.4" :class="{'active-speed': speed === 1.4}">1.4</li>
                            </ul>
                        </div>
                    </div>
                    <div class="volume-controller">
                        <img @click="mute" v-if="volume == 0" :src="require('@/assets/main/volume-off.png')" style="height: 1em; position: relative; top: 0.5px; left: -2px" alt="">
                        <img @click="mute" v-else :src="require('@/assets/main/speaker.png')" alt="">
                        <div class="volume-slider"></div>
                    </div>
                    <div class="fullscreen-controllers">
                        <img v-if="!fullscreen" :src="require('@/assets/main/fullscreen-2.png')" @click="openFullScreen" alt="">
                        <img v-else @click="closeFullScreen" :src="require('@/assets/main/exit-fullscreen-2.png')" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            played: false,
            speed: 1.0,
            volume: 100,
            muted: false,
            volumeBeforeMute: 0,
            duration: 0,
            timer: "0:00 / 0:00",
            fullscreen: false,
            stoped: false
        }
    },
    methods: {
        playPause () {
            if (this.stoped) {
                this.stoped = false
                $('#lesson-video')[0].currentTime = 0
            }
            if (this.played === false) {
                $('#lesson-video')[0].play()
                this.duration = $('#lesson-video')[0].duration
                this.played = true
            }
            else {
                $('#lesson-video')[0].pause()
                this.played = false
            }
        },
        volumeSlider () {
            // API Documentation https://refreshless.com/nouislider/
            noUiSlider.create($('.volume-slider')[0], {
                start: 100,
                behaviour: 'snap',
                connect: [true, false],
                step: 1,
                orientation: 'horizontal', // 'horizontal' or 'vertical'
                range: {
                    'min': 0,
                    'max': 100
                },
                format: wNumb({
                    decimals: 0
                })
            })
        },
        mute () {
            if (!this.muted) {
                $('.volume-slider')[0].noUiSlider.set(0)
                this.volumeBeforeMute = this.volume
                this.volume = 0
                this.muted = true
                $('#lesson-video')[0].volume = this.volume / 100
            }
            else {
                $('.volume-slider')[0].noUiSlider.set(this.volumeBeforeMute)
                this.volume = this.volumeBeforeMute
                $('#lesson-video')[0].volume = this.volume / 100
                this.muted = false
            }
        },
        clearIntervals () {
            var interval_id = window.setInterval("", 9999);
            for (var i = 1; i < interval_id; i++)
                window.clearInterval(i);
        },
        timeUpdater () {
            try {
                 this.videoHandler()
                 this.progressBarHandler()
                 if ($('#lesson-video')[0].currentTime == $('#lesson-video')[0].duration) {
                     $('#lesson-video')[0].pause()
                     this.played = false
                     this.stoped = true
                 }
            } catch (error) {
                
            }
        },
        videoHandler () {
            var video = $('#lesson-video')[0]
            if (this.duration == 0)
                return "0:00 / 0:00"
            else {
                var hours = Math.floor(this.duration / 3600)
                var minutes = Math.round((this.duration % 3600) / 60)
                var seconds = Math.round((this.duration % 3600) % 60)
                var currentHours = Math.floor(video.currentTime / 3600)
                var currentMinutes = Math.floor((video.currentTime % 3600) / 60)
                var currentSeconds = Math.floor((video.currentTime % 3600) % 60)
                if (minutes < 10) {
                    minutes = "0" + minutes
                }
                if (seconds < 10) {
                    seconds = "0" + seconds
                }
                if (currentMinutes < 10) {
                    currentMinutes = "0" + currentMinutes
                }
                if (currentSeconds < 10) {
                    currentSeconds = "0" + currentSeconds
                }
                if (this.duration >= 3600) {
                    this.timer = currentHours + ":" + currentMinutes + ":" + currentSeconds + " / " + hours + ":" + minutes + ":" + seconds 
                }
                else if (this.duration < 3600 && this.duration >= 60) {
                    this.timer = currentMinutes + ":" + currentSeconds + " / " + minutes + ":" + seconds
                }
                else {
                    this.timer = "0:" + currentSeconds + " / " + "0" + ":" + seconds
                }
            }
        },
        openFullScreen () {
            const video = $('.video')[0]
            if (video.requestFullscreen) {
                video.requestFullscreen()
            }
            else if (video.mozRequestFullScreen) {
                video.mozRequestFullscreen()
            }
            else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen()
            }
            else if (video.msRequestFullscreen) {
                video.msRequestFullscreen()
            }
        },
        closeFullScreen () {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        },
        close () {
            $('#lesson-video')[0].pause()
            this.$emit('close')
        },
        progressBarHandler() {
            const video = document.querySelector('#lesson-video')

            // Calculate percent for video progress bar
            const percent = (video.currentTime / video.duration) * 100
            const progressFilled = document.querySelector('.progress_filled')
            progressFilled.style.width = percent + '%'
            if (progressFilled.style.width == "100%") {
                this.video_status = "stopped";
                progressFilled.style.width = "0%"
            }
        },
        scrubVideo (e) {
            const video = document.querySelector('#lesson-video')
            const scrubTime = (e.offsetX / e.target.offsetWidth) * video.duration
            video.currentTime = scrubTime
            this.duration = $('#lesson-video')[0].duration
        }
    },
    computed: {
        isInFullscreen () {
            return window.fullScreen
        }
    },
    mounted () {
        this.$nextTick(() => {
            // noUiSlider
            this.volumeSlider()
            $('.volume-slider')[0].noUiSlider.on('slide.one', () => {
            $('#lesson-video')[0].volume = $('.volume-slider')[0].noUiSlider.get() / 100
            this.volume = $('.volume-slider')[0].noUiSlider.get()
            })
            this.duration = $('#lesson-video')[0].duration
        })
    },
    watch: {
        volume () {
           if (this.volume == 0) {
               this.muted = true
           }
           else this.muted = false
        },
        speed () {
            $('#lesson-video')[0].playbackRate = this.speed
        }
    },
    created () {
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = !this.fullscreen
        })
        $('html').css('overflow-y', 'hidden')
    },
    destroyed () {
        $('html').css('overflow-y', 'unset')
    }
}
</script>

<style lang="scss" scoped>
    $primary-color: #2ecc71;

    .overlay {
        width: 100%;
        position: absolute;
        bottom: 45px;
        height: 100%;
        z-index: 10000000;
    }

    .play-big {
        width: 64px;
        height: 64px;
        background-image: url('../../../assets/main/play-big.png');
        background: {
            size: cover;
            repeat: no-repeat;
        }
        position: absolute;
    }

    .volume-slider {
        position: absolute;
        left: 39px;
        margin: 0 auto;
        height: 5px;
        width: 80px;
        top: 6px;
        z-index: 100000000;
        background: rgb(63, 63, 63);
        border-radius: 15px;
    }

    .fullscreen-controllers {
        margin-right: 10px;
    }

    .fullscreen-controllers img {
        opacity: 0.8;
    }

    .fullscreen-controllers img:hover {
        opacity: 1;
        cursor: pointer;
    }

    .volume-controller {
        padding: 0 10px;
        position: relative;
        margin-right: 120px;
        display: flex;
        margin-top: 4px;
    }

    .volume-controller img {
        opacity: 0.7;
    }

    .volume-controller img:hover{
        opacity: 1;
        cursor: pointer;
    }

    .speed-controller {
        padding: 0 20px;
        text-align: center;
        border-left: 1px solid #fff;
        border-right: 1px solid #fff;
        display: flex;
        margin-right: 10px;
    }

    .speed {
        margin-left: 15px;
    }

    .speed > ul > li {
        list-style-type: none;
        float: left;
        margin-left: 10px;
        font-size: 14px;
        position: relative;
        padding: 2px;
        border-radius: 5px;
    }

    .speed > ul > li:hover, .active-speed {
        background-color: white;
        color: #000;
        cursor: pointer;
    }
    .timer {
        padding: 7px 0 0;
    }

    #video-container {
        position: absolute;
        right: 0;
        left: 0;
        z-index: 100000000000000000000000;
        background-color: rgba(8, 8, 8, 0.562);
        height: 100%;
        position: fixed;
        overflow-y: scroll;
    }

    .video {
        width: 1065px;
        height: 600px;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: #000;
        margin: 50px auto;
        display: flex;
        justify-content: center;
        position: absolute;
        z-index: 10000;
        overflow: hidden;
    }

    .video:hover .play-big {
        background-image: url('../../../assets/main/play-big-hover.png')
    }

    .play-big:hover {
        cursor: pointer;
    }

    .secondary {
        position: absolute;
        right: 0;
        top: 7px;
        display: flex;
    }

    #lesson-video {
        width: 100%;
        margin: 0 auto;
    }

    .progress__player {
        height: 5px;
        width: 100%;
        background-color: rgb(85, 83, 83);
        position: absolute;
        margin-right: 10px;
        bottom: 40px;
        left: 0;
        flex: 10;
        flex-basis: 100%
    }

    .progress__player:hover {
        cursor: pointer;
    }

    .progress_filled {
        position: absolute;
        z-index: 2;
        background: rgb(73, 73, 255);
        width: 0%;
        height: 5px;
    }

    .progress_pseudo {
        position: absolute;
        z-index: 3;
        width: 100%;
        height: inherit;
    }

    .play-pause-button {
        width: 40px;
        height: 40px;
        border: none;
        background-color: #282c2e;
        color: rgb(218, 218, 218) !important;
        float: left;
        margin-right: 20px;
    }

    .controls {
        color: rgb(218, 218, 218) !important;
        font-weight: bold;
    }
    
    .play-pause-button:hover {
        background-color: #1a1d1d;
    }

    .controls {
        position: absolute;
        padding: 0px;
        background-color: #282c2e;
        width: 100%;
        bottom: 0;
        display: table;
    }

    .controls img {
        width: 1em;
        position: relative;
        top: -2px;
    }

    button:focus {
        outline: none;
    }

    .close:hover {
        cursor: pointer;
        opacity: 1;
    }
</style>
