<template>
  <div>
    <div>
      <div class="player">
        <video src="./videos/grammar_video_example.mp4" class="player__video"  height="400" width="690" @timeupdate="timeUpdater() ; progressBarHandler()"></video>
        <div class="background-image_lesson" v-if="video_status=='stopped'"></div>
        <div class="player__controls">
          <div class="pause__button toggle player_control" title="Toggle Play" @click="triggerPlayAndPause" v-if="video_status == 'playing'"></div>
          <div class="play__button toggle player_control" title="Toggle Play" @click="triggerPlayAndPause" v-else></div>
          <div style="display: flex">
            <div class="progress__player">
              <div class="progress_filled">

              </div>
              <div class="progress_pseudo" @click="scrubVideo"></div>
            </div>
            <div class="video_time" v-if="videoLoaded == false">00:00 / 00:00</div>
            <div class="video_time" v-else></div>
          </div>

          <div class="stop__button player_control" title="Toggle Stop" @click="triggerStop"></div>
          
        </div>
        <div class="volume_and_speed_holder">
          <div class="speaker speaker_on" @click="muter" v-if="soundOn"></div>
          <div class="speaker speaker_off" @click="muter" v-else></div>
          <input type="range" class="volume_slider" name="volume" min="0" max="1" step="0.01" value="1" @change="handleVolume">
          
          <div class="speed_controller">
            <p>SPEED</p>
            <div class="speeds">
              <p data-speed=0.8 class="speed_changers" :class="{active_speed: current_speed == 0.8}" @click="speedChanger">0.8</p>
              <p data-speed=1.0 class="speed_changers" @click="speedChanger" :class="{active_speed: current_speed == 1.0}">1.0</p>
              <p data-speed=1.2 class="speed_changers" @click="speedChanger" :class="{active_speed: current_speed == 1.2}">1.2</p>
              <p data-speed=1.4 class="speed_changers" @click="speedChanger" :class="{active_speed: current_speed == 1.4}">1.4</p>
            </div>
          </div>
        </div>
      </div>
      <div class="confused_man">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video_status: "stopped",
      current_speed: 1.0,
      soundOn: true,
      volumeBeforeMute: 0,
      videoTimer: '00:00 / 04:38',
      videoLoaded: false
    }
  },
  methods: {
    triggerPlayAndPause(event) {
      const video = document.querySelector('.player__video')
      if (this.video_status == "playing") {
        this.video_status = "paused";
        video.pause()
      }
      else {
        this.video_status = "playing";
        video.play()
      }
      
    },
    triggerStop () {
      const video = document.querySelector('.player__video')
      this.video_status = "stopped"
      video.pause()
      video.currentTime = 0
    },
    handleVolume(event) {
      const video = document.querySelector('.player__video')
      video.volume = event.target.value
      if (video.volume == 0) {
        this.soundOn = false
      }
      else {
        this.soundOn = true
      }
    },
    muter() {
      const video = document.querySelector('.player__video')
      const video_slider = document.querySelector('.volume_slider')
      if (this.soundOn == true) {
        this.volumeBeforeMute = video.volume
        this.soundOn = false
        video.volume = 0;
        video_slider.value = 0
      }
      else {
        this.soundOn = true;
        video.volume = this.volumeBeforeMute;
        video_slider.value = this.volumeBeforeMute
      }
    },
    speedChanger(event) {
      const video = document.querySelector('.player__video')
      this.current_speed = event.target.dataset.speed;
      video.playbackRate = this.current_speed
      console.log(this.current_speed)
    },
    handleProgress () {

    },
    videoTimeHandler() {
      var video = document.querySelector('.player__video')
      var timerHolder = document.querySelector('.video_time')

      //Calculations for time
      var currentHours = Math.floor(video.currentTime / 360)
      var currentMinutes = Math.floor(video.currentTime / 60)
      var currentSeconds = Math.floor(video.currentTime - (currentMinutes * 60))
      var durationHours = Math.floor(video.duration / 360)
      var durationMinutes = Math.floor(video.duration / 60)
      var durationSeconds = Math.floor(video.duration - (durationMinutes * 60))

      //Ensure that seconds, minutes and hours are not displayed with a single digit
      if (currentSeconds < 10) {
        currentSeconds = '0' + currentSeconds
      }
      if (currentMinutes < 10) {
        currentMinutes = '0' + currentMinutes
      }
      if (currentHours < 10) {
        currentHours = '0' + currentHours 
      }
      
      if (durationSeconds < 10) {
        durationSeconds = '0' + durationSeconds 
      }

      if (durationMinutes < 10) {
        durationMinutes = '0' + durationMinutes 
      }

      if (durationHours < 10) {
        durationHours = '0' + durationHours 
      }

      if (video.duration >= 360) {
        timerHolder.innerHTML = `${currentHours}:${currentMinutes}:${currentSeconds} / ${durationHours}:${durationMinutes}${durationSeconds}`
      }
      else {
        timerHolder.innerHTML = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`
      }
    },
    videoTimeHandlerDelay() {
      setInterval( () => {
        this.videoLoaded = true
      }, 1000)
    },
    timeUpdater() {
      this.videoTimeHandler()
    },
    progressBarHandler() {
      const video = document.querySelector('.player__video')

      // Calculate percent for video progress bar
      const percent = (video.currentTime / video.duration) * 100
      const progressFilled = document.querySelector('.progress_filled')
      progressFilled.style.width = percent + '%'
      if (progressFilled.style.width == "100%") {
        this.video_status = "stopped";
        progressFilled.style.width = "0%"
      }
    },
    scrubVideo(e) {
      const video = document.querySelector('.player__video')
      const scrubTime = (e.offsetX / e.target.offsetWidth) * video.duration
      video.currentTime = scrubTime
    },
    videoHeightGetterSetter () {
        var videoHeight = $('.player__video').height()
        $('.player').css({"height": videoHeight - 10 + "px"})
    }
  },
  watch: {

  },
  computed: {

  },
  mounted() {
    this.$nextTick(() => {
      $(window).resize(() => {
        this.videoHeightGetterSetter()
      })
    })

    this.videoHeightGetterSetter()
  }
}
</script>

<style scoped>

  .video_time {
    position: relative;
    width: 150px;
    z-index: 1000;
    top: 395px;
    font-size: 14px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
  }

  .confused_man {
    position: absolute;
    top: 500px;
    background-image: url('./images/confused-man.png');
    background-repeat: no-repeat;
    background-size: 200px auto;
    width: 200px;
    height: 200px;
  }

  .player {
    padding: 0;
    top: 170px;
    position: absolute;
    margin-left: 260px;
    width: 694px;
    height: 391px;
    
  }

  .player__video {
    position: absolute;
    top: -5px;
    left: 2px;
    height: 390px;
    border-left: 2px solid #f6f6e9;
    border-right: 2px solid #f6f6e9;
    box-shadow: 0 0 10px gray;
  }

  .play__button {
    background-image: url('./images/play-button.png');
  }

  .pause__button {
    background-image: url('./images/pause-button.png');
  }

  .play__button, .pause__button {
    position: absolute;
    z-index: 100;
    background-size: auto 46px;
    height: 46px;
    width: 46px;
    top: 395px;
    margin-left: 10px;
    opacity: 0.7;
  }

  .player_control:hover {
    opacity: 0.8;
    cursor: pointer
  }

  .stop__button {
    position: absolute;
    z-index: 100;
    background-image: url('./images/stop-button.png');
    background-size: 23px 23px;
    width: 23px;
    height: 23px;
    top: 417px;
    margin-left: 60px;
    opacity: 0.7;
  }

  .progress__player {
    border-radius: 5px;
    height: 5px;
    width: 600px;
    background-color: lightgray;
    position: relative;
    margin-right: 10px;
    top: 403px;
    margin-left: 62px;
    flex: 10;
    flex-basis: 100%
  }

  .progress__player:hover {
    cursor: pointer;
  }

  .progress_filled {
    position: absolute;
    z-index: 2;
    border-radius: 5px;
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

  .volume_and_speed_holder {
    background-color: rgba(211, 211, 211, 0.8);
    height: 22px;
    width: 600px;
    position: absolute;
    border-radius: 10px;
    top: 418px;
    margin-left: 94px;
    padding: 3px;
  }

  .speaker {
    background-size: 17px 17px;
    width: 17px;
    height: 17px;
    position: absolute;
    opacity: 0.8;
    margin-left: 10px;
  }

  .speaker:hover {
    opacity: 1;
    cursor: pointer;
  }

  .speaker_on {
    background-image: url('./images/speaker.png');
  }

  .speaker_off {
    background-image: url('./images/volume0.png');
  }

  .volume_slider {
    width: 55px;
    position: relative;
    margin-left: 33px;
    top: -7px;
    background-color: rgba(211, 211, 211, 0);
  }

  .speed_controller {
    font-size: 10px;
    display: flex;
    float: right;
    margin-right: 30px
  }

  .speed_controller p {
    font-style: italic;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif, Courier, monospace;
  }

  .speeds {
    display: flex
  }

  .speeds p {
    margin-top: -1px;
    margin-left: 7px;
    font-weight: bold;
    font-style: normal;
    font-family:  'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    letter-spacing: 0.5px;
    padding: 1px;
    transition: all .2s ease;
  }

  .speeds p:hover {
    cursor: pointer;
  }

  .speeds p:hover, .active_speed {
    background-color: rgb(170, 165, 165);
    border-radius: 3px;
  }

    .background-image_lesson {
    background-image: url('./images/background-image_lesson.png');
    background-repeat: no-repeat;
    top: -3px;
    left: 4px;
    background-size: 690px 389px;
    width: 686px;
    height: 386px;
    position: absolute;
    z-index: 100;
  }

  @media screen and (max-width: 980px) {
    .player {
      margin-left: 180px;
    }
  }

  @media screen and (max-width: 900px) {
    .player {
      width: 70%;
      margin-left: unset;
      right: 20px;
    }
    .player__video {
      width: 99.3%;
    }

    .background-image_lesson {
      display: none;
    }

    .volume_and_speed_holder {
      width: 84%;
    }
  }

  @media screen and (max-width: 700px) {
    .volume_and_speed_holder {
      width: 75%;
    }
  }

  @media screen and (max-width: 600px) {
    .confused_man {
      display: none;
    }

  }

  @media screen and (max-width: 570px) {
    .player__video {
      height: 297px;
      top: 80px;
    }

    .player {
      right: unset;
      left: 10px;
      width: 95.5%;
      height: 320px
    }
  }

  @media screen and (max-width: 400px) {
    .player {
      left: 5px;
      width: 95%;
    }



    .progress__player {
      flex-basis: 90%; 
    }

    .speed_controller {
      margin-right: 20px;
    }
  }
</style>