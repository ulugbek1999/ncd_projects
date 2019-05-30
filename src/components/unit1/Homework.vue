<template>
    <div style="position: absolute; left: 0; right: 0">
        <div class="homework">
            <div style="margin: 0 auto">
                <h1>Homework will be availble in:</h1>
                <br>
                <flip-clock></flip-clock>
            </div>    
        </div>
    </div>
</template>

<script>
import FlipClock from '../FlipClock'
export default {
    components: {
        FlipClock
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Baloo+Bhai&display=swap');

    h1 {
        font-family: 'Baloo Bhai', cursive;
        font-size: 2.5em;
        color: #85144b;
    }
    
    .homework {
        position: relative;
        top: 170px;
        width: 100%;
        text-align: center;
    }

    @media screen and (max-width: 600px) {
        h1 {
            font-size: 6.9vw
        }
    }
</style>
