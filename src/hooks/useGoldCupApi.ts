import React from "react";
import axios from "axios";

export interface Player {
    id: number;
    name: string
    position: string
    number: number
    person: Person
    team: Team
}

export interface Coach {
    id: number;
    status: string;
    person: Person;
    team: Team;
}

export interface RegistrationBody {
    name: string
    email: string
    password: string
}

export interface RegistrationErrors {
    name?: string[]
    email?: string[]
    password?: string[]
}

export interface LoginBody {
    email: string
    password: string
}

export interface LoginErrors {
    error: string
}

export interface UserDetails {
    name: string
    email: string
    permission: string | null
}

export interface Person {
    id: number,
	first_name: string,
	last_name: string,
	middle_name: string | null,
    birthday: string,
	email: string,
	gender: string,
	city: string,
	province: string,
	country: string,
	phone_number: string,
	status: string,
	parent_email: string | null,
	user_id: number
}

export interface Team {
    id: number,
    name: string,
    points: number,
    division: string,
    players: Player[],
    password: string,
}

export const TeamDivisions: {[key: string]: string} = {
    B99: "Boys 12-14",
    G99: "Girls 12-4",
    MO: "Mens Open"
}

const getAPIDomain = () => {
    const env = process.env.NODE_ENV;
    switch(env) {
        case "development":
            return 'http://0.0.0.0:3000';
        default:
            return 'https://goldcup-api.nqne47cbf5ov2.ca-central-1.cs.amazonlightsail.com';
    };
}

export const useGoldCupApi = () => {
    const [teams, setTeams] = React.useState<Team[]>([]);
    const domain = getAPIDomain();
    const getAllTeams = async () => {
        const res = await axios.get(`${domain}/teams`)
        setTeams(res.data);
        return res;
    }

    const getTeamById = async(id: number, token: string) => {
        const res = await axios.get(`${domain}/teams/${id}`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const register = async(payload: RegistrationBody) => {
        const res = await axios.post(`${domain}/register`, payload)
        return res;
    }

    const login = async(payload: LoginBody) => {
        const res = await axios.post(`${domain}/login`, payload)
        return res;
    }

    const getLoggedInUserDetails = async (token: string) => {
        try {
            const res = await axios.get(`${domain}/user`, {
                headers: {Authorization: `bearer ${token}`}
            })
            return res;
        } catch (error) {
            return {data: {name: '', email: ''}};
        }

    }

    const createCookieObject = () => {
        const cookieObject: {[key: string]: string} = {}
        document.cookie.split('; ').map((item) => item.split('=')).forEach((item) => {
            cookieObject[item[0]] = item[1]
        })
        return cookieObject
    }

    const checkIsLoggedIn = () => {
        const cookieObject = createCookieObject()
        return cookieObject.token ? true : false
    }

    const getPeople = async (token: string) => {
        const res = await axios.get(`${domain}/people`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const getPerson = async (token: string, id: number) => {
        const res = await axios.get(`${domain}/person/${id}`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const newPerson = async (payload: FormData, token: string) => {
        const res = await axios.post(`${domain}/person/new`, payload, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const deletePerson = async (id: number, token: string) => {
        const res = await axios.delete(`${domain}/person/${id}`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const requestTeamManagerPermissions = async (token: string) => {
        const res = await axios.post(`${domain}/user/request_team_manager_permissions`, {}, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const updatePerson = async (id: number, payload: FormData, token: string) => {
        const res = await axios.put(`${domain}/person/${id}`, payload, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const getManagedTeams = async (token: string) => {
        const res = await axios.get(`${domain}/teams`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const getFile = async (id: number, type: string) => {
        const payload = {user_id: id, type: type}
        const res =  await axios.post(`${domain}/files/token`, payload)
        if (res.data.token) {
            return `${domain}/files/get?token=${res.data.token}`
        } else {
            return null
        }
    }

    const deleteTeam = async (token: string, id: number) => {
        const res = await axios.delete(`${domain}/team/${id}`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const newTeam = async (token: string, payload: Object) => {
        const res = await axios.post(`${domain}/team/new`, payload, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const getTeam = async (token: string, id: number) => {
        const res = await axios.get(`${domain}/teams/${id}`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const updateTeam = async (token: string, id: number, payload: Object) => {
        const res = await axios.put(`${domain}/teams/${id}`, payload, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const getPlayers = async (token: string) => {
        const res = await axios.get(`${domain}/players`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const getApprovedPlayers = async (token: string) => {
        const res = await axios.get(`${domain}/people/approved`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const getTeamFromToken = async (token: string) => {
        const res = await axios.post(`${domain}/team/token`, {password: token})
        return res;
    }

    const newPlayer = async (token: string, payload: Object) => {
        const res = await axios.post(`${domain}/players/new`, payload, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const deletePlayer = async (id: number, token: string, person_id: number) => {
        const res = await axios.delete(`${domain}/player/${id}`, {
            headers: {Authorization: `bearer ${token}`},
            data: {id: person_id}
        })
        return res;
    }

    const createPersonName = (person: Person) => {
        const nameArray = [person.first_name, person.last_name]
        if (person.middle_name) {
            nameArray.splice(1, 0, person.middle_name)
        }
        return nameArray.join(' ')
    }

    const createCoach = async (token: string, payload: FormData) => {
        const res = await axios.post(`${domain}/coaches/new`, payload, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const getCoaches = async (token: string) => {
        const res = await axios.get(`${domain}/coaches`, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    const deleteCoach = async (id: number, token: string, person_id: number) => {
        const res = await axios.delete(`${domain}/coaches/${id}`, {
            headers: {Authorization: `bearer ${token}`},
            data: {id: person_id}
        })
        return res;
    }

    return {
        teams,
        domain,
        getAllTeams,
        getTeamById,
        register,
        login,
        getLoggedInUserDetails,
        createCookieObject,
        checkIsLoggedIn,
        getPeople,
        newPerson,
        deletePerson,
        updatePerson,
        getPerson,
        getFile,
        requestTeamManagerPermissions,
        getManagedTeams,
        deleteTeam,
        newTeam,
        getTeam,
        updateTeam,
        getPlayers,
        getApprovedPlayers,
        getTeamFromToken,
        newPlayer,
        deletePlayer,
        createPersonName,
        createCoach,
        getCoaches,
        deleteCoach
    };
}
