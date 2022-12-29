import { authAction } from '../../StateManagment/Auth/reducer';
import AxiosConfiged from '../../axiosConfig';

const signup = async (SignupData) => {
    try {
        const response = await AxiosConfiged.post(`/register`, SignupData);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

const login = async (LoginData) => {
    try {

        const response = await AxiosConfiged.post(`/login`, LoginData);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        authAction.loggedIn({ username: response.data.user.username, role: response.data.user.role });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

const logout = async () => {
    try {
        const response = await AxiosConfiged.post(`/logout`);
        localStorage.removeItem('token');
        authAction.loggedOut();
        return response.data;
    } catch (error) {
        return error.message;
    }
}


export { signup, login, logout };