<template>
    <div>
        <h2 style="margin-bottom: 50px">Type: "{{ getType.split('_').join(' ') }}"  <span style="color: #dfb313; font-size: 25px">mode: {{ modeGetter }}</span></h2>
        <form class="listening-form" v-if="getPart == 'listening'" :method="modeGetter == 'add' ? 'POST' : 'PUT'">
        <div class="listen-and-repeat" v-if="getType == 'listen_and_repeat_exercise'">
            <div class="form-group">
                <label for="audio-link">Audio link</label>
                <input v-model="lar.audio_link" type="text" :class="{disabled: beingLoaded}" class="form-control" id="audio-link" name="audio_link" placeholder="Enter audio link">
            </div>
            <div class="form-group audio-correct" v-for="(correct, index) in lar.numberCorrects" :key="'audio-' + index">
                <label :for="'audio-correct-' + index">Correct {{ index + 1 }}</label>
                <div style="display: flex; justify-content: space-between">
                    <input style="width: 70%" class="form-control" :class="{disabled: beingLoaded}" type="text" v-model="lar.lar_corrects[index]" :id="'audio-correct-' + index" placeholder="Enter correct answer">
                    <button class="btn btn-secondary" :class="{disabled: beingLoaded}" @click.prevent="addCorrect">Add correct</button>
                </div>
            </div>
        </div>
        <button type="submit" @click.prevent="submitLAR" class="btn btn-primary" :class="{disabled: beingLoaded}">Submit</button>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapState, mapMutations} from 'vuex'
import { eventBus } from '@/main'
import { customAxios } from '../../../../CustomAxios'
export default {
    computed: {
        ...mapGetters([
            'editDataGetter',
            'modeGetter',
            'beingLoaded'
        ]),
        getType () {
            return this.$route.params.type
        },
        getUnit () {
            return this.$route.params.unit
        },
        getCourse () {
            return this.$route.params.course
        },
        getPart () {
            return this.$route.params.part
        },
    },
    data () {
        return {
            lar: {
                numberCorrects: 1,
                audio_link: '',
                lar_corrects: [],
                id: null,
            }
            
        }
    },
    methods: {
        addCorrect (event) {
            if (this.lar.lar_corrects.length < this.lar.numberCorrects) {
                $('#audio-correct-' + (this.lar.numberCorrects - 1)).css({'box-shadow': '0 0 0 0.2rem #f93a68cf'})
                setTimeout(() => {
                    $('#audio-correct-' + (this.lar.numberCorrects - 1)).css({'box-shadow': 'unset'})
                }, 2000)
            }
            else {
                this.lar.numberCorrects ++;
            }
            
        },
        pushCorrect (event) {
            this.lar.lar_corrects.push(event.target.value)
        },
        submitLAR () {
            if (this.lar.audio_link === '') {
                $('#audio-link').css({'box-shadow': '0 0 0 0.2rem #f93a68cf'})
                setTimeout(() => {
                    $('#audio-link').css({'box-shadow': 'unset'})
                }, 2000)
                eventBus.$emit('errorOccured', 'Audio link cannot be empty')
            }
            else if (this.lar.lar_corrects.length == 0) {
                $('#audio-correct-0').css({'box-shadow': '0 0 0 0.2rem #f93a68cf'})
                setTimeout(() => {
                    $('#audio-correct-0').css({'box-shadow': 'unset'})
                }, 2000)
                eventBus.$emit('errorOccured', 'You should have at leats one correct option')
            }
            else if (this.modeGetter == 'add') {
                 var data = {
                    course: this.getCourse,
                    unit: this.getUnit,
                    part: this.getPart,
                    type: this.getType,
                    audio_link: this.lar.audio_link,
                    lar_corrects: this.lar.lar_corrects
                }
                this.$store.state.loading = true
                customAxios.post('/unit-detail/', data, {headers: {Authorization: 'JWT ' + this.$store.getters.isAdminUser}})
                    .then(response => {
                        if (response.status === 200) {
                            eventBus.$emit('success', response.data)
                            this.$store.commit('courseDetailsSetter', null)
                        }
                    })
                    .catch (error => {
                        eventBus.$emit('errorOccured', error)
                    })
                    .finally (() => {
                        this.$store.state.loading = false
                    })
            }
            else if (this.modeGetter == 'edit') {
                var data = {
                    course: this.getCourse,
                    unit: this.getUnit,
                    part: this.getPart,
                    type: this.getType,
                    audio_link: this.lar.audio_link,
                    lar_corrects: this.lar.lar_corrects,
                    id: this.lar.id
                }
                this.$store.state.loading = true
                customAxios.put('unit-detail/', data, {headers: {Authorization: 'JWT ' + this.$store.getters.isAdminUser}})
                .then(response => {
                    eventBus.$emit('success', response.data)
                    this.$store.commit('courseDetailsSetter', null)
                })
                .catch(error => {
                    eventBus.$emit('errorOccured', error)
                })
                .finally(() => {
                    this.$store.state.loading = false
                })
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.editDataGetter) {
                this.lar.numberCorrects = this.editDataGetter.lar_corrects.length
                this.lar.audio_link = this.editDataGetter.audio_link
                this.lar.lar_corrects = this.editDataGetter.lar_corrects
                this.lar.id = this.editDataGetter.id
            }
        })
    },
    destroyed () {
        this.$store.commit('editDataSetter', null)
        this.$store.commit('mode', null)
    }
}
</script>

<style lang="scss" scoped>

    .form-group {
        margin-bottom: 35px;
    }

    form {
        width: 80%;
        margin: 0 20px;
    }

    
    .disabled {
        pointer-events: none;
    }
</style>
