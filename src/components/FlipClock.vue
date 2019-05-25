<template>
  <div>
    <!-- Source code: https://vuejsexamples.com/a-countdown-timer-with-flip-effect-for-vue-2/ -->
    <flip-countdown :deadline="this.currentDateTime"></flip-countdown>
  </div>
</template>

<script>
import FlipCountdown from  'vue2-flip-countdown'
export default {
  components: {
    FlipCountdown
  },
  created () {
    var dt = new Date();
    var currentDate = dt.getDate();
    var currentYear = dt.getFullYear()
    var currentMonth = dt.getMonth()
    var currentHours = dt.getHours()
    var currentMinutes = dt.getMinutes()
    var currentSeconds = dt.getSeconds()
    this.currentDateTime = `${currentYear}-${this.datetimeFilter(currentMonth + 1)}-${this.datetimeFilter(currentDate + 1)} ${currentHours - 10}:${currentMinutes}:${currentSeconds}`
  },
  data () {
    return {
      currentDateTime: ''
    }
  },
  methods: {
    datetimeFilter (value) {
      if (value < 10) {
        return `0${value}`
      }
      return value
    }
  }
}
</script>

<style scoped>

</style>
