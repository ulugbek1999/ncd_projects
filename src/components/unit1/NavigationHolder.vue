<template>
<div class="placeholder">
    <header>
        <div class="logo_holder">
            <div class="logo"></div>
        </div>
        <nav class="desktop">
            <div class="nav-links">
                <router-link :to="{name: 'Unit1_grammar'}" tag="div" class="nav-link" style="padding-left: 60px; margin-left: -9px" active-class="active_navs">
                    <p>Grammar</p>
                </router-link>
                
                <router-link class="nav-link" style="padding-left: 51px; margin-left: -30px" tag="div" :to="{name: 'Unit1_vocabulary'}" active-class="active_navs">
                    <p>Vocabulary</p>
                </router-link>
                <router-link tag="div" class="nav-link" style="padding-left: 63px; margin-left: -30px" :to="{name: 'Unit1_reading'}" active-class="active_navs">
                    <p>Reading</p>
                </router-link>
                <router-link tag="div" class="nav-link" style="padding-left: 61px; margin-left: -30px" :to="{name: 'Unit1_listening'}" active-class="active_navs">
                    <p>Listening</p>
                </router-link>
                <router-link tag="div" class="nav-link" style="padding-left: 52px; margin-left: -30px" :to="{name: 'Unit1_homework'}" active-class="active_navs">
                    <p>Homework</p>
                </router-link>
            </div>
            <div class="nav-links-mobile" style="position: absolute; z-index: 210000">
                <ul>
                    <router-link tag="li" :to="{name: 'Unit1_grammar'}" active-class="opacity1">
                        <a>Grammar</a>
                    </router-link>
                    <router-link tag="li" :to="{name: 'Unit1_vocabulary'}" active-class="opacity1">
                        <a>Vocabulary</a>
                    </router-link>
                    <router-link tag="li" :to="{name: 'Unit1_reading'}" active-class="opacity1">
                        <a>Reading</a>
                    </router-link>
                    <router-link tag="li" :to="{name: 'Unit1_listening'}" active-class="opacity1">
                        <a>Listening</a>
                    </router-link>
                    <router-link tag="li" :to="{name: 'Unit1_homework'}" active-class="opacity1">
                        <a>Homework</a>
                    </router-link>

                </ul>
            </div>
            <div class="ultra-nav">
                <div class="icon-nav" @click="menuAnimator">
                    <span style="position: relative; top: -10px;">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </span>  
                </div>
                 <!-- The overlay -->
                <div id="myNav" class="overlay">

                    <!-- Button to close the overlay navigation -->
                    <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>

                    <!-- Overlay content -->
                    <div class="overlay-content">
                        <router-link :to="{name: 'Unit1_grammar'}">Grammar</router-link>
                        <router-link :to="{name: 'Unit1_vocabulary'}">Vocabulary</router-link>
                        <router-link :to="{name: 'Unit1_reading'}">Reading</router-link>
                        <router-link :to="{name: 'Unit1_listening'}">Listening</router-link>
                        <router-link :to="{name: 'Unit1_homework'}">Homework</router-link>
                    </div>

                </div> 
            </div>
        </nav>
        <div class="layers">
            <div class="layer1"></div>
            <div class="layer2"></div>
        </div>
    </header>
    <main>
        <router-view></router-view>
    </main>

    <footer>
        <div class="layer3"></div>
        <div class="navigators">
            <router-link :to='{name: "HomePage"}'>
                <div class="navigator home_navigator">Home</div>
            </router-link>
            
            <div class="navigator back_navigator">Back</div>
            <div class="page_counter">1/5</div>
            <router-link tag="div" class="navigator next_navigator" :to="{name: 'Unit1_grammar_exercise'}">Next</router-link>
        </div>
        
    </footer>
</div>
</template>

<script>
export default {
    data () {
        return {
            scrollDisabled : false
        }
    },
    methods: {
        grammarRedirect () {
            this.$router.push({
                name: "Uni1_grammar_video"
            })
        },
        menuAnimator (event) {
            document.getElementById("myNav").style.width = "100%";
            this.disable_enableScroll()
        },
        openNav() {
        },
        closeNav() {
            document.getElementById("myNav").style.width = "0%";
            this.scrollDisabled = true;
            this.disable_enableScroll()
        },
        disable_enableScroll () {
            this.$emit('disabled', this.scrollDisabled)
        }
    },
    mounted () {
        this.$nextTick(() => {

        })
    },
    watch: {
        '$route' (to, from) {
            $('.overlay').css({'width' : 0})
        }
    }
}
</script>

<style scoped>
body {
  background-color: #aeb4b4;
  overflow: hidden;
}

html {
    overflow: hidden;
}


a {
    color: #000;
    text-decoration: none;
}

.navigators {
    position: absolute;
    display: flex;
    left: 435px;
}

.navigators div {
    margin-right: 20px;
    padding-top: 11px;
}

.page_counter {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    margin-left: -10px;
}

.navigator {
    background-image: url('./children/Page_Lesson/skeleton/materials/navigation_button_small_bottom.png');
    background-size: auto 50px;
    background-repeat: no-repeat;
    width: 90px;
    height: 100px;
    margin-left: -20px;
    text-align: center;
    padding-left: 10px;
    opacity: 0.9;
    transition: all .1s ease;
    color: #fff
}

.navigator:hover {
    cursor: pointer;
    opacity: 1;
}

header {
    position: relative;
    top: 10px;
    left: 10px;
}

