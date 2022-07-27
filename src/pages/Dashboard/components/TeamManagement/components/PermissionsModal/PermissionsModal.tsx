import { Modal, Button } from "react-bootstrap"
import { useGoldCupApi } from "../../../../../../hooks";

export interface Props {
    handleHideModal: () => void
    showModal: boolean
}

export const PermissionsModal = ({showModal, handleHideModal}: Props) => {
    const {requestTeamManagerPermissions, createCookieObject} = useGoldCupApi();

    const handleRequestTeamManagerPermission = async () => {
        const cookies = createCookieObject();
        const res = await requestTeamManagerPermissions(cookies.token);
        if (res.data) {
            handleHideModal();
            window.location.reload()
        }
    }

    return (
        <Modal show={showModal} onHide={handleHideModal}>
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
                <Button variant="secondary" onClick={handleHideModal}>Cancel</Button>
                <Button variant="primary" onClick={() => handleRequestTeamManagerPermission()}>Register</Button>
            </Modal.Footer>
        </Modal>
    )
}
