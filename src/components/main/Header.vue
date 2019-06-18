<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="brand-container">
                    <div style="display: flex; margin-left: 20px">
                        <div class="logo-holder"></div> Interlingvo
                    </div>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" style="margin-left: 50px" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link :to='{name: "MainPage"}' class="nav-link" href="#">Home <span class="sr-only">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Courses</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact us</a>
                        </li>
                        <li class="nav-item dropdown user-information">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ getUsername }}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Dashboard</a>
                                <a class="dropdown-item" href="#">Settings</a>
                                <div class="dropdown-divider"></div>
                                <a @click="logout" class="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        logout () {
            this.$store.dispatch('logoutDispatcher')
            this.$router.replace({name: 'MainPage'})
        }
    },
    computed: {
        auth () {
            return this.$store.getters.isAuthenticated
        },
        getUsername () {
            return this.$store.getters.username
        }
    }
}
</script>

<style lang="scss" scoped>
    nav {
        height: 60px;
    }

    .logo-holder {
        background-image: url('../../assets/main/logo_login.svg');
        width: 68px;
        height: 25px;
        background-size: 130px auto;
        background-repeat: no-repeat;
        margin-right: 5px;
    }

    .brand-container {
        color: #fff;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        text-align: center;
        padding: 15px 0;
    }

    ul > li {
        margin-right: 10px;
    }

    

    .user-information {
        position: absolute;
        right: 0;
        margin-right: 100px;
    }

</style>

