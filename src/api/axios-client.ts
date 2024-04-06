import axios from "axios"
import Cookies from 'js-cookie';


export const getAxiosInstance = () => {
    const client = axios.create({
        withCredentials: true
    })
    //TODO брать из ENV, там DEV и PROD версии
    client.defaults.baseURL = 'http://localhost:5213/api/'
    client.defaults.headers.common['Content-Type'] = 'application/json'
    client.defaults.headers.delete['Content-Type'] = 'application/json'
    client.defaults.headers.post['Content-Type'] = 'application/json'
    client.defaults.headers.put['Content-Type'] = 'application/json'
    client.defaults.headers.patch['Content-Type'] = 'application/json'

    return client
}