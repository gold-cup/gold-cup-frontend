import React from 'react'
import { Stack, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { TeamsList, TeamsPermission, PermissionsModal } from './components';

export interface Props {
    permission: string
}

export const TeamManagement = ({permission}: Props) => {
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate()

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);
    const canEdit = permission === 'admin' || permission === 'team_manager'

    const teamManagementMarkup = canEdit ?
        <TeamsList /> :
        <TeamsPermission showModal={handleShowModal} />

    return (
        <>
            <Stack direction='horizontal' gap={3}>
                <h3>Team Management</h3>
                {canEdit && <Button className='ms-auto' onClick={() => navigate("../new-team")}>Add Person</Button>}
            </Stack>
            <p>Here is where you can create teams for Gold Cup</p>
            {teamManagementMarkup}
            <PermissionsModal showModal={showModal} handleHideModal={handleHideModal} />
        </>
    )
}
