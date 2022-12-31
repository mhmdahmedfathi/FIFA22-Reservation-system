import AxiosConfiged from "../../../axiosConfig";

// const data = [
//     {
//         "id": 1,
//         "first_name": "Kaila",
//         "last_name": "Randles",
//         "email": "krandles0@joomla.org",
//         "gender": "Female",
//         "username": "krandles0",
//         "is_approved": false,
//         "role": "fan"
//     },
//     {
//         "id": 2,
//         "first_name": "Adelaide",
//         "last_name": "Laverack",
//         "email": "alaverack1@liveinternet.ru",
//         "gender": "Female",
//         "username": "alaverack1",
//         "is_approved": false,
//         "role": "manager"
//     },
//     {
//         "id": 3,
//         "first_name": "Ody",
//         "last_name": "Amberg",
//         "email": "oamberg2@mapy.cz",
//         "gender": "Male",
//         "username": "oamberg2",
//         "is_approved": true,
//         "role": "fan"
//     },
//     {
//         "id": 4,
//         "first_name": "Marlee",
//         "last_name": "Guilfoyle",
//         "email": "mguilfoyle3@networksolutions.com",
//         "gender": "Female",
//         "username": "mguilfoyle3",
//         "is_approved": false,
//         "role": "manager"
//     },
//     {
//         "id": 5,
//         "first_name": "Ruthi",
//         "last_name": "Goade",
//         "email": "rgoade4@pagesperso-orange.fr",
//         "gender": "Female",
//         "username": "rgoade4",
//         "is_approved": true,
//         "role": "manager"
//     },
//     {
//         "id": 6,
//         "first_name": "Vivian",
//         "last_name": "Clayborn",
//         "email": "vclayborn5@tripod.com",
//         "gender": "Female",
//         "username": "vclayborn5",
//         "is_approved": true,
//         "role": "manager"
//     },
//     {
//         "id": 7,
//         "first_name": "Keir",
//         "last_name": "Mays",
//         "email": "kmays6@google.com.hk",
//         "gender": "Agender",
//         "username": "kmays6",
//         "is_approved": true,
//         "role": "fan"
//     },
//     {
//         "id": 8,
//         "first_name": "Darrel",
//         "last_name": "Filson",
//         "email": "dfilson7@cocolog-nifty.com",
//         "gender": "Male",
//         "username": "dfilson7",
//         "is_approved": true,
//         "role": "fan"
//     },
//     {
//         "id": 9,
//         "first_name": "Tara",
//         "last_name": "Yven",
//         "email": "tyven8@ed.gov",
//         "gender": "Female",
//         "username": "tyven8",
//         "is_approved": true,
//         "role": "fan"
//     },
//     {
//         "id": 10,
//         "first_name": "Feodor",
//         "last_name": "Reyburn",
//         "email": "freyburn9@house.gov",
//         "gender": "Male",
//         "username": "freyburn9",
//         "is_approved": false,
//         "role": "manager"
//     }];

export const fetchUsers = async (setUsers, setnewManagers) => {
  try {
    const response = await AxiosConfiged.get(`/users`);
    let new_mngt = response.data.filter(
      (user) => user.role === "Manager" && user.isApproved === false,
    );
    let users = response.data.filter(
      (user) =>
        !(user.role === "Manager" && user.isApproved === false) &&
        user.role !== "Admin",
    );
    setnewManagers(new_mngt);
    setUsers(users);
    return true;
  } catch (error) {
    return error.message;
  }
};
