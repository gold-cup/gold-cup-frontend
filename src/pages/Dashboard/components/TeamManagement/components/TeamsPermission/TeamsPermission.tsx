import { Row, Col, Button } from "react-bootstrap"

export interface Props {
    showModal: () => void
}

export const TeamsPermission = ({showModal}: Props) => {
    return (
        <div>
            <Row>
                <p>Currently you are not a Team Manager.
                Being a Team Manager means that you are responsible for organizing teams, including approval of team members and payment.
                You can become a Team Manager by registering as a Team Admin.</p>
            </Row>
            <Row>
                <Col>
                    <Button onClick={showModal}>Register as Team Manager</Button>
                </Col>
            </Row>
        </div>
    )
}
