import { useEffect, useState } from "react"
import { Col, Card, Row, Modal, Button } from "react-bootstrap"
import { Coach, useGoldCupApi } from "../../../../../../hooks"

export const CoachList = () => {
    const [coaches, setCoaches] = useState<Coach[]>([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const {createPersonName, createCookieObject, getCoaches, deleteCoach} = useGoldCupApi()
    const [token, setToken] = useState<string | undefined>(undefined)
    useEffect(() => {
        const cookies = createCookieObject()
        const token = cookies.token
        if (!token) {
            window.location.href = '/login';
            } else {
                setToken(token)
                getCoaches(token).then(res => { setCoaches(res.data) })
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = async (id: number, person_id: number) => {
        if (token) {
            const res = await deleteCoach(id, token, person_id)
            if (res.status === 200) {
                setShowDeleteModal(false)
                getCoaches(token).then(res => { setCoaches(res.data) })
            }
        }
    }

    const rowSize = 3
    const createCoachGrid = () => {
        if (coaches.length === 0) {
            return <>You don't have any coach registrations yet</>
        }
        for (let i = 0; i < coaches.length; i += rowSize) {
            const row = coaches.slice(i, i + rowSize)
            const rowItems = row.map((coach, index) => {
            return (
                <>
                    <Col key={index} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{createPersonName(coach.person)}</Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Text>Team: {coach.team.name}</Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Card.Text>Division: {coach.team.division}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Link className="link-danger" onClick={() => setShowDeleteModal(true)}>Delete</Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header>
                            <Modal.Title>Delete Person</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete {coach.person.first_name}?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(coach.id, coach.person.id)}>
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
        {createCoachGrid()}
        </>
    )
}
