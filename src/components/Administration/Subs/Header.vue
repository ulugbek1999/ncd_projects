<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <div style="display: flex; color: #fff; margin-right: 20px">
                    <div class="logo-holder"></div> Administer
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon navbar-light"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link tag="a" :to="{name: 'courses-admin'}" active-class="active_nav" class="nav-link" href="">Courses <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Account usage</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Settings
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Account settings</a>
                    <a class="dropdown-item" href="#">Invite admin</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click="logout">Logout</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search courses" aria-label="Search">
                <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </div>
</template>

<script>
import AuthHandler from '../../../Authorization/AuthHandler'
export default {
    data () {
        return {

        }
    },
    methods: {
        logout() {
            new AuthHandler().removeSession()
            this.$router.push({name: 'administer'})
        }
    }
}
</script>

<style>
    body {
        background-color: #f8f8f8 !important
    }
</style>


<style scoped>
    .navbar {
        background-color: #343a40 !important;
    }

    nav a {
        color: rgb(202, 200, 200);
    }

    nav a:hover {
        color: rgb(245, 245, 245)
    }

    .logo-holder {
        background-image: url('../../unit1/children/images/logo_login.svg');
        width: 68px;
        height: 25px;
        background-size: 130px auto;
        background-repeat: no-repeat;
        margin-right: 5px;
    }

    .active_nav {
        color: rgb(245, 245, 245);
        pointer-events: none;
    }

    .dropdown-item {
        color: #999;
    }
</style>

