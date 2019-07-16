<template>
    <div>
        <ncd-loader v-if="!courseDetails" color="#000" style="margin-top: 200px"></ncd-loader>
        <div v-else>
            <section class="listening">
                <div style="display: flex; justify-content: space-between;">
                    <h3>List of "{{ type }}"</h3>
                    <button class="btn btn-primary" data-mode="add" @click="navigateToAddEdit">Add</button>
                </div> 
                <ul v-if="this.getType == 'listen_and_repeat_exercise'">
                    <li v-for="(audio, index) in this.courseDetails[this.getPart][this.getType]" :key="'audio-' + index">
                        <div style="display: flex; justify-content: space-between;">
                            <a data-mode="edit" href="" @click.prevent="navigateToAddEdit" :data-audio="JSON.stringify(audio)">Audio {{ index + 1 }}</a>
                            <div class="listen-and-delete" style="display: flex;">
                                <p @click="playAudio" :data-link="audio.audio_link">Listen</p>
                                <p style="margin-left: 20px;" :data-id="audio.id" @click="deleteById">Delete</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import Loader from 'vue-spinner/src/ClipLoader'
import { mapGetters, mapState, mapMutations } from 'vuex'
import { eventBus } from '@/main'
import { customAxios } from '@/CustomAxios'
export default {
    components: {
        'ncd-loader': Loader,
    },
    computed: {
        ...mapGetters([
            'courseDetails',
            'isAdminUser'
        ]),
        ...mapState([
            'admin'
        ]),
        getType() {
            return this.$route.params.type
        },
        getPart() {
            return this.$route.params.part
        },
        type () {
            return this.getType.split('_').join(' ')
        },
        getUnit () {
            return this.$route.params.unit
        },
        getCourseName () {
            return this.$route.params.course
        }
    },
    data () {
        return {
            
        }
    },
    created () {
        
    },
    mounted () {
        this.$nextTick(() => {
            this.loadData()
        })
    },
    methods: {
        navigateToAddEdit (event) {
            event.preventDefault();
            this.$store.commit('mode', event.target.dataset.mode)
            if (this.$store.state.admin.mode == "edit") {
                this.$store.commit('editDataSetter', JSON.parse(event.target.dataset.audio))
            }
            this.$router.push({name: 'english-course-add', params: {part: this.getPart, type: this.getType}})
        },
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
                .finally (() => {
                    this.$store.state.requestProcessed = false
                })
        },
        playAudio(event) {
            try {
                var audio = new Audio()
                audio.src = event.target.dataset.link
                audio.play()
                if (audio.error) {
                    console.log(audio.error)
                    eventBus.$emit('errorOccured', 'Cannot load audio. Probably link is invalid!')
                }
            }
            catch (error) {
                eventBus.$emit('errorOccured', 'Cannot load audio. Probably link is invalid!')
            }
        
        },
        deleteById (event) {
            if (this.getType === 'listen_and_repeat_exercise') {
                this.$store.state.loading = true
                customAxios.delete('/unit-detail/', {data: {id: event.target.dataset.id, type: this.getType}, headers: {Authorization: 'JWT ' + this.isAdminUser}})
                .then(response => {
                    if (response.status === 200) {
                        eventBus.$emit('success', response.data)
                        $(event.target).parent().parent().parent().css('display', 'none')
                    }
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
    destroyed () {
        
    }

}
</script>

<style lang="scss" scoped>
    li {
        margin: 10px 0;
    }

    ul {
        margin-top: 40px;
        padding-left: 15px;
    }

    .listen-and-delete p {
        color:#007bff;
    }

    .listen-and-delete p:hover {
        color: #0056b3;
        cursor: pointer;
    }

</style>
