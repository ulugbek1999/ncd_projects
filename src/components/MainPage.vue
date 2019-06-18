<template>
    <div>
        <ncd-loader v-if="loading"></ncd-loader>
        <div v-else>
             <!-- The Modal Form Sign in -->
            <div id="form-login" class="modal">
            <!-- Modal Content -->
            <form class="modal-content animate" action="">
                <div class="disabler">
                    <ring-loader color="#fff" class="ring-loader-form"></ring-loader>
                </div>
                <div @click = "closeLoginForm"
                class="close" title="Close Modal">&times;</div>
                <div class="imgcontainer">
                    <img src="../assets/main/avatar-login.png" alt="Avatar" class="avatar">
                </div>

                <div class="container">
                    <!-- <div v-if="requestProcessed">Hello</div> -->
                    <label for="uname"><b>Username</b></label>
                    <input type="text" v-model="loginData.username" placeholder="Enter Username" name="uname" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" v-model="loginData.password" placeholder="Enter Password" name="psw" required>

                    <button type="submit" @click="login">Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember"> Remember me
                    </label>
                </div>

                <div class="container" style="background-color:#f1f1f1">
                    <button type="button" @click = "closeLoginForm" class="cancelbtn">Cancel</button>
                    <span class="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
            </div>
            <div id="form-signup" class="modal-signup">
                <form class="modal-content animate" action="">
                    <div class="disabler">
                        <ring-loader color="#fff" class="ring-loader-form"></ring-loader>
                    </div>
                    <span @click="closeSignUpForm" class="close" title="Close Modal">&times;</span>
                    <div class="container">
                    <h1>Sign Up</h1><br>
                    <p>Please fill in this form to create an account.</p>
                    <br>
                    <hr>
                    <label for="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required>

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required>

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="psw-repeat" required>
                    
                    <label>
                        <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
                    </label>

                    <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

                    <div class="clearfix">
                        <button type="button" @click="closeSignUpForm" class="cancelbtn">Cancel</button>
                        <button type="submit" class="signupbtn">Sign Up</button>
                    </div>
                </div>
                </form>
            </div>
            <header>
                <div class="logo-holder"></div>
                <nav class="nav-holder">
                    <ul>
                        <li class="active-nav">Home</li>
                        <li>Courses</li>
                        <li>About us</li>
                        <li>Contact us</li>
                    </ul>
                </nav>
                <div class="login-register" v-if="!auth">
                    <button class="login" @click="openFormLogin">
                        <span>
                            Log in
                        </span>
                    </button>
                    <button class="register"  @click="openSignUpForm">
                        <span>Sign up</span>
                    </button>
                </div>
                <div class="profile-credentials dropdown" v-else>
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ getUsername }}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link tag="a" class="dropdown-item" :to="{name: 'dashboard'}">Dashboard</router-link>
                        <a class="dropdown-item" href="#">Settings</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Logout</a>
                    </div>
                </div>
                <div class="books-image-holder">
                    <div class="transparent-books"></div>
                </div>
                <div class="interlingvo-text">
                    <h1>{{ content[languageIdentifier - 1]["header_content"]["heading"] }}</h1>
                    <p>{{ content[languageIdentifier - 1]["header_content"]["content"] }}</p>
                </div>
                <div class="button-holders">
                    <button class="get-started"> {{ content[languageIdentifier - 1]["header_buttons"]["get_started"] }} </button>
                    <button class="learn-more"> {{ content[languageIdentifier - 1]["header_buttons"]["learn_more"] }} </button>
                </div>
            </header>
            <main>
                <div class="key-innovations">
                    <div class="key-innovations-image"></div>
                    <div class="key-innovations-text">
                        <h2><strong>Key innovations of the company: </strong></h2>
                        <ul>
                            <li class="bullet-orange">Lorem ipsum dolor sit amet</li>
                            <li class="bullet-aqua">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</li>
                            <li class="bullet-red">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</li>
                        </ul>
                    </div>
                </div>
                <div class="how-works">
                    <div class="explain-header">
                        <h3><strong>How the platform works?</strong></h3>
                    </div>
                    <div class="left-right">
                        <div class="left-right-image"></div>
                        <div class="left-right-content">
                            <h4>Deep learning</h4>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                            <p><a href="">learn more>>></a></p>
                        </div>
                    </div>
                    <div class="right-left">
                        <div class="right-left-content">
                            <h4>Track progress</h4>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</span></p>
                            <p><a href="">learn more>>></a></p>
                        </div>
                        <div class="right-left-image"></div>
                    </div>
                    <div class="left-right">
                        <div class="left-right-image e-learning"></div>
                        <div class="left-right-content">
                            <h4 style="color: #FF715B;">E-learning vision</h4>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                            <p><a href="" style="color: #FF715B;">learn more>>></a></p>
                        </div>
                    </div>
                    <div class="right-left">
                        <div class="right-left-content">
                            <h4 style="color: #27AE60">Typing trainer</h4>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</span></p>
                            <p><a href="" style="color: #27AE60">learn more>>></a></p>
                        </div>
                        <div class="right-left-image typing-trainer-img"></div>
                    </div>
                    <div class="left-right">
                        <div class="left-right-image lang-learning"></div>
                        <div class="left-right-content">
                            <h4 style="color: #2F80ED;">Language Learning Game</h4>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
                            <p><a href="" style="color: #2F80ED;">learn more>>></a></p>
                        </div>
                    </div>
                    <div class="teachers-section">
                        <h4><strong>Teachers</strong></h4>
                    </div>
                    <div class="row" style="margin-top: 100px;">
                        <div class="col">
                            <div class="teachers-container" style="float: right;">
                                <div class="teacher-example arthur" style="">
                                    
                                </div>
                                <div class="card">
                                    <h5>Full name</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.. </p>
                                </div>
                            </div>

                        </div>
                        <div class="col">
                            <div class="teachers-container">
                                <div class="teacher-example john">
                                    
                                </div>
                                <div class="card">
                                    <h5>Full name</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <h4>Contact</h4>
                <form action="" class="contact">
                    <div class="row">
                        <div class="col">
                            <div class="form-left">
                                <div class="form-group">
                                    <label for="full-name">*Name and surname</label>
                                    <input type="text" class="form-control" id="full-name">
                                </div>
                                <div class="form-group">
                                    <label for="phone-number">Phone number</label>
                                    <input type="text" class="form-control" id="phone-number">
                                </div>
                                <div class="form-group">
                                    <label for="topic">*Topic</label>
                                    <input type="text" class="form-control" id="topic">
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-right">
                                <div class="form-group">
                                    <label for="email">*Email</label>
                                    <input type="email" class="form-control" id="email">
                                </div>
                                <div class="form-group">
                                    <label for="message">*Message</label><br>
                                    <textarea name="message-field" class="form-control" id="message" cols="30"></textarea>
                                </div>
                                <p>*Obligatory</p>
                                <button class="contact-us">Contact Us</button>
                            </div>
                        </div>
                    </div>
                </form>
            </footer>
        </div>
    </div>
