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

export const useGoldCupApi = () => {
    const [teams, setTeams] = React.useState<Team[]>([]);
    const domain = 'https://8044-50-101-201-182.ngrok.io';
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

    return {teams, getAllTeams, getTeamById, register};
}