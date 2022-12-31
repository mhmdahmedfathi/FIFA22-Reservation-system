import { authAction } from "../../StateManagment/Auth/reducer";
import AxiosConfiged from "../../axiosConfig";

const signup = async (SignupData) => {
  try {
    const response = await AxiosConfiged.post(`/register`, SignupData);
    if (response.data) {
      return { data: response.data, status: true };
    }
  } catch (error) {
    return { error: error.response, status: false };
  }
};

const login = async (LoginData) => {
  try {
    const response = await AxiosConfiged.post(`/login`, LoginData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      authAction.loggedIn({
        username: response.data.user.username,
        role: response.data.user.role,
      });
    }
    return { data: response.data, status: true };
  } catch (error) {
    console.log(error.response);
    return { error: error.response, status: false };
  }
};

const logout = async () => {
  try {
    // const response = await AxiosConfiged.post(`/logout`);
    localStorage.removeItem("token");
    authAction.loggedOut();
    return true;
  } catch (error) {
    return error.message;
  }
};

export { signup, login, logout };
