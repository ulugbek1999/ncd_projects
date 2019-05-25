<template>
<div class="placeholder">
    <header>
        <div class="logo_holder">
            <div class="logo"></div>
        </div>
        <nav>
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
            <div class="layers">
                <div class="layer1"></div>
                <div class="layer2"></div>
            </div>
            
        </nav>
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
        
        }
    },
    methods: {
        grammarRedirect () {
            this.$router.push({
                name: "Uni1_grammar_video"
            })
        }
    }
}
</script>

<style scoped>
body {
  background-color: #aeb4b4;
  overflow-x: hidden;
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

nav {
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

.nav-link:hover, .active_navs {
    opacity: 1;
    cursor: pointer;
}


.layers {
    position: relative;
    top: 3px;
    left: -102px;
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
</style>


