import AxiosConfiged from "../../axiosConfig";

const data = [
    {
        "id": 1,
        "team1": "Nadine",
        "team2": "Abthorpe",
        "Date": "2022-09-22",
        "Time": "03:39",
        "MatchVenue": "Stadium",
        "MainReferee": "nabthorpe0",
        "Lineman1": "nabthorpe0",
        "Limeman2": "nabthorpe0"
    },
    {
        "id": 2,
        "team1": "Ros",
        "team2": "Josipovitz",
        "Date": "8-6-2022",
        "Time": "12:01 AM",
        "Referee": "rjosipovitz1",
        "Lineman1": "rjosipovitz1",
        "Limeman2": "rjosipovitz1"
    },
    {
        "id": 3,
        "team1": "Cecilius",
        "team2": "Olivari",
        "Date": "5-17-2022",
        "Time": "7:19 AM",
        "Referee": "colivari2",
        "Lineman1": "colivari2",
        "Limeman2": "colivari2"
    },
    {
        "id": 4,
        "team1": "Honor",
        "team2": "Blaxton",
        "Date": "8-1-2022",
        "Time": "11:28 AM",
        "Referee": "hblaxton3",
        "Lineman1": "hblaxton3",
        "Limeman2": "hblaxton3"
    },
    {
        "id": 5,
        "team1": "Hillary",
        "team2": "Hunstone",
        "Date": "10-7-2022",
        "Time": "8:38 AM",
        "Referee": "hhunstone4",
        "Lineman1": "hhunstone4",
        "Limeman2": "hhunstone4"
    },
    {
        "id": 6,
        "team1": "Joann",
        "team2": "Gooderidge",
        "Date": "8-6-2022",
        "Time": "12:25 PM",
        "Referee": "jgooderidge5",
        "Lineman1": "jgooderidge5",
        "Limeman2": "jgooderidge5"
    },
    {
        "id": 7,
        "team1": "Anissa",
        "team2": "Bann",
        "Date": "5-25-2022",
        "Time": "9:15 PM",
        "Referee": "abann6",
        "Lineman1": "abann6",
        "Limeman2": "abann6"
    },
    {
        "id": 8,
        "team1": "Francois",
        "team2": "Beacon",
        "Date": "1-27-2022",
        "Time": "3:53 PM",
        "Referee": "fbeacon7",
        "Lineman1": "fbeacon7",
        "Limeman2": "fbeacon7"
    },
    {
        "id": 9,
        "team1": "Judy",
        "team2": "Minett",
        "Date": "1-27-2022",
        "Time": "10:20 AM",
        "Referee": "jminett8",
        "Lineman1": "jminett8",
        "Limeman2": "jminett8"
    },
    {
        "id": 10,
        "team1": "Joann",
        "team2": "MacAllister",
        "Date": "2-8-2022",
        "Time": "5:13 PM",
        "Referee": "jmacallister9",
        "Lineman1": "jmacallister9",
        "Limeman2": "jmacallister9"
    }]

export const fetchMatchs = async (setmatchs) => {
    try {
        const response = await AxiosConfiged.get(`/match/matchs`);
        setmatchs(response.data.data);
        return true;
    } catch (error) {
        return error.message;
    }
}

export const editMatch = async (match) => {
    try {
        const response = await AxiosConfiged.put(`/match/${match.id}`, match);
        return response.data;
    } catch (error) {
        return error.message;
    }
}