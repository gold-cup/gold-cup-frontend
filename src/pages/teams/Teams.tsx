import React, { useEffect, useState } from "react"
import axios from "axios"

interface Team {
    name: string
    points: number
    division: string
}

export const Teams = () => {
    const [teams, setTeams] = useState<Team[] >([])

    useEffect(() => {
        console.log('in useEffect')
        axios.get("https://73c3-69-157-231-85.ngrok.io/teams", {
        })
            .then(res => setTeams(res.data))
    }, [])

    console.log(teams)

    const teamsList = teams.length ? (
        teams.map(team => (
            <tr>
                <td>{team.name}</td>
                <td>{team.points}</td>
                <td>{team.division}</td>
            </tr>
        )
    )) : null

    return (
        <>
        <h1>Teams</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Points</th>
                    <th>Division</th>
                </tr>
            </thead>
            <tbody>
                {teamsList}
            </tbody>
        </table>
        </>
    )
}
