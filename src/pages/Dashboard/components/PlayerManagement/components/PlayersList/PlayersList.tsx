import { useEffect, useState } from "react"
import { Col, Card, Modal, Button, Row } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useGoldCupApi, Player } from "../../../../../../hooks"

export const PlayersList = () => {
    const {createCookieObject, getPlayers, deletePlayer} = useGoldCupApi()
    const [players, setPlayers] = useState<Player[]>([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [token, setToken] = useState<string | undefined>(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        const cookies = createCookieObject()
        const token = cookies.token
        if (!token) {
            window.location.href = '/login';
            } else {
                setToken(token)
                getPlayers(token).then(res => { setPlayers(res.data) })
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = async (id: number, person_id: number) => {
        if (token) {
            const res = await deletePlayer(id, token, person_id)
            if (res.status === 200) {
                setShowDeleteModal(false)
                getPlayers(token).then(res => { setPlayers(res.data) })
            }
        }
    }

    const rowSize = 3
    const createPlayerGrid = () => {
        if (players.length === 0) {
            return <>You don't have any player registrations yet</>
        }
        for (let i = 0; i < players.length; i += rowSize) {
            const row = players.slice(i, i + rowSize)
            const rowItems = row.map((player, index) => {
            return (
                <>
                    <Col key={index} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{player.person.first_name} - {player.team.name}</Card.Title>
                                <Card.Text>Division: {player.position}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Link onClick={() => navigate(`/team/${player.id}`)}>View</Card.Link>
                                <Card.Link onClick={() => navigate(`/team/${player.id}/edit`)}>Edit</Card.Link>
                                <Card.Link className="link-danger" onClick={() => setShowDeleteModal(true)}>Delete</Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header>
                            <Modal.Title>Delete Person</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete {player.name}?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(player.id, player.person.id)}>
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
    return (
        <>
        {createPlayerGrid()}
        </>
    )
}
