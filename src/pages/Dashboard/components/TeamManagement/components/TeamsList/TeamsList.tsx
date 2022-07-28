import { useEffect, useState } from "react";
import { Card, Col, Stack, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useGoldCupApi } from "../../../../../../hooks";

export const TeamsList = () => {
    const {getManagedTeams, createCookieObject, deleteTeam} = useGoldCupApi();
    const navigate = useNavigate()
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        console.log('useEffect TeamsList');
        const cookies = createCookieObject();
        if (cookies.token) {
            getManagedTeams(cookies.token).then(res => {
                setTeams(res.data);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (teamId: number) => {
        const cookies = createCookieObject();
        if (cookies.token) {
            const res = await deleteTeam(cookies.token, teamId);
            if (res.data) {
                window.location.reload();
            }
        }
    }


    const rowSize = 3
    const createTeamGrid = () => {
        for (let i = 0; i < teams.length; i += rowSize) {
            const row = teams.slice(i, i + rowSize)
            const rowItems = row.map((team, index) => {
            return (
                    <Col key={index} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{team.name}</Card.Title>
                                <Card.Text>Division: {team.division}</Card.Text>
                                <Stack gap={3} direction='horizontal'>

                                </Stack>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Link onClick={() => navigate(`/dashboard/people/${team.id}`)}>View</Card.Link>
                                <Card.Link onClick={() => navigate(`/team/${team.id}/edit`)}>Edit</Card.Link>
                                <Card.Link className="link-danger" onClick={() => handleDelete(team.id)}>Delete</Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            })
            return (<Row>{rowItems}</Row>)
        }
    }

    const markup = teams.length ? (
        createTeamGrid()
    ) : (
        <p>You have no teams</p>
    );

    return (
        <>
        {markup}
        </>
    )
}
