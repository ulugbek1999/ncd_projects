<template>
  <div id="app">
    <transition name="fade-custom" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AuthHandler from './Authorization/AuthHandler'
export default {
  name: 'App',
  data () {
    return {
      scrollDisable: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      
    })
  },
  beforeCreate() {
    const auth = new AuthHandler()
    auth.checkAuthentication()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');
// @import "../node_modules/vue2-animate/src/sass/vue2-animate.scss";
.fade-custom-enter {
  opacity: 0
}

/* Add Global Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)}
  to {-webkit-transform: scale(1)}
}

@keyframes animatezoom {
  from {transform: scale(0)}
  to {transform: scale(1)}
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

#app {
  height: 100%;
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

body {
  overflow-x: hidden;
}

img {
  user-select: none;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 3.55px 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2.9px;
  cursor: pointer;
  background: #1f25af;
  border-radius: 1.3px;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1.2px 1.2px 1px #000031, 0px 0px 1.2px #00004b;
  border: 0.8px solid #00001e;
  height: 10px;
  width: 10px;
  border-radius: 15px;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.75px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: rgba(59, 84, 243, 0.78);
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 2.9px;
  cursor: pointer;
  background: #1f25af;
  border-radius: 1.3px;
}
input[type=range]::-moz-range-thumb {
  height: 10px;
  width: 10px;
  border-radius: 15px;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 2.9px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #1f25af;
  border-radius: 2.6px;
}
input[type=range]::-ms-fill-upper {
  background: #1f25af;
}
input[type=range]::-ms-thumb {
  height: 10px;
  width: 10px;
  border-radius: 15px;
  background: #ffffff;
  cursor: pointer;
  height: 2.9px;
}
input[type=range]:focus::-ms-fill-lower {
  background: #1f25af;
}
input[type=range]:focus::-ms-fill-upper {
  background: rgba(59, 84, 243, 0.78);
}

html, body {
  height: 100%;
}

</style>
