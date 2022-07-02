import React, { useEffect, useState } from "react"
import { useGoldCupApi, Team} from "../../hooks"
import { TeamRow } from "./components"

export const Teams = () => {
    const { getAllTeams} = useGoldCupApi()
    const [teams, setTeams] = useState<Team[]>([])

    useEffect(() => {
        getAllTeams().then(res => setTeams(res.data))
    }, [getAllTeams])

    const teamsList = teams.length ? (
        teams.map(team => (
           <TeamRow team={team} key={team.id} />
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
