import AxiosConfiged from "../../axiosConfig";
import { authAction } from "./reducer";
export const getUser = () => {
    return async (dispatch) => {
        try {
            const response = await AxiosConfiged.get(`/user/me`);
            console.log(response.data);
            dispatch(authAction.GetUserInfo({ username: response.data.data.username, role: response.data.data.role }));
        } catch (error) {
            console.log(error.message);
        }
    };
};