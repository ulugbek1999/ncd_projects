import axios from 'axios'
import store from './store'

export const customAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})
