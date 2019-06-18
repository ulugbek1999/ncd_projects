<template>
    <div style="position: relative; min-height: 300px;">
        <div class="admin-login">
            <div class="brand-container">
                <div style="display: flex; margin-left: 20px">
                    <div class="logo-holder"></div> Administer
                </div>
            </div>
            <form>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" autocomplete="off" id="username" aria-describedby="username" v-model="credentials.username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" v-model="credentials.password">
                </div>
                <div style="width: 100%">
                    <button type="submit" class="btn btn-secondary" style="position: relative; left: 145px" @click="login">Log in</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import AuthHandler from '../Authorization/AuthHandler'

import {eventBus} from '../Authorization/AuthHandler'

export default {
    methods: {
        login (event) {
            event.preventDefault()
            var auth = new AuthHandler(this.credentials.username, this.credentials.password)
            auth.enableAccess()
            this.$router.push({name: 'admin-page'})

        }
    },
    data () {

        return {
            credentials: {
                username: '',
                password: ''
            }
        }
    },
    created() {
    }
}
</script>

<style>
    body {
        background-color: #f8f8f8 !important
    }
</style>


<style scoped>
    .admin-login {
        box-shadow: 0 0 10px lightgray;
        width: 400px;
        background-color: #fff;
        display: inline-block;
        border-radius: 4px;
        margin: 150px auto;
        position: absolute;
        top: 0;
        left: 0; 
        right: 0;
    }


    .admin-login form {
        padding: 20px 20px;
    }

    .logo-holder {
        background-image: url('./unit1/children/images/logo_login.svg');
        width: 68px;
        height: 25px;
        background-size: 130px auto;
        background-repeat: no-repeat;
        margin-right: 5px;
    }

    .brand-container {
        background-color: #343a40;
        color: #fff;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        text-align: center;
        padding: 15px 0;
    }
</style>
