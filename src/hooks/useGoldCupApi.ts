import React from "react";
import axios from "axios";

export interface Team {
    id: number;
    name: string
    points: number
    division: string
    players: Player[]
}

export interface Player {
    id: number;
    name: string
    position: string
    number: number
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
}

const getAPIDomain = () => {
    const env = process.env.NODE_ENV;
    switch(env) {
        case "development":
            return 'http://127.0.0.1:3000';
        default:
            return 'https://gold-cup.herokuapp.com';
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

    const getTeamById = async(id: number) => {
        const res = await axios.get(`${domain}/teams/${id}`)
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

    const newPerson = async (payload: FormData, token: string) => {
        const res = await axios.post(`${domain}/person/new`, payload, {
            headers: {Authorization: `bearer ${token}`}
        })
        return res;
    }

    return {teams, getAllTeams, getTeamById, register, login, getLoggedInUserDetails, createCookieObject, checkIsLoggedIn, getPeople, newPerson};
}