</template>

<script>
import Loader from './Loader'
import RingLoader from 'vue-spinner/src/FadeLoader'
import axios from 'axios'
import AuthHandler, { eventBus } from '../Authorization/AuthHandler'
import {mapState} from 'vuex'

export default {
    data () {
        return {
            content: [
                {
                    "id": 1,
                    "language": "en",
                    "header_content": {
                        "id": 1,
                        "heading": "Interlingvo",
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    "header_buttons": {
                        "id": 1,
                        "get_started": "get started",
                        "learn_more": "learn more"
                    }
                },
                {
                    "id": 2,
                    "language": "ru",
                    "header_content": {
                        "id": 2,
                        "heading": "Interlingvo",
                        "content": "Русская версия которая будет добавлена администратором сайта."
                    },
                    "header_buttons": {
                        "id": 2,
                        "get_started": "начать обучение",
                        "learn_more": "узнать больше"
                    }
                }
        ],
            title: "Interlingvo: Homepage",
            errorOccured: false,
            size: "100px",
            languageIdentifier : 1,
            formOpened: true,
            loginData: {
                username: null,
                password: null
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            document.title = this.title
            // axios.get('http://127.0.0.1:8000/api/languages/')
            //     .then((response) => {
            //         this.content = response.data.results
            //     })
            //     .catch(error => {
            //         console.log(error)
            //         this.errorOccured = true
            //     })
            //     .finally(() => {
            //         this.loading = false
            //     })
        })
    },
    methods: {
        openFormLogin () {
            $('#form-login').css('display', 'block')
            this.formOpened = true
            this.scrollDisabler()
        },
        closeLoginForm () {
            $('#form-login').css('display', 'none')
            this.formOpened = false
            this.scrollDisabler()
        },
        openSignUpForm () {
            $('#form-signup').css('display', 'block')
            this.formOpened = true
            this.scrollDisabler()
        },
        closeSignUpForm () {
            $('#form-signup').css('display', "none")
             this.formOpened = false
            this.scrollDisabler()
        },
        scrollDisabler () {
            if (this.formOpened) {
                $('body').css('overflow-y', 'hidden')
            }
            else {
                $('body').css('overflow-y', 'scroll')
            }
        },
        login (event) {
            event.preventDefault()
                if (!this.loginData.username || !this.loginData.password) {
                alert("Authentication credentials were not provided")
                }
                else {
                    const auth = new AuthHandler(this.loginData.username, this.loginData.password)
                    auth.enableAccess()
                }
        }
    },
    computed: {
        ...mapState(['requestProcessed']),
        auth () {
            return this.$store.getters.isAuthenticated
        },
        loading () {
            return this.$store.getters.beingLoaded
        },
        getUsername () {
            return this.$store.getters.username
        }
    },
    watch: {
    },
    components: {
        'ncd-loader': Loader,
        RingLoader,
    },
    created () {
        eventBus.$on('requestHandler', data => {
            if (data) {
                $('.disabler').css('display', 'block')
            }
            else {
                $('.disabler').css('display', 'none')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Fira+Sans|Montserrat|Roboto+Slab|Rubik&display=swap');
    $mainFont: 'Fira Sans', sans-serif;

    header {
        width: 100%;
        height: 1000px;
        background-image: url('../assets/main/header-background-desktop.png');
        background-position-x: right;
        background-size: cover;
        font-size: $mainFont;
    }


    .logo-holder {
        position: absolute;
        left: 2.42%;
        right: 74.37%;
        top: 51px;
        background-image: url('../assets/main/logo_login.svg');
        background-repeat: no-repeat;
        height: 60px;
        background-size: auto 60px;
        width: 350px;
    }

    * {
        margin: 0;
        padding: 0;
        user-select: none;
    }

    .nav-holder {
        position: absolute;
        left: 470px;
        top: 67px;
        height: 31px;
    }

    .nav-holder > ul {
        height: 100%;
    }

    button:active, button:focus {
        outline: none;
    }

    .nav-holder > ul > li {
        list-style-type: none;
        float: left;
        margin-right: 25px;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 28px;
        color: #fff;
        opacity: 0.5;
    }

    .nav-holder > ul > li:hover {
        cursor: pointer;
    }

    .nav-holder > ul > li:hover, .active-nav {
        opacity: 1 !important;
    }

    .login {
        transition: background-color, color .2s ease;
    }

    .register {
        @extend .login;
    }

    .login {
        position: absolute;
        left: 81.56%;
        right: 11.88%;
        top: 59px;
        width: 95px;
        height: 45px;
    }


    .login span, .register span {
        /* Default */
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 28px;
        /* or 156% */
        display: flex;
        align-items: center;
        text-align: center;
        border-radius: 30px;
    }

    .login, .register {
        color: #FFFDFD;
    }

    .login span {
        margin-left: 20px;
    }

    .login:hover {
        background-color: #fff;
        color: #000;
    }

    .register span {
        margin-left: 17px;
    }

    .register:hover {
        background-color: #fff;
        color: #E3AC1F;
    }

    .login-register button {
        background-color: #4737ff;
        border: 2px solid #FFFFFF;
        box-sizing: border-box;
        border-radius: 30px;
    }

    .register {  
        position: absolute;
        left: 89.99%;
        right: 3.45%;
        top: 59px;
        width: 95px;
        height: 45px;
    }

    .books-image-holder {
        position: absolute;
        right: 0;
        top: 186px;
        width: 637px;
        height: 701px;
        background-image: url('../assets/main/books-image-desktop.png');
        background-size: cover;
        background-repeat: no-repeat;
    }

    .transparent-books {
        background-color: #4737FF;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0.26;
    }

    .interlingvo-text {
        position: absolute;
        left: 9.26%;
        right: 50.51%;
        top: 330px;
        bottom: 47.56%;
        width: 583px;
        height: 220px;
    }

    .interlingvo-text h1 {
        font: {
            family: 'Fira Sans', sans-serif;
            style: normal;
            weight: 600;
            size: 60px;
            height: 220px;
        }
        color: #fff;
        position: relative;
        line-height: 70px;
        letter-spacing: -1px;
    }

    .interlingvo-text p {
        position: relative;
        top: 36px;
        width: 470px;
        height: 96px;
        color: #fff;
        font: {
            style: normal;
            weight: normal;
            size: 18px;
        }
        line-height: 28px;
    }

    .button-holders {
        position: absolute;
        left: 9.26%;
        min-width: 400px;
        max-width: 500px;
        top: 614px;
        height: 56.89px;
        display: flex;
        justify-content: space-between;
    }

    .button-holders button {
        padding: 0 20px;
        border: 3px solid #fff;
    }

    @mixin button-common {
        font: {
            family: 'Fira Sans';
            style: normal;
            weight: 500;
            size: 14px;
        }
        line-height: 17px;
        letter-spacing: 4px;
        text-transform: uppercase;
    }

    .get-started {
        @include button-common;
        background-color: #fff;
        color: #4737FF;
    }

    .get-started:hover {
        box-shadow: 0 0 10px #fff;
    }

    .learn-more {
        @include button-common;
        color: #fff;
        background-color: transparent;
        opacity: 0.8;
    }

    .learn-more:hover {
        opacity: 1;
    }

    .key-innovations {
        position: relative;
        top: 140px;
        left: 9.1%;
        height: 493px;
        width: 1251px;
        display: flex;
    }

    .key-innovations-image {
        width: 608px;
        height: 100%;
        background-image: url('../assets/main/innovation-image-desktop.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-size: auto 450px;
    }

    $fontSecondary: 'Rubik', sans-serif;

    .key-innovations h2 {
        font: {
            family: $fontSecondary;
            size: 34px;
            weight: bolder;
            style: normal;

        };
        line-height: 47px;
        /* or 138% */
        letter-spacing: 0.158485px;
        width: 80%;
        color: #171D1C;
        margin-top: 50px;
    }

    .key-innovations ul > li {
        list-style: none;
        margin-top: 10px;
    }

    .key-innovations ul {
        margin: 30px 1.52em;
    }

    @mixin bullets-common {
        content: "\2022";
        font-weight: bold;
        display: inline-block; 
        width: 1em;
        margin-right: 0.5em;
        margin-left: -1.52em;
    }

    .bullet-orange {
        width: 50%;
    }

    .bullet-aqua {
        width: 70%;
    }

    .bullet-orange::before {
        color: #FBB13C;
        @include bullets-common();
    }

    .bullet-aqua::before {
        color: #3BA99C;
        @include bullets-common();
    }

    .bullet-red::before {
        color: #FF715B;
        @include bullets-common();
    }

    .how-works {
        margin-top: 200px;
        width: 100%;
        height: 3373px;
        background: {
            image: url('../assets/main/combined-shape-desktop.png');
            size: cover;
            position-x: center;
            position-y: top;
            repeat: no-repeat;
        }
    }

    .explain-header {
        width: 100%;
        text-align: center;
        padding: 150px 0;
        font: {
            family: $fontSecondary;
            style: normal;
            weight: bolder;
            size: 34px;
        }
        line-height: 47px;
        color: #171D1C;
    }

    .custom-grid {
        height: 325px;
        width: 60%;
        margin: 0 auto 94px;
    }

    @mixin common-images {
        width: 325px;
        height: 325px;
        background: {
            size: cover;
            position: center;
            repeat: no-repeat;
        }
        border-radius: 50%;
    }

    .left-right {
        @extend .custom-grid;
    }

    .left-right-image {
        @include common-images();
        background-image: url('../assets/main/deep-learning.jpg');
        float: left;
    }


    @mixin how-works-common-heading {
        font: {
            family: $fontSecondary;
            style: normal;
            weight: bold;
            size: 24px;
        }
        line-height: 30px;
        /* or 125% */
        letter-spacing: 0.111872px;
        margin: 0 0 16px;
    }

    @mixin default-right-grid {
        position: relative;
        left: 178px
    }

    @mixin default-paragraph {
        width: 83%;
        color: #808988;
        font: {
            family: $fontSecondary;
            font-style: normal;
            weight: normal;
            size: 16px;
        }
        line-height: 28px;
        letter-spacing: 0.149163px;
    }

    @mixin default-content {
        padding-top: 70px;
    }

    .left-right-content {
        @include default-right-grid();
        @include default-content();
    }

    .left-right-content h4 {
        @include how-works-common-heading();
        color: #FBB13C;    
    }

    .left-right-content p {
        @include default-paragraph();
    }

    @mixin anchor-common {
        text-transform: uppercase;
        font: {
            family: $fontSecondary;
            style: normal;
            weight: bold;
            size: 12px;
        }
        line-height: 53px;
        letter-spacing: 2.85px;
    }

    .left-right-content a {
        @include anchor-common();
        color: #FBB13C;
    }

    @mixin default-right-image {
        position: relative;
        left: 70%;
    }

    .right-left-image {
        @include common-images();
        background-image: url('../assets/main/progress.jpg');
        @include default-right-image();
    }

    .right-left {
        @extend .custom-grid;
    }

    @mixin left-paragraph {
        width: 55%;
    }

    .right-left-content {
        padding-top: 70px;
        float: left;
    }

    .right-left-content p {
        @include default-paragraph();
        @include left-paragraph();
    }

    .right-left-content h4 {
        @include how-works-common-heading();
        color: #16BAC5;
    }

    .right-left-content a {
        @include anchor-common();
        color: #16BAC5;
    }

    .e-learning {
        background-image: url('../assets/main/e-vision-learning.jpg') !important;
    }

    .typing-trainer-img {
       background-image: url('../assets/main/typing-trainer.jpg') !important;
    }

    .lang-learning {
         background-image: url('../assets/main/learning-game.jpg') !important;
    }

    .teachers-section {
        margin-top: 176px;
    }

    .teachers-section h4 {
        @extend .explain-header;
        padding: 0;
    }

    .teachers-container {
        width: 469px;
        height: 600px;
        overflow: hidden;
        margin: 0 20px;
    }

    .card {
        position: absolute;
        bottom: 0;
        width: 469px;
        border: none;
        height: 456px;
        -webkit-box-shadow: 0 0 10px rgba(181,174,181,0.52);
        -moz-box-shadow: 0 0 10px rgba(181,174,181,0.52);
        box-shadow: 0 0 10px rgba(181,174,181,0.52);
    }

    .teacher-example {
        width: 300px;
        height: 300px;
        margin: 0 auto;
        background: {
            size: 289px 289px;
            position: center;
            repeat: no-repeat;
        }
        position: relative;
        z-index: 1000;
    }

    .arthur {
        background-image: url('../assets/main/arthur-example.png')
    }

    .john {
        background-image: url('../assets/main/john-example.png')
    }

    @mixin card-heading-common {
        font: {
        family: $fontSecondary;
        style: normal;
        weight: bold;
        size: 24px;
        }
        line-height: 30px;
        /* or 125% */
        letter-spacing: 0.111872px;
        
    }

    .card {
        padding: 193px 40px 40px;
    }

    .arthur + div h5 {
        @include card-heading-common();
        color: #16BAC5;
        padding-bottom: 21px;
    }

    .john + div h5 {
        @include card-heading-common();
        color: #FBB13C;
        padding-bottom: 21px;
    }

    footer {
        width: 100%;
        height: 680px;
        position: absolute;
        bottom: 1;
        background: {
            image: url('../assets/main/footer.png');
            position-x: center;
            position-y: top;
            size: cover;
            repeat: no-repeat;
            color: #fafbfe;
        }
    }

    footer h4 {
        margin-top: 85px;
        font-family: $fontSecondary;
        font-style: normal;
        font-weight: bold;
        font-size: 34px;
        line-height: 47px;
        /* identical to box height, or 138% */
        text-align: center;
        letter-spacing: 0.158485px;

        color: #FFFFFF;
    }

    @mixin label-common {
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        /* or 175% */
        letter-spacing: 0.167808px;

        color: #555E78;
    }

    .form-left, .form-right {
        width: 398px;
        margin: 80px 17px;
    }

    .form-left {
        float: right;
    }

    .form-group label {
        @include label-common();
    }

    .form-control {
        background-color: #1B202E;
        padding: 10px 20px;
        border: none;
        margin: 18px 3px 25px;
    }

    footer p {
        @include label-common();
        font-size: 10px;
    }

    textarea {
        resize: none;
    }

    textarea.form-control {
        height: 147px;
    }

    .contact-us {
        padding: 0 45px;
        border-radius: 28px;
        border: none;
        background-color: #16BAC5;
        color: #fff;
        font-family: $fontSecondary;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 53px;
        /* or 379% */
        letter-spacing: 0.381818px;
        transition: background-color .3s ease;
        float: right;
    }

    .contact-us:hover {
        background-color: rgb(8, 123, 131);
        cursor: pointer;
    }

    /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        padding-top: 60px;
    }

    /* Modal Content/Box */
    #form-login .modal-content {
        background-color: #fefefe;
        margin: 5px auto; /* 15% from the top and centered */
        border: 1px solid #888;
        width: 30%; /* Could be more or less, depending on screen size */
    }

    /* The Close Button */
    .close {
    /* Position it in the top right corner outside of the modal */
        position: absolute;
        right: 10px;
        top: 8px;
        color: #000;
        font-size: 35px;
        font-weight: bold;
        z-index: 1000
    }

    /* Close button on hover */
    .close:hover,
    .close:focus {
        color: red;
        cursor: pointer;
    }

    /* Add Zoom Animation */
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

    #form-login input[type=text], #form-login input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    /* Set a style for all buttons */
    #form-login button {
        background-color: #4737ff;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    #form-login button:hover {
        opacity: 0.8;
    }

    /* Extra styles for the cancel button */
    #form-login .cancelbtn {
        width: auto;
        padding: 10px 18px;
        background-color: #f44336;
    }

    /* Center the image and position the close button */
    #form-login .imgcontainer {
        text-align: center;
        margin: 24px 0 12px 0;
        position: relative;
    }

    #form-login img.avatar {
        width: 40%;
        border-radius: 100%;
    }

    #form-login .container {
        padding: 16px;
    }

    #form-login span.psw {
        float: right;
        padding-top: 16px;
    }

    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }

