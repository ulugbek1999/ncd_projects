<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

body {
  background-color: #aeb4b4;
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

</style>
