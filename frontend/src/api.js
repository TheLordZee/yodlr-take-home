import axios from "axios";

const BASE_URL = "http://localhost:3000";

class YoldrApi {
    static async request(endpoint, method = "get", data = {}) {
        console.debug("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === "get") ? data : {};
        try {
          return (await axios({ url, method, data, params })).data;
        } catch (err) {
          console.error("API Error:", err);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    static async getUsers(){
        const res = await this.request('users')
        return res;
    }

    static async getUser(id){
        const res = await this.request(`users/${id}`)
        return res;
    }

    static async addUser(userData){
        const res = await this.request('users', 'post', userData)
        return res;
    }

    static async updateUser(id, userData){
        const res = await this.request(`users/${id}`, 'put', userData)
        return res;
    }
}

export default YoldrApi;