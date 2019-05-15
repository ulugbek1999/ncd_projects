<template>
    <div style="position: absolute; width: 100%">
      <div class="slides track">
        <div class="slide left_hidden">
          <div class="image_container">
            <img :src="Slideshow.images[3].url" :alt="Slideshow.images[3].alt">
          </div>
        </div>
        <div class="slide left" id="slide_left">
          <div class="image_container">
            <img :src="Slideshow.images[0].url" :alt="Slideshow.images[0].alt">
          </div>
        </div>
        <div class="slide center " id="slide_center" @click="slideshowHandler">
          <div class="image_container">
            <a href="#" class="prev"></a>
            <img :src="Slideshow.images[1].url" :alt="Slideshow.images[1].alt">
          </div>  
        </div>
        <div class="slide right" id="slide_right">
          <div class="image_container">
            <img :src="Slideshow.images[2].url" :alt="Slideshow.images[2].alt">
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
    .slides {
        position: absolute;
        top: 100px;
        left: 100px;
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
      height: 180px;
      width: 350px;
      position: relative;
      z-index: 1000;
      left: 240px;
      transition-property: width, height, left, right;
      transition-duration: .5s;
      transition-timing-function: ease;
    }

    .slides .left {
      position: absolute;
      left: 0;
      z-index: 2;
    }

    .slides .right {
      position: absolute;
      left: 585px;
      z-index: 10;
    }

    .slides .right {
      margin-left: -2px;
    }

    .slides .left {
      margin-right: -2px;
    }

    .slides .right, .slides .left {
      height: 130px;
      width: 250px;
      margin-top: 25px;
      transition-property: width, height, left, right;
      transition-duration: .5s;
      transition-timing-function: ease;
    }

    .slides .left_hidden {
      height: 130px;
      width: 250px;
      margin-top: 25px;
    }

    .slides .left_hidden img {
      height: 130px;
    }

    .slides > .center img {
      height: 180px;
    }

    .right img,  .left img {
      height: 130px;
    }

    .slides .image_container {
      margin: 0 auto;
      width: 60%;
      overflow: hidden;
    }

    .track {
      width: 1000px;
      overflow: hidden;
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
            url: 'https://image.makewebeasy.net/makeweb/0/K5HN2G4Kq/airfreshner/%E0%B9%80%E0%B8%A1%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%991_1.jpg',
            alt: 'Melon'
          },
          {
            url: 'http://127.0.0.1:8080/static/img/watermelon.6bb7038.jpg',
            alt: 'Watermelon'
          },
          {
            url: 'https://i5.walmartimages.ca/images/Large/428/5_r/6000195494285_R.jpg',
            alt: 'Apple'
          }
        ]
      }
    }
  },
  methods: {
    slideshowHandler () {
      const centerSlide = document.querySelector('.center')
      const leftSlide = document.querySelector('.left')
      const rightSlide = document.querySelector('.right')
      centerSlide.classList.remove('center')
      centerSlide.classList.add('left')
      leftSlide.classList.remove('left')
      leftSlide.classList.add('right')
      rightSlide.classList.remove('right')
      rightSlide.classList.add('center')
    },

  },
  computed: {
  }
}
</script>


