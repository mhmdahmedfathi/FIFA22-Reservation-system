import AxiosConfiged from "../../../axiosConfig";



export const fetchUsers = async (setUsers, setnewManagers) => {
    try {
        const response = await AxiosConfiged.get(`/user`);

        let new_mngt = response.data.data.filter((user) => user.role === 'manager' && user.is_approved === false);
        let users = response.data.data.filter((user) => !(user.role === 'manager' && user.is_approved === false));
        setnewManagers(new_mngt);
        setUsers(users);
        return true;
    } catch (error) {
        return error.message;
    }
}
