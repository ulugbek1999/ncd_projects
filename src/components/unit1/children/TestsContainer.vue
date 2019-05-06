<template>
  <div>
      <div class="tests">
        <div class="timer">
          <h1>{{counter}}</h1>
          <p>You are about to take a test</p>
        </div>
        <test v-if="testsDisplay"/>
      </div>
  </div>
</template>

<script>
import Test from "./Test"
export default {
  data() {
    return {
      counter: 5,
      testsDisplay: false
    }
  },
  components: {
    test: Test
  },
  methods: {
      startTimer: function() {
        setInterval(() => this.countdown(), 1000);
    },
  
    countdown: function() {
        var timer = document.querySelector('.timer')
        this.counter--
        if (this.counter == 0) {
          timer.style.display = "none"
          this.testsDisplay = true
        }
    },
    timerHandler() {
      setInterval(function () {
        const timer = document.querySelector('.timer')
        timer.style.opacity = 1;
        timer.style.paddingTop = "230px"
      }, 500)
      this.startTimer()
    }
  },
  computed: {

  },
  mounted () {
    this.timerHandler()
  }
}
</script>

<style scoped>
  .tests {
    margin: 50px auto;
    max-width: 1000px;
    height: 650px;
    box-shadow: 0 0 10px lightblue;
    background-image: url('./images/background-image.jpg')
  }

  .timer {
    width: 200px;
    margin: 0 auto;
    padding-top: 240px;
    color: #fff;
    opacity: 0;
    transition: all .5s ease;
  }

  .timer h1 {
    text-align: center;
    font-size: 5em;
  }
</style>