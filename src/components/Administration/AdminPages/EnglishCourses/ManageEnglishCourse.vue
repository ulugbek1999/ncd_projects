<template>
    <div>
        <h2>Manage "{{ getCourseName }}" <span class="unit-identifier">({{ getUnit }})</span></h2>
        <select name="part-selection" id="part-selection" v-model="partSelection">
            <option value="theory">Theoretical part</option>
            <option value="listening">Listening part</option>
            <option value="reading">Reading part</option>
        </select>
        <div class="components">
            <table>
                <caption>
                    Exercises
                </caption>
                <tbody>
                    <tr>
                        <th>
                            <a @click="navigateToList" data-type="listen_and_repeat_exercise" href="">
                                Listen and repeat
                            </a>
                        </th>
                        <td>Add</td>
                        <td>Change</td>
                    </tr>
                    <tr>
                        <th>
                            Story tale 
                        </th>
                        <td>Add</td>
                        <td>Change</td>
                    </tr>
                    <tr>
                        <th>
                            Listen and read 
                        </th>
                        <td>Add</td>
                        <td>Change</td>
                    </tr>
                </tbody> 
            </table>
            
        </div>
    </div>
</template>

<script>
import { customAxios } from '@/CustomAxios'
import { eventBus } from '@/main'
import { mapMutations } from 'vuex'
export default {
    computed: {
        getCourseName () {
            return this.$route.params.course
        },
        getUnit () {
            return this.$route.params.unit
        }
    },
    methods: {
        loadData () {
            customAxios.get('/unit-detail/', {params: {'unit' : parseInt(this.getUnit.split(' ')[1]), 'course' : this.getCourseName}} )
                .then(response => {
                    if (response.status === 200) {
                        eventBus.$emit('success', 'Successfully loaded data!')
                        this.$store.commit('courseDetailsSetter', response.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.errorOccured = true
                    eventBus.$emit('errorOccured', 'Something went wrong when loading the data!')
                })
        },
        navigateToList (event) {
            event.preventDefault()
            this.$router.push({name: 'english-course-list', params: {course: this.getCourseName, unit: this.getUnit, part: this.partSelection, type: event.target.dataset.type}})
        }
    },
    data () {
        return {
            partSelection : 'listening'
        }
    },
    mounted () {
        this.$nextTick(() => {
            
        })
    }
}
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Patua+One&display=swap');

    h2 {
        font-family: 'Patua One', 'Arial', cursive;
        margin-bottom: 20px;
    }

    #part-selection {
        width: 100%;
        margin-top: 10px;
        font-size: 1.3em;
        padding: 5px;
    }

    .unit-identifier {
        font-size: 20px;
    }

    .components {
        margin-top: 30px;
    }

    table {
        width: 100%;
    }

    td {
        text-align: right;
        padding: 8px 15px 8px 8px;
    }

    th {
        padding: 8px;
    }

    tr {
        border-bottom: 1px solid #eee;
    }

    caption {
        background-color: #343a40;
        padding: 8px;
        color: #fff;
        caption-side: top;
    }
</style>
