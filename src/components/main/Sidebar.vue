<template>
    <div class="sidebar">
        <div class="user-credentials-container" v-if="credentials">
            <div style="display: flex">
                <div class="user-icon"></div>
                <h4 style="margin: 5px 15px">{{ firstLastName }}</h4>
            </div>
            <hr>
        </div>
        <div class="side-links">
            <ul>
                <router-link 
                tag="li" 
                :to="link.toNavigate" 
                active-class="active-sidebar" 
                class="side-link" 
                :id="'side-link-' + index" 
                exact 
                v-for="(link, index) in sideLinks" :key="'A-' + index" >
                    <a>
                        <div 
                        class="side-icon"  
                        :id="'side-link-image-' + index" 
                        :data-hovered="link.hoverImage"
                        :style="{backgroundImage: 'url(' + link.mainImage + ')'}"></div>
                        <p>{{ link.name }}</p>
                    </a>
                    
                </router-link>
                <div class="extras" v-if="extraName">
                    <hr>
                    <span class="settings-span">{{ extraName }}</span>
                </div>
                <router-link 
                tag="li" 
                :to="extraLink.toNavigate" 
                active-class="active-sidebar" 
                class="side-link"
                v-for="(extraLink, extraIndex) in extraLinks"
                :key="'B-' + extraIndex"
                exact
                :v-if="extraIndex != 0"
                >
                    <a>
                        <img class="side-icon" :src="extraLink.mainImage" :id="'extra-link-image-' + extraIndex" :data-hovered="extraLink.hoverImage">
                        <p>{{ extraLink.name }}</p>
                    </a>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        firstLastName () {
            return this.$store.getters.fullName
        },
        getUserId () {
            return this.$store.getters.getUserId
        }
    },
    props: {
        credentials: {
            type: Boolean,
            default: false
        },
        sideLinks: {
            type: Array,
            default: null
        },
        extra: {
            type: Boolean,
            default: false
        },
        extraLinks: {
            type: Array,
            default: null
        },
        extraName: {
            type: String,
            default: null
        }
    },
    methods: {

    },
    data () {
        return {
            linkHover: false
        }
    },
    mounted () {
       
    },
    watch: {

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
        padding: 30px 20px;
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

    .side-icon {
        background: {
            size: cover;
            repeat: no-repeat;
            position: center;
        } 
        opacity: 0.6;
        height: 25px;
        width: 25px;
    }

    // .side-link:hover .side-icon, .active-sidebar .side-icon {
    //      background-image: url('../../assets/main/side-icon.png')
    // }

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

    .active-sidebar {
        pointer-events: none;
    }

    .side-link:hover a, .active-sidebar a {
        color: #2196F3
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

