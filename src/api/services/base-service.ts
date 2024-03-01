import { AxiosInstance } from "axios";

export class BaseService {
    client: AxiosInstance

    constructor(clientInstance: AxiosInstance) {
        this.client = clientInstance
    }
}