import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {useGoldCupApi, Team} from '../../hooks';
import './TeamInfo.css'

export interface Props {
    teamId: number;
}

export const TeamInfo = () => {
    const {id} = useParams()
    const [team, setTeam] = useState<Team | null>()
    const {getTeamById} = useGoldCupApi()

    useEffect(() => {
        getTeamById(Number(id)).then((res: { data: Team; }) => setTeam(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const markup = team ? (
        <>
        <Link to="/teams">All Teams</Link>
        <h1>{team.name}</h1>
        </>
    ) : null

    return (
        <div className='pageContainer'>
       {markup}
       </div>
    )
}
