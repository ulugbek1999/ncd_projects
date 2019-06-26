<template>
    <div class="sidebar">
        <div style="display: flex">
            <div class="user-icon"></div>
            <h4 style="margin: 5px 15px">{{ firstLastName }}</h4>
        </div>
        <hr>
        <div class="side-links">
            <ul>
                <router-link tag="li" :to="{name: 'dashboard'}" active-class="active-sidebar" class="side-link" exact>
                    <a>
                        <div class="dashboard-image"></div>
                        <p>Dashboard</p>
                    </a>
                </router-link>
                <li class="side-link">
                    <a href="">
                        <div class="message-image"></div>
                        <p>Messages</p>
                    </a>
                </li>
                <li class="side-link">
                    <a href="">
                        <div class="tasks-image"></div>
                        <p>Tasks</p>
                    </a>
                </li>
                <li class="side-link">
                    <a href="">
                        <div class="friends-image"></div>
                        <p>Friends</p>
                    </a>
                </li>
                <hr>
                <span class="settings-span">Settings</span>
                <router-link tag="li" :to="{name: 'settings'}" active-class="active-sidebar" class="side-link">
                    <a>
                        <div class="settings-image"></div>
                        <p>Main Settings</p>
                    </a>
                </router-link>
                <li class="side-link">
                    <a href="">
                        <div class="notification-image"></div>
                        <p>Notifications</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        firstLastName () {
            return this.$store.getters.fullName
        }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar {
        border: {
            top: 1px solid lightgray;
            right: 1px solid lightgray;
            bottom: 1px solid lightgray;
        }
        padding: 40px 20px;
    }

    .side-links > ul > li {
        list-style-type: none;
    }

    .user-icon {
        background: {
            image: url('../../assets/main/user.png');
            size: cover;
            repeat: no-repeat;
            position: center;
        } 
        width: 40px;
        height: 40px;
        margin-bottom: 15px;
    }

    .user-icon + h4 {
        font-family: 'Roboto', 'Arial', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        /* or 150% */
        letter-spacing: 0.15px;
    }

    .side-links ul {
        padding: 0 !important;
    }

    .side-link a {
        display: flex;
        text-decoration: none;
    }

    .dashboard-image {
        background: {
            size: cover;
            image: url('../../assets/main/dashboard.png');
            repeat: no-repeat;
            position: center;
        }
        opacity: 0.6;
        height: 25px;
        width: 25px;
    }

    .side-link:hover .dashboard-image, .active-sidebar .dashboard-image {
         background-image: url('../../assets/main/dashboard-active.png')
    }

    .side-link p {
        margin-left: 20px;
    }

    .side-links a {
        color: #000;
    }

    .side-links ul > li {
        padding: 12px 8px 0;
        margin: 15px 0;
        margin-left: -8px;
    }

    .side-link:hover, .active-sidebar {
        background-color: #E3F2FD;
        border-radius: 4px;
    }

    .message-image {
        @extend .dashboard-image;
        background-image: url('../../assets/main/message.png')
    }

    .side-link:hover a, .active-sidebar a {
        color: #2196F3
    }

    .side-link:hover .message-image, .active-sidebar .message-image {
         background-image: url('../../assets/main/message-active.png')
    }

    .tasks-image {
        @extend .dashboard-image;
        background-image: url('../../assets/main/tasks.png')
    }

    .side-link:hover .tasks-image, .active-sidebar .tasks-image {
         background-image: url('../../assets/main/tasks-active.png')
    }

    .friends-image {
        @extend .dashboard-image;
        background-image: url('../../assets/main/friends.png')
    }

    .side-link:hover .friends-image, .active-sidebar .friends-image {
         background-image: url('../../assets/main/friends-active.png')
    }

    .settings-image {
        @extend .dashboard-image;
        background-image: url('../../assets/main/settings.png')
    }

    .side-link:hover .settings-image, .active-sidebar .settings-image {
        background-image: url('../../assets/main/settings-active.png')
    }

    .notification-image {
        @extend .dashboard-image;
        background-image: url('../../assets/main/notification.png')
    }

    .side-link:hover .notification-image, .active-sidebar .notification-image {
        background-image: url('../../assets/main/notification-active.png')
    }

    .settings-span {
        font-family: 'Roboto', 'Arial', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        /* or 150% */
        letter-spacing: 0.25px;
        color: #9E9E9E;
        position: relative;
        top: -10px;
    }
</style>