/* Change styles for cancel button and signup button on extra small screens */
    @media screen and (max-width: 300px) {
        .cancelbtn, .signupbtn {
            width: 100%;
        }
    }

    .modal-signup {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        padding-top: 60px;
    }

    #form-signup .modal-content {
        background-color: #fefefe;
        margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
        border: 1px solid #888;
        width: 50%; /* Could be more or less, depending on screen size */
    }

    #form-signup input[type=text], input[type=password] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }

    /* Add a background color when the inputs get focus */
    #form-signup input[type=text]:focus, #form-signup input[type=password]:focus {
        background-color: #ddd;
        outline: none;
    }

    /* Set a style for all buttons */
    #form-signup button {
        background-color: #4737ff;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 0.9;
    }

    #form-signup button:hover {
        opacity:1;
    }

    /* Extra styles for the cancel button */
    #form-signup .cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
    }

    /* Float cancel and signup buttons and add an equal width */
    #form-signup .cancelbtn, #form-signup .signupbtn {
        float: left;
        width: 50%;
    }

    /* Add padding to container elements */
    #form-signup .container {
        padding: 16px;
    }

    .disabler {
        z-index: 100000;
        position: absolute;
        background-color: rgba(92, 90, 90, 0.54);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: none;
    }

    .ring-loader-form {
        margin: 300px 50%;
    }

    .profile-credentials {
        position: absolute;
        right: 0;
        margin-right: 50px;
        top: 69px;
    }

    .profile-credentials a {
        color: #fff;
        opacity: 1;
        max-width: 250px;
    }

    .profile-credentials > .dropdown-menu {
        margin-left: -40px;
        margin-top: 10px;
        padding: 0.5rem 0;
    }

    .profile-credentials > .dropdown-menu > a {
        color: #000;
        padding: 0.25rem 1.5rem
    }
</style>
