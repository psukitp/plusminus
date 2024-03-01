import axios from "axios"


export const getAxiosInstance = () => {
    const client = axios.create()
    //TODO брать из ENV, там DEV и PROD версии
    client.defaults.baseURL = 'https://localhost:7112/api/'
    client.defaults.headers.common['Content-Type'] = 'application/json'
    client.defaults.headers.delete['Content-Type'] = 'application/json'
    client.defaults.headers.post['Content-Type'] = 'application/json'
    client.defaults.headers.put['Content-Type'] = 'application/json'
    client.defaults.headers.patch['Content-Type'] = 'application/json'

    return client
}