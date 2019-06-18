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
                store.dispatch('setLogoutTimer', response.data)
                store.dispatch('tokenSetter', response.data)
                console.log(response.data)
            }
        })
            .catch(error => {
                router.push({name: 'ErrorPage'});
                throw new Error(error)
            })
            .then(() => {
                store.dispatch('requestProcessedSetter', false)
                eventBus.$emit('requestHandler', store.getters.requestProcessed)
                router.push({name: 'dashboard'})
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
                            return true
                        }
                        else {
                            return false
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        router.push({name: 'ErrorPage'})
                        throw new Error(error)
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
            router.replace({name: "ErrorPage"})
            throw new Error(error)
        }
    }
}