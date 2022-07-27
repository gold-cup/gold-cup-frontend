import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useGoldCupApi } from '../../../../hooks';

export interface Props {
    permission: string
}

export const TeamManagement = ({permission}: Props) => {
    const [showModal, setShowModal] = React.useState(false);
    const {requestTeamManagerPermissions, createCookieObject} = useGoldCupApi();

    const handleRequestTeamManagerPermission = async () => {
        const cookies = createCookieObject();
        const res = await requestTeamManagerPermissions(cookies.token);
        if (res.data) {
            setShowModal(false);
            window.location.reload()
        }
    }

    const modal = (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Register as Team Manager</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                By registering as team manager, you will be able responsible for:
                <ul>
                    <li>Approving Coaches and Players for joining teams</li>
                    <li>Pay for Team Registration</li>
                    <li>Being the point of contact for any team communications</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => handleRequestTeamManagerPermission()}>Register</Button>
            </Modal.Footer>
        </Modal>
    )

    const teamManagementMarkup = permission !== 'user' && permission !== '' ?
        <p>You have permission to manage teams</p> :
        <div>
            <Row>
                <p>Currently you are not a Team Manager.
                Being a Team Manager means that you are responsible for organizing teams, including approval of team members and payment.
                You can become a Team Manager by registering as a Team Admin.</p>
            </Row>
            <Row>
                <Col>
                    <Button onClick={() => setShowModal(true)}>Register as Team Manager</Button>
                </Col>
            </Row>
        </div>

    return (
        <>
            <h3>Team Management</h3>
            <p>Here is where you can create teams for Gold Cup</p>
            {teamManagementMarkup}
            {modal}
        </>
    )
}
