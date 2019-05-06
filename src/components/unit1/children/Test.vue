<template>
    <div class="test">
        <div class="flexer">
            <h1 class="testNumber">Test {{testNumber}}</h1>
            <h6>GRAMMAR</h6>
        </div>
            
            <div class="questions">
                <div class="question">
                    <h3>"We were targeting make money in this city"</h3>
                    <h5>Please, choose appropriate verb type:</h5>
                </div>
                <div class="options">
                    <div class="option" v-for="(option, index) in options" :key="index">
                        <p v-bind:id="index" :data-correct="option.correct" @click="optionCkecker">{{ option.option }}</p>
                    </div>
                </div> 
            </div>
            <div class="progress_custom">
                <span  v-for="index in 9" :key="index">
                    <div class="round"></div>
                    <div class="line"></div>
                </span>
                <div class="round"></div>
            </div>
    </div>
</template>

<style>
    .flexer {
        padding-top: 60px;
        display: flex;
        justify-content: space-around
    }

    .flexer h6 {
        font-size: 20px;
        background-color: #fff;
        border-radius: 5px;
        width: 200px;
        text-align: center;
        padding-top: 13px;
    }
    .testNumber {
        text-align: center;
        color: #fff;
        font-family: Verdana, Geneva, Tahoma, sans-serif
    }

    .questions {
        margin-top: 70px;
    }

    .question {
        text-align: center;
        color: rgb(255, 255, 255);
    }

    .options {
        margin-top: 100px;
    }

    .option {
        display: inline-block;
        width: 50%;
        height: 100px;
        text-align: center
    }

    .option p {
        background-color: #fff;
        width: 200px;
        height: 30px;
        padding-top: 2px;
        margin: 0 auto;
        border-radius: 5px;
        transition: all .3s ease;
    }

    .option p:hover {
        background-color: rgb(218, 214, 214);
        cursor: pointer;
    }

    .progress_custom {
        display: flex;
        position: relative;
        top: 70px;
        left: 20px;
    }

    .round {
        position: relative;
        top: 4.5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
    } 

    .line {
        background-color: #fff;
        width: 40px;
        height: 4px;
        position: relative;
        left: 0;
        top: -2.7px;
    }
    .progress_custom span {
        position: relative;
        padding: 0;
        margin: 0;
    }
</style>

<script>
export default {
    data () {
        return {
            testNumber : 1,
            options: [
                {
                    option: "Present Simple",
                    correct: 0
                },
                {
                    option: "Past Continous",
                    correct: 1
                },
                {
                    option: "Past Perfect",
                    correct: 0
                },
                {
                    option: "Past Simple",
                    correct: 0
                },
            ]
        }
    },
    methods: {
        //Randomly sorts arrays. Source code: 
        shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        },
        optionCkecker (event) {
            const options = document.querySelectorAll('[data-correct')
            if (event.target.dataset.correct == 1) {
                event.target.style.backgroundColor = "rgb(0, 255, 0)"
                event.target.style.color = "#fff"
                options.forEach(element => {
                    element.style.cursor = "default"
                    element.style.pointerEvents = "none"
                }) 
            }
            else {
                event.target.style.backgroundColor = "red"
                event.target.style.color = "#fff"
                options.forEach(element => {
                    if (element.dataset.correct == 1) {
                        element.style.backgroundColor = "rgb(0, 255, 0)";
                        element.style.color = "#fff"
                    }
                })
                options.forEach(element => {
                    element.style.cursor = "default"
                    element.style.pointerEvents = "none"
                }) 
            }
        }
    },
    mounted () {
        this.shuffle(this.options)
    }
}
</script>

