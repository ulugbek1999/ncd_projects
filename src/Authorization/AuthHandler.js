import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '../router/index'
import { customAxios } from '../CustomAxios'


export const eventBus = new Vue()

import store from '../store'

Vue.use(require('vue-cookies'))

Vue.use(VueRouter)

import VueCookies from 'vue-cookies'

export default class AuthHandler {
    constructor (username, password) {
        this.username = username,
        this.password = password
    }

    enableAccess () {
        eventBus.$emit('requestHandler', true)
        customAxios.post('authenticate/', {"username" : this.username, "password" : this.password})
            .then(response => {
            if (response.status === 200 && response.data.token) {
                store.dispatch('reloginTimer', response.data.expirationTime)
                store.dispatch('tokenSetter', response.data)
                
            }
        })
            .catch(error => {
                router.push({name: 'ErrorPage'});
                throw new Error(error)
            })
            .then(() => {
                store.dispatch('requestProcessedSetter', false)
                eventBus.$emit('requestHandler', store.getters.requestProcessed)
                router.push({name: 'dashboard', params: {userId: store.state.userData.user_id}})
            })
    }

    checkAuthentication () {
        try {
            if(VueCookies.get('userData')) {
                const token = VueCookies.get('userData').token
                customAxios.post('token/refresh/', {'token' : token})
                    .then(response => {
                        
                        if (response.data.token && response.status === 200) {
                            const user_id = VueCookies.get('userData').user_id
                            const username = VueCookies.get('userData').username
                            const newUserData = {user_id: user_id, token: response.data.token, username: username}
                            store.dispatch('tokenSetter', newUserData)
                            store.dispatch('reloginTimer', 3600000)
                            return true
                        }
                        else  {
                            return false
                        }
                    })
                    .catch(() => {
                        if (VueCookies.isKey('userData')) {
                            VueCookies.remove('userData')
                            return false
                        }
                        else {
                            return false
                        }
                    })
                    .finally(() => {
                        store.state.loading = false
                    })
            }
            else {
                store.state.loading = false
                return false
            }
        } catch (error) {
            return false
        }
    };

    loadUserInformation() {
        if (VueCookies.isKey('userData')) {
            const user_id = VueCookies.get('userData').user_id
            const token = VueCookies.get('userData').token
            customAxios.get('users/' + user_id, {headers: {Authorization: 'JWT ' + token}})
                .then(response => {
                    console.log(response.data)
                    if (response.data && response.status === 200) {
                        store.dispatch('userInformationDispatcher', response.data)
                    }
                })
                .catch(error => {
                    const data = {
                        gender: '',
                        date_of_birth: '',
                        country: '',
                        city: '',
                        bio: '',
                        owner: VueCookies.get('userData').username
                    }
                    store.dispatch('userInformationDispatcher', data)
                    console.log(new Error("Could not load user information from the server. Probably there is a problem with the server or user information is not specified. Returned empty object!"))
                })
                .finally(() => {
                    store.state.loadingProfile = false
                })
        }
    };

    loginAsAdmin () {
        store.dispatch('requestProcessedSetter', true)
        customAxios.post('authenticate-admin/', {"username" : this.username,  "password" : this.password})
            .then ((response) => {
                if (response.status === 200 && response.data.token) {
                    store.dispatch('adminTokenDispatcher', response.data.token)
                    router.push({name: 'admin-page'})
                }
            })
            .catch ((error) => {
                eventBus.$emit('errorOccured', error.response.data.detail)
                throw new Error(error)
            })
            .finally (() => {
                store.dispatch('requestProcessedSetter', false)
            })
    }
}