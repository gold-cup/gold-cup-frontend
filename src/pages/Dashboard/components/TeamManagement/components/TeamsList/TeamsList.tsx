import { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useGoldCupApi } from "../../../../../../hooks";

export const TeamsList = () => {
    const {getManagedTeams, createCookieObject, deleteTeam} = useGoldCupApi();
    const navigate = useNavigate()
    const [teams, setTeams] = useState<any[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
                <>
                    <Col key={index} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{team.name}</Card.Title>
                                <Card.Text>Division: {team.division}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Link onClick={() => navigate(`/team/${team.id}`)}>View</Card.Link>
                                <Card.Link onClick={() => navigate(`/team/${team.id}/edit`)}>Edit</Card.Link>
                                <Card.Link className="link-danger" onClick={() => setShowDeleteModal(true)}>Delete</Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header>
                            <Modal.Title>Delete Person</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete {team.name}?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(team.id)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                )
            })
            return <Row>{rowItems}</Row>
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
