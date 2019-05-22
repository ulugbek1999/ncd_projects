<template>
    <div>
        <h4>Reading A1: A poster for exam candidates - 2</h4>
            <h5>Choose the sentence that has the same meaning</h5>
            <div class="remaining_items">
                {{ remaining }} items remaining
            </div>
            <div class="task_container">
                <p style="height: 50px; margin: 0">{{ tests[currentQuestion].question }}</p>
                <div v-for="(item, index) in tests[currentQuestion].answers" :key="index">
                    <input type="radio" :data-correct="item.correct" :id="'radio' + index" :value="item.correct" v-model="tests[currentQuestion].answered" name="reading_test" class="radio-button">
                    <label :for="'radio' + index">{{ item.answer }}</label><br><br><br>
                </div>
                <div class="progress_shower">
                <span  v-for="(item, index) in 5" :key="index">
                    <div class="round" :class="{'active-question': index == currentQuestion}"></div>
                </span>
                <div class="line"></div>
                </div>
            </div>
            <div class="task_switchers">
                <button class="btn btn-secondary" :class="{'disable-button': currentQuestion == 0}" @click="prevQuestion">Prev</button>
                <button class="btn btn-success" @click="resultShower">Finish</button>
                <button class="btn btn-secondary" :class="{'disable-button' : currentQuestion == 4}" @click="nextQuestion">Next</button>
            </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tests: [
                {
                    question: "No talking.",
                    answers: [
                        {
                            answer: "You can talk",
                            correct: "incorrect"
                        },
                        {
                            answer: "You can't talk",
                            correct: "correct"
                        }
                    ],
                    answered: ""
                },
                {
                    question: "ID card visible on desk.",
                    answers: [
                        {
                            answer: "You can see the ID card.",
                            correct: "correct"
                        },
                        {
                            answer: "You can't see the ID card.",
                            correct: "incorrect"
                        }
                    ],
                    answered: ""
                },
                {
                    question: "Mobile phones switched off and put away.",
                    answers: [
                        {
                            answer: "Don't have your mobile phone on the table",
                            correct: "correct"
                        },
                        {
                            answer: "It's OK to have your mobile phone on the table",
                            correct: "incorrect"
                        }
                    ],
                    answered: ""
                },
                {
                    question: "Doors close five minutes before exam.",
                    answers: [
                        {
                            answer: "You must arrive early.",
                            correct: "correct"
                        },
                        {
                            answer: "You can be five minutes later.",
                            correct: "incorrect"
                        }
                    ],
                    answered: ""
                },
                {
                    question: "If you have a question, rise your hand.",
                    answers: [
                        {
                            answer: "You can ask questions.",
                            correct: "correct"
                        },
                        {
                            answer: "You can't ask questions.",
                            correct: "incorrect"
                        }
                    ],
                    answered: ""
                }
            ],
            currentQuestion: 0,
            correctAnswers: 0,
        }
    },
    watch: {

    },
    methods: {
        prevQuestion () {
            this.radioButtonUnchecker()
            this.currentQuestion--
        },
        nextQuestion () {
            this.radioButtonUnchecker()
            this.currentQuestion++
        },
        radioButtonUnchecker () {
            const radioButtons = document.querySelectorAll('.radio-button')
            Array.from(radioButtons).forEach(element => {
                    element.checked = false
            })
        },
        resultShower () {
            for (const test of this.tests) {
                if (test.answered == "correct") {
                    this.correctAnswers++
                }
            }
            alert("Correct answers: " + this.correctAnswers)
            this.correctAnswers = 0;
        }
    },
    computed: {
        remaining () {
            var remaining = 5
            for (const test of this.tests) {
                if (test.answered == "correct" || test.answered == "incorrect") {
                    remaining--
                }
            }
            return remaining
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');

    .disable-button {
        pointer-events: none;
    }

    .task_switchers {
        display: flex;
        position: relative;
        z-index: 1000;
        top: 70px;
        width: 100%;
        text-align: center;
        justify-content: space-between;
    }

    .progress_shower {
        position: relative;
        top: 10px;
        z-index: 1000;
        text-align: center;
        left: 20px;
    }

    .round {
        display: inline-block;
        position: relative;
        z-index: 100000;
        top: 4.5px;
        width: 20px !important;
        height: 20px !important;
        border-radius: 50%;
        background-color: #658600;
        margin-right: 40px;
    } 

    .line {
        background-color: #658600;
        width: 235px !important;
        height: 4px !important;
        position: relative;
        left: 260px;
        top: 14px;
        position: absolute;
    }
    .progress_custom span {
        position: relative;
        padding: 0;
        margin: 0;
        width: 10px;
    }

    h4 {
        font-family: 'Patua One', cursive;
        color: #658600;
    }

    h5 {
        font-size: 18px;
        color: #444;
    }

    .remaining_items {
        display: inline-block;
        padding: 1px 9px;
        background-color: #d8ecf2;
        border-radius: 5px;
        position: relative;
        top: 30px;
        left: 630px;
    }
    
    .task_container {
        position: relative;
        top: 70px;
        font-size: 18px;
    }
    .task_container div {
        width: 100%;
        height: 50px;
    }

    .active-question {
        background-color: #9bbd34 !important;
    }
</style>

