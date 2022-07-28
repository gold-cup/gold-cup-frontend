import { Row, Col, Card } from "react-bootstrap"

export const PlayerManagement = () => {
    return (
        <>
            <h1>Player Management</h1>
            <p>Here is where you can register yourself or others to be players in gold cup.</p>
            <Row>
                <Col md={4}>
                <Card>Player 1</Card>
                </Col>
                <Col md={4}>
                <Card>Player 1</Card>
                </Col>
                <Col md={4}>
                <Card>Player 1</Card>
                </Col>
            </Row>
        </>
    )
}
