<template>
    <div style="position: absolute;" class="main_container" >
        <div class="listening_exercise">
            <h3>Introducing a friend</h3>
            <div class="image_container"></div>
            <audio controls class="listening_audio">
                <source src="../children/audios/A1_introducing_a_friend.mp3" type="audio/mpeg">
                Your browser does not support audio tag
            </audio>
            <router-link :to="{name: 'Unit1_listening_exercise'}" style="position: relative; top: 10px; left: -20px;" class="exercise"><a>Exercise>>></a></router-link>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Concert+One&display=swap');

    .listening_audio {
        width: 100%;
        position: relative;
        top: -5px;
    }

    .listening_audio:focus {
        outline: none;
    }

    .listening_exercise {
        width: 820px;
        height: 420px;
        box-shadow: 0 0 10px lightgray;
        position: absolute;
        top: 50px;
        left: 90px;
        background-color: #fff;
        padding: 10px 20px;
    }

    .listening_exercise h3 {
        font-family: 'Concert One', cursive;
        color: #8f3778;
    }

    .image_container {
        width: 70%;
        height: 80%;
        margin: 0 auto;
        background-image: url('../children/images/friends.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: center
    }

    @media screen and (max-width: 1000px) {
        .main_container {
            right: 0;
            left: 0
        }

         .listening_exercise {
             margin: 0 auto;
             left: 0;
             right: 0;
         }

    }

    @media screen and (max-width: 850px) {
        .listening_exercise {
            width: 95%;
        }

        .image_container {
            width: unset;
        }
    }
</style>


