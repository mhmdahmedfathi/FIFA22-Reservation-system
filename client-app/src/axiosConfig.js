import axios from "axios";
import { BackendApi } from "./Backend";

let AxiosConfiged = axios.create({
    baseURL: BackendApi,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${localStorage.getItem("token")}`
    }
});

export default AxiosConfiged;