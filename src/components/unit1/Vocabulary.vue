<template>
    <div style="position: absolute; width: 100%">
      <div class="slides track">
        <div class="slide left_hidden">
          <div class="image_container">
            <img :src="Slideshow.images[0].url" :alt="Slideshow.images[0].alt">
          </div>
        </div>
        <div class="slide left">
          <div class="image_container">
            <img :src="Slideshow.images[1].url" :alt="Slideshow.images[1].alt">
          </div>
        </div>
        <div class="slide center">
          <div class="image_container">
            <a href="#" class="prev"></a>
            <img :src="Slideshow.images[2].url" :alt="Slideshow.images[2].alt">
          </div>
        </div>
        <div class="slide right">
          <div class="image_container">
            <img :src="Slideshow.images[3].url" :alt="Slideshow.images[3].alt">
          </div>
        </div>
        <div class="slide right_hidden">
          <div class="image_container">
            <img :src="Slideshow.images[4].url" :alt="Slideshow.images[4].alt">
          </div>
        </div>
      </div>
      <div class="slideshow_controllers">
        <div class="slide_switcher prev">
          <img @click="nextSlide" src="./children/images/back1.png" alt="back" data-arrow="prev">
        </div>
        <div class="slide_switcher next">
          <img @click="prevSlide" src="./children/images/next.png" alt="next" data-arrow="next">
        </div>
      </div>
      <div class="slide_info">
        <div>
          {{ centeredText }}
        </div>
      </div>
      <div class="slider_woman">
          
      </div>
    </div>
</template>

<style scoped>

    .slide_info {
      position: absolute;
      top: 380px;
      width: 1000px;
      text-align: center;
      font-size: 1.5em;
    }

    .slide_info div {
      padding: 0 20px;
      border: 2px solid black;
      display: inline-block;
      margin: 0 auto;
      border-radius: 15px;
    }

    .slider_woman {
      position: absolute;
      background-image: url('./children/images/slider_student.png');
      background-repeat: no-repeat;
      background-size: auto 200px;
      top: 380px;
      width: 190px;
      height: 200px;
      transform: scaleX(-1)
    }
    
    .slideshow_controllers {
      display: flex;
      position: absolute;
      top: 200px;
      left: 350px;
      z-index: 20000;
      width: 320px;
      justify-content: space-between;
    }

    .slide_switcher img {
      width: 30px;
      height: auto;
      opacity: 0.6;
      user-select: none;
    }

    .prev {
      position: relative;
      top: 1.61px;
    }

    .slide_switcher img:hover {
      opacity: 0.9;
      cursor: pointer;
    }

    .slide_switcher {
      width: 40px;
      height: 40px;
      background-color: transparent;
    }

    .slides {
        position: absolute;
        top: 100px;
        left: 90px;
    }

    .slide {
      display: inline-block;
      border: 1px solid rgb(158, 149, 149);
      border-radius: 5px;
      text-align: center;
      overflow: hidden;
      background-color: white;
      position: absolute;
    }

    .slides .center {
      height: 250px;
      width: 350px;
      position: relative;
      z-index: 100;
      left: 240px;
      transition-property: height, width, margin-top, left, right;
      transition-duration: .7s;
      transition-timing-function: ease;
    }

    .slides .left {
      position: absolute;
      left: 0;
      z-index: 2;
    }

    .slides .right {
      position: absolute;
      left: 588px;
      z-index: 10;
    }

    .slides .right {
      margin-left: -2px;
    }

    .slides .left {
      margin-right: -2px;
    }

    .slides .right, .slides .left {
      height: 180px;
      width: 250px;
      margin-top: 33px;
      transition-property: height, width, margin-top, left, right;
      transition-duration: .7s;
      transition-timing-function: ease;
    }

    .slides .left_hidden, .slides .right_hidden {
      height: 180px;
      width: 250px;
      margin-top: 25px;
      opacity: 0;
      transition: all .7s ease;
    }

    .slides .right_hidden {
      left: 850px;
      position: absolute;
    }

    .slides .right_hidden img {
      height: 180px;
      width: auto;
      transition: width .7s ease-in;
    }

    .slides .left_hidden {
      position: absolute;
      left: -250px;
    }

    .slides .left_hidden img {
      height: 180px;
    }

    .slides > .center img {
      height: 250px;
      transition: height .7s ease;
    }

    .right img,  .left img {
      height: 180px;
      transition: height .7s ease;
    }

    .slides .image_container {
      margin: 0 auto;
      text-align: center;
      width: 90%;
      overflow: hidden;
    }

    .track {
      width: 839px;
      overflow: hidden;
    }

    @media screen and (max-width: 1000px) {
      .slides {
        left: unset ;
        right: unset;
        position: relative;
        margin: 0 auto;
      }

      .slide_info {
        width: 100%;
      }

      .slideshow_controllers {
        top: 200px;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }

      .slide_info {
        position: absolute;
      }
    }

    /* @media screen and (max-width: 930px) {

    } */

    @media screen and (max-width: 860px) {
      .slides .right, .slides .left {
        display: none;
      }


      .track {
        width: 100%;
      }

      .slides .center {
        margin: 0 auto;
      }

      .slideshow_controllers {
        margin: unset;
        left: 260px;
      }
    }

    @media screen and (max-width: 780px) {
      .slides {
        margin: unset;
      }


    }

    @media screen and (max-width: 730px) {
      .slides .center {
        left: 150px;
      }

      .slideshow_controllers {
        left: 170px
      }

      .slide_info div {
        left: -340px
      }
    }

    @media screen and (max-width: 540px) {
      .slides .center {
        left: 80px;
      }

      .slideshow_controllers {
        left: 100px;
      }

      .slide_info div {
        left: -470px;
      }
    }

    @media screen and (max-width: 470px) {
      .slides .center {
        left: unset;
        margin: 0 auto;
      }

      .track {
        text-align: center;
      }

      .slideshow_controllers {
        left: unset;
        right: unset;
        width: 100%;
      }



      .slider_woman {
        display: none;
      }

      .slide_info div {
        margin: 0 auto;
      }

      .slides .center {
        width: 75%;
      }

    }


