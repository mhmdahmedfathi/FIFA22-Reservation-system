import { authAction } from '../../../StateManagment/Auth/reducer';
import AxiosConfiged from '../../../axiosConfig';

const signup = async (SignupData) => {
    try {
        const response = await AxiosConfiged.post(`/user/register`, SignupData);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

const login = async (LoginData) => {
    try {

        const response = await AxiosConfiged.post(`/user/login`, LoginData);
        localStorage.setItem('token', response.data.data.token);
        authAction.loggedIn({ username: response.data.data.user.name, role: response.data.data.user.role });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

const logout = async () => {
    try {
        const response = await AxiosConfiged.post(`/user/logout`);
        localStorage.removeItem('token');
        authAction.loggedOut();
        return response.data;
    } catch (error) {
        return error.message;
    }
}


export { signup, login, logout };