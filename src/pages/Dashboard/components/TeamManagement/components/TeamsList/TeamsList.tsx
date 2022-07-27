import { useEffect, useState } from "react";
import { Button, Card, Col, Stack } from "react-bootstrap";
import { useGoldCupApi } from "../../../../../../hooks";

export const TeamsList = () => {
    const {getManagedTeams, createCookieObject, deleteTeam} = useGoldCupApi();
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
                                {/* <Button variant="primary" onClick={() => navigate(`/dashboard/people/${person.id}`)}>View</Button>
                                <Button variant="primary" onClick={() => navigate(`/dashboard/people/${person.id}`)}>Edit</Button> */}
                                <Button variant="danger" onClick={() => handleDelete(team.id)}>Delete</Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })
            return rowItems
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
