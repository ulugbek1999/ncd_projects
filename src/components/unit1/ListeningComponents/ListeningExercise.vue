<template>
    <div style="position: absolute">
        <div class="exercise_holder">
            <h3>Introducing a friend</h3>
            <h5>Write the words to fill the gaps</h5>
            <div class="remaining_items">
                {{ remaining }} items remaining
            </div>
            <div class="exercise">
                <p>Sumi: Hi, Pablo. How are you?</p>
                <p>Pablo: Hi, Sumi. <input type="text" data-correct="I'm fine" v-model="listeningAnswers[0]" class="form-control answer-input" @keypress="dynamicWidth"> , thanks.</p>
                <p>Sumi: Pablo, this is Greta.</p>
                <p>Pablo: Hi, Greta, <input type="text" data-correct="I'm" class="form-control answer-input" v-model="listeningAnswers[1]" @keypress="dynamicWidth"> Pablo.</p>
                <p>Greta: Hi. How are you?</p>
                <p>Pablo: I'm fine thanks. <input type="text" class="form-control answer-input" @keypress="dynamicWidth" v-model="listeningAnswers[2]" data-correct="Where are you"> from, Greta?</p>
                <p>Greta: I'm from Germany. Where are you from?</p>
                <p>Pablo: I'm from Argentina. <input type="text" class="form-control answer-input" v-model="listeningAnswers[3]" data-correct="Nice to meet" @keypress="dynamicWidth"> you.</p>
                <p>Greta: Nice to meet you too.</p>
            </div>
            <div style="width: 100%; text-align:center">
                <button class="btn btn-success" style="margin: 0 auto" @click="answersChecker">Finish</button><br><br>
            </div>
            
        </div>
        <router-link :to="{name: 'Unit1_listening_recording'}" style="position: absolute; top: 500px; left: 100px; width: 100px"><a>Go back</a></router-link>
    </div>
</template>

<script>
export default {
    data () {
        return {
            correctAnswers: 0,
            listeningAnswers: ['', '', '', '']
        }
    },
    methods: {
        dynamicWidth (event) {
            var inputWidth = event.target.clientWidth
            inputWidth += 9
            if (inputWidth < 230) {
                event.target.style.width = inputWidth + 'px';
            }   
        },
        answersChecker (event) {
            const answerInputs = document.querySelectorAll('.answer-input')
            Array.from(answerInputs).forEach(element => {
                if (element.dataset.correct == element.value.trim()) {
                    this.correctAnswers++
                }
            })
            alert(`You have ${this.correctAnswers} correct answers.`)
            this.correctAnswers = 0
        }
    },
    computed: {
        remaining () {
            var remaining = 0
            for (const answer of this.listeningAnswers) {
                if (answer == '') {
                    remaining++
                    
                }
            }
            return remaining
        }
    }
}
</script>

<style scoped>
    .answer-input {
        display: inline-block;
        width: 40px;
        padding-right: 10px
    }

    .exercise_holder {  
        width: 820px;
        height: 420px;
        box-shadow: 0 0 10px lightgray;
        position: absolute;
        top: 50px;
        left: 90px;
        background-color: #fff;
        padding: 10px 20px;
        overflow-y: scroll;
    }

    h3 {
        font-family: 'Concert One', cursive;
        color: #8f3778;
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
            left: 620px;
    }

</style>

