import React from 'react'
import { TeamsList, TeamsPermission, PermissionsModal } from './components';

export interface Props {
    permission: string
}

export const TeamManagement = ({permission}: Props) => {
    const [showModal, setShowModal] = React.useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    const teamManagementMarkup = permission !== 'user' && permission !== '' ?
        <TeamsList /> :
        <TeamsPermission showModal={handleShowModal} />

    return (
        <>
            <h3>Team Management</h3>
            <p>Here is where you can create teams for Gold Cup</p>
            {teamManagementMarkup}
            <PermissionsModal showModal={showModal} handleHideModal={handleHideModal} />
        </>
    )
}
