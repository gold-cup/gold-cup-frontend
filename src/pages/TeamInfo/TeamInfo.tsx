import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {useGoldCupApi, Team} from '../../hooks';
import { PlayerRow } from './components';
import './TeamInfo.css'

export interface Props {
    teamId: number;
}

export const TeamInfo = () => {
    const {id} = useParams()
    const [team, setTeam] = useState<Team | null>()
    const {getTeamById, createCookieObject} = useGoldCupApi()

    useEffect(() => {
        const cookieObject = createCookieObject()
        if (cookieObject.token) {
            getTeamById(Number(id), cookieObject.token).then((res: { data: Team; }) => setTeam(res.data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const markup = team ? (
        <>
        <Link to="/dashboard?tab=team-management">All Teams</Link>
        <Row>
            <h1>{team.name}</h1>
        </Row>
        <Row>
            <h3>Division: {team.division}</h3>
        </Row>
        <Row>
            <Col md>
            <h2>Players</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {team.players.map(player => (
                        <PlayerRow player={player} />
                    ))}
                </tbody>
            </Table>
            </Col>
            <Col md>
                <h2>Coaches</h2>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                </Table>
            </Col>
        </Row>
        </>
    ) : null

    return (
        <div className='pageContainer'>
       {markup}
       </div>
    )
}
