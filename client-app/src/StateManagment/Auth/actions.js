import AxiosConfiged from "../../axiosConfig";
import { authAction } from "./reducer";
export const getUser = () => {
    return async (dispatch) => {
        try {
            const response = await AxiosConfiged.get(`/users/me`);
            dispatch(authAction.GetUserInfo({ username: response.data.username, role: response.data.role }));
        } catch (error) {
            console.log(error.message);
        }
    };
};