</style>

<script>
export default {
  data () {
    return {
      Slideshow: {
        currentIndex: 0,
        images: [
          {
            url: 'https://thefoodcharlatan.com/wp-content/uploads/2018/11/Nanas-Famous-Homemade-Peppermint-Ice-Cream-6-e1543277868775.jpg',
            alt: 'Ice cream'
          },
          {
            url: 'https://previews.123rf.com/images/matheesaengkaew/matheesaengkaew1310/matheesaengkaew131000021/23079094-cantaloupe-melon-vector-illustration.jpg',
            alt: 'Melon'
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/812c9h8-zuL._SY355_.jpg',
            alt: 'Watermelon'
          },
          {
            url: 'https://i5.walmartimages.ca/images/Large/428/5_r/6000195494285_R.jpg',
            alt: 'Apple'
          },
          {
            url: 'http://soappotions.com/wp-content/uploads/2017/10/orange.jpg',
            alt: 'Orange'
          }
        ]
      },
      centeredText : ""
    }
  },
  methods: {
    prevSlide (event) {
      //Placeholders for slides
        const centerSlide = document.querySelector('.center')
        const leftSlide = document.querySelector('.left')
        const rightSlide = document.querySelector('.right')
        const leftHiddenSlide = document.querySelector('.left_hidden')
        const rightHiddenSlide = document.querySelector('.right_hidden')

        leftSlide.classList.remove('left')
        leftSlide.classList.add('left_hidden')
        centerSlide.classList.remove('center')
        centerSlide.classList.add('left')
        leftHiddenSlide.classList.remove('left_hidden')
        leftHiddenSlide.classList.add('right_hidden')
        rightHiddenSlide.classList.remove('right_hidden')
        rightHiddenSlide.classList.add('right')
        rightSlide.classList.remove('right')
        rightSlide.classList.add('center')

        this.centeredText = document.querySelector('.center').getElementsByTagName('div')[0].getElementsByTagName('img')[0].alt

        //temporarily disable click event
        event.target.style.pointerEvents = "none"
        setTimeout(function() {
          event.target.style.pointerEvents = "auto";
          event.target.onmouseover = () => {
            event.target.style.cursor = "pointer"
          }
        }, 1000)
    },
    nextSlide (event) {
        const centerSlide = document.querySelector('.center')
        const leftSlide = document.querySelector('.left')
        const rightSlide = document.querySelector('.right')
        const leftHiddenSlide = document.querySelector('.left_hidden')
        const rightHiddenSlide = document.querySelector('.right_hidden')
        
        rightHiddenSlide.classList.remove('right_hidden')
        rightHiddenSlide.classList.add('left_hidden')
        rightSlide.classList.remove('right')
        rightSlide.classList.add('right_hidden')
        centerSlide.classList.remove('center')
        centerSlide.classList.add('right')
        leftSlide.classList.remove('left')
        leftSlide.classList.add('center')
        leftHiddenSlide.classList.remove('left_hidden')
        leftHiddenSlide.classList.add('left')

        this.centeredText = document.querySelector('.center').getElementsByTagName('div')[0].getElementsByTagName('img')[0].alt

        event.target.style.pointerEvents = "none";
        setTimeout(() => {
          event.target.style.pointerEvents = "auto";
          event.target.onmouseover = () => {
            event.target.style.cursor = "pointer"
          }
        }, 1000)
    }
  },
  computed: {
    altGetter () {

    }
  },
  mounted () {
    this.centeredText = document.querySelector('.center').getElementsByTagName('div')[0].getElementsByTagName('img')[0].alt
  }
}
</script>


