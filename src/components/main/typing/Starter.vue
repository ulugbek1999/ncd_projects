<template>
    <div class="starter">
        <p>Drill information</p><hr>
        <div class="row">
            <div class="col-md-4"><p>Duration</p></div>
            <div class="col">{{ duration }}</div>
        </div>
        <div class="row">
            <div class="col-md-4"><p>Accuracy Goal</p></div>
            <div class="col">
                <select name="accuracy" id="accuracy-goal" v-model="accuracyGoal">
                    <option value="beginner">90% Beginner</option>
                    <option value="intermediate">94% Intermediate</option>
                    <option value="advanced">98% Advanced</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4"><p>Objective</p></div>
            <div class="col">{{ objective }}</div>
        </div>
        <div class="begin-drill" @click="start">
            Begin drill (Space)
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
    props: {
        accuracyGoal: {
            type: String,
            required: true
        },
        objective: String,
        duration: String,
    },
    created () {
        eventBus.$on('keyEvent', data => {
            if (data === " ") {
                this.$emit('start')
                eventBus.$emit('start', this.goal)
            }
        })
    },
    computed: {
        goal () {
            if ($('#accuracy-goal')[0].value === "intermediate") {
                return 94
            }
            else if ($('#accuracy-goal')[0].value === "beginner") {
                return 90
            }
            else {
                return 98
            }
        }
    },
    methods: {
        start () {
            this.$emit('start')
            eventBus.$emit('start', this.goal)
        }
    }
}
</script>

<style lang="scss" scoped>
    .starter {
        position: absolute;
        width: 500px;
        box-shadow: 0 0 10px lightgray;
        background-color: #fff;
        z-index: 10000;
        padding: 10px 15px;
        font-weight: normal; 
        font-size: 15px; 
        letter-spacing: 0
    }

    .starter p {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.4px;
    }

    .begin-drill {
        margin: 15px 0;
        padding: 2px 5px;
        width: 150px;
        font-size: 14px;
        border: 1px solid lightgray;
        background-color: #fffeea75;
        border-radius: 4px;
        opacity: 0.8;
    }

    .begin-drill:hover {
        cursor: pointer;
        opacity: 1;
    }
</style>
