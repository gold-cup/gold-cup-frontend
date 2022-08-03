import { useState } from "react"
import { Col, Card, Row, Modal, Button } from "react-bootstrap"
import { useGoldCupApi } from "../../../../../../hooks"

export const CoachList = () => {
    const [coaches,] = useState<any[]>([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const {createPersonName} = useGoldCupApi()
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
                                    <Col>
                                    <Card.Text>Number: {coach.number}</Card.Text>
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
                            <p>Are you sure you want to delete {coach.name}?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => {}}>
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
