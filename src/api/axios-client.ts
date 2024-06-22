import axios from "axios"


export const getAxiosInstance = () => {
    const client = axios.create({
        withCredentials: true
    })

    client.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    client.defaults.headers.common['Content-Type'] = 'application/json'
    client.defaults.headers.delete['Content-Type'] = 'application/json'
    client.defaults.headers.post['Content-Type'] = 'application/json'
    client.defaults.headers.put['Content-Type'] = 'application/json'
    client.defaults.headers.patch['Content-Type'] = 'application/json'

    return client
}