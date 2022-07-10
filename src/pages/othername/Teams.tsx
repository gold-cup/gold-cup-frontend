/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useGoldCupApi, Team} from "../../hooks"
import { TeamRow } from "./components"

export const Teams = () => {
    const { getAllTeams} = useGoldCupApi()
    const [teams, setTeams] = useState<Team[]>([])

    useEffect(() => {
        getAllTeams().then(res => setTeams(res.data))
    }, [])

    const teamsList = teams.length ? (
        teams.map(team => (
           <TeamRow team={team} key={team.id} />
        )
    )) : null

    return (
        <>
        <h1>Teams</h1>
        <Table striped bordered hover variant="dark">
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
        </Table>
        </>
    )
}
