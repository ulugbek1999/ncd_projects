<template>
    <div style="position: absolute" >
        <div class="title_holder">
            <router-link tag="div" class="img_holder" :to="{name: 'Unit1_reading_exercise'}">
                <img src="../children/images/benedict_cumberbartch.png" alt="Benedict Cumberbatch" class="reading_img">
            </router-link>
            <div class="text_holder">
                <h3>DO YOU BELIEVE IN MAGIC?</h3>
                <p>
                    There are a lot of people who say they can make <br>
                    magic on something or any trick. However, <br>
                    we think it's impossible to do so. For...
                </p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    
}
</script>


<style scoped>
     @import url('https://fonts.googleapis.com/css?family=Concert+One&display=swap');

    .title_holder {
        width: 820px;
        height: 420px;
        box-shadow: 0 0 10px lightgray;
        position: absolute;
        top: 50px;
        left: 90px;
        background-color: #fff;
    }

    .text_holder {
        position: absolute;
        top: 190px;
        left: 30px;
    }

    .text_holder h3 {
        font-family: 'Concert One', cursive
    }

    .text_holder p {
        font-size: 20px;
        margin-top: 25px;
    }

    .reading_img {
        width: 100%;
        height: 420px;
        opacity: 0.8;
        transition: opacity .3s ease;
    }

    .reading_img:hover {
        opacity: 1;
        cursor: pointer;
    }

    .img_holder {        
        -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%);
        clip-path: polygon(0 0, 100% 0, 100% 100%);
        overflow: hidden;
    }
</style>
