import AxiosConfiged from "../../axiosConfig";

export const fetchFan = async (username, setFan) => {
  try {
    console.log(username);
    const response = await AxiosConfiged.get(`/users/profile/${username}`);
    setFan(response.data);
    return true;
  } catch (error) {
    return error.response.data;
  }
};

export const editFan = async (fan) => {
  try {
    const response = await AxiosConfiged.put(
      `/users/profile/${fan.username}`,
      fan,
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const addReservation = async (reservation) => {
  try {
    const response = await AxiosConfiged.post(`/reservations`, reservation);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchReservedSeats = async (matchID, setReservedSeats) => {
  try {
    const response = await AxiosConfiged.get(`/reservations/${matchID}`);
    setReservedSeats(response.data.seatNumbers);
    return true;
  } catch (error) {
    return error.response.data;
  }
};

export const cancelReservation = async (matchID, seatNumber) => {
  try {
    const response = await AxiosConfiged.delete(
      `/reservations/${matchID}/${seatNumber}`,
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