.placeholder {
margin: 50px auto;
max-width: 1000px;
height: 650px;
box-shadow: 0 0 10px lightblue;
background-color: #f6f6e9;
overflow: hidden;
}

.opacity1 {
    opacity: 1 !important;
}

.logo_holder {
    position: relative;
    z-index: 20;
    width: 105px;
    height: 70px;
    background-color: #1f25af;
    padding-top: 3px;
    float: left;
}

.logo {
    position: absolute;
    background-image: url('./children/images/logo_login.svg');
    background-repeat: no-repeat;
    background-size: auto 38px;
    width: 115px;
    height: 60px;
    margin-top: 12px;
    left: 20px;
}

nav.desktop {
    background-color: #1f25af;
    width: 88.8%;
    height: 70px;
    position: relative;
    left: 102px;
}

.nav-links {
    display: flex;
    justify-content: space-around;
    width: 88%;
    left: -50px;
    height: inherit;
    position: relative;
    top: 0;
}

.nav-link {
    background-image: url('./children/Page_Lesson/skeleton/materials/navigation_button_head.png');
    background-size: auto 100px;
    background-repeat: no-repeat;
    position: relative;
    top: -15px;
    width: 180px;
    padding-top: 32px;
    height: 100px;
    font-size: 20px;
    opacity: 0.7;
    transition: all .2s ease-in-out;

}

.nav-link p {
    color: #fff;
}

.nav-link:hover, .active_navs, .nav-links-mobile li:hover {
    opacity: 1;
    cursor: pointer;
}


.layers {
    position: relative;
    top: 3px;
    display: flex;
    width: 750px;
}

.layer1 {
    width: 100px;
    height: 5px;
    background-color: #fc6188;
}

.layer2 {
    margin-left: 80px;
    width: 90%;
    height: 5px;
    background-color: #fc6188;
}

footer {
    position: relative;
    top: 520px;
    left: 270px;
}

.icon-nav {
    display: inline-block;
    cursor: pointer;
    top: 10px;
    position: relative;
}

.icon-nav div {
    width: 35px;
    height: 5px;
    background-color: #fff;
    margin: 6px 0;
    display: none;
}

.layer3 {
    height: 10px;
    width: 730px;
    background-color: #1f25af;
}

.copyright {
    position: absolute;
    z-index: 2;
    top: 450px;
    background-color: #3e75c7;
    height: 300px;
    width: 1000px;
}

.footer_unit1 {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
    background-color: #305895;
    text-align: center;
    color: #fff;
    padding-top: 5px;
}

.nav-links-mobile li {
    list-style-type: none;
    float: left;
    margin-right: 16px;
    font-size: 20px;
    background-image: linear-gradient(to right, #fd6189, #ff7d5c);
    padding: 5px 20px;
    box-shadow: 0 0 10px #fd6189;
    border-radius: 1px;
    opacity: 0.7;
    transition: opacity .2s ease-in-out;
}


.nav-links-mobile li:last-of-type {
    margin-right: 0;
}

.nav-links-mobile a {
    color: #fff;
}

.nav-links-mobile {
    display: none;
}



.bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

/* Rotate first bar */
.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px) ;
  transform: rotate(-45deg) translate(-9px, 6px) ;
}

/* Fade out the second bar */
.change .bar2 {
  opacity: 0;
}

/* Rotate last bar */
.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px) ;
  transform: rotate(45deg) translate(-8px, -8px) ;
}

 /* The Overlay (background) */
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */   
  height: 100%;
  width: 0;
  position: fixed; /* Stay in place */
  z-index: 10000000; /* Sit on top */
  right: 0;
  top: 0;
  background-color: rgb(0,0,0); /* Black fallback color */
  background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}

/* Position the content inside the overlay */
.overlay-content {
  position: relative;
  top: 25%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
}

/* The navigation links inside the overlay */
.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block; /* Display block instead of inline */
  transition: 0.3s; /* Transition effects on hover (color) */
}

/* When you mouse over the navigation links, change their color */
.overlay a:hover, .overlay a:focus {
  color: #f1f1f1;
}

/* Position the close button (top right corner) */
.overlay .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
@media screen and (max-height: 450px) {
  .overlay a {font-size: 20px}
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}


@media screen and (max-width: 1000px) {
    .placeholder {
        width: 99%;
        margin: 50px auto;
        overflow-x: hidden;
    }

    
    .navigators {
        left: unset;
        right: 260px;
    }

    .nav-links {
        display: none;
    }

    .nav-links-mobile {
        display: block;
        top: 14px;
        left: 60px;
    }
    
    
}

@media screen and (max-width: 950px) {
    .nav-links-mobile {
        right: 40px;
        left: unset;
    }
}

@media screen and (max-width: 880px) {
    .nav-links-mobile {
        right: unset;
        left: 40px;
    }

    .nav-links-mobile li {
        background-image: none;
        box-shadow: none;
        margin-right: 0;
        padding-right: 10px;
    }
}

@media screen and (max-width: 800px) {
    .nav-links-mobile {
        right: unset;
        left: 0;
    }
}

@media screen and (max-width: 730px) {
    .nav-links-mobile {
        display: none;
    }

    .icon-nav div {
        position: relative;
        display: block;
        top: 15px;
    }

    .icon-nav {
        float: right;
        position: relative;
        right: 60px;
    }
}

@media screen and (max-width: 530px) {
    .icon-nav {
        right: 90px;
    }
}
</style>


