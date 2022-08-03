import { useEffect, useState } from "react"
import { Stack, Button, Modal, Form } from "react-bootstrap"
import { useNavigate } from "react-router"
import { Person, useGoldCupApi } from "../../../../hooks"
import { PlayersList } from "./components"

export const PlayerManagement = () => {
    const navigate = useNavigate()
    const {createCookieObject, getApprovedPlayers} = useGoldCupApi()
    const [approvedPeople, setApprovedPeople] = useState<Person[]>([])
    const [showSelectModal, setShowSelectModal] = useState(false)

    useEffect(() => {
        const cookies = createCookieObject()
        const token = cookies.token
        if (!token) {
            window.location.href = '/login';
            } else {
                getApprovedPlayers(token).then(res => { setApprovedPeople(res.data) })
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const markup = approvedPeople.length === 0 ?
        <>You don't have any approved people to create player registrations for yet. We are currently confirming your current participant registrations. To view the current status of your participant registrations, got to <a href="/dashboard?tab=personal-info">Person Management</a></> :
        <PlayersList />


    return (
        <>
            <Stack direction='horizontal' gap={3}>
                <h3>Player Management</h3>
                <Button className='ms-auto' onClick={() => setShowSelectModal(true)}>Add Person</Button>
            </Stack>
            <p>Here is where you can register yourself or others to be players in gold cup.</p>
            {markup}
            <Modal show={showSelectModal}>
                <Modal.Header>
                    <Modal.Title>Select Person to Reigster as Player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formBasicPersonSelect">
                        <Form.Label>Person</Form.Label>
                        <Form.Select name='division'
                        >
                            <option>Select</option>
                            {approvedPeople.map((person, index) => {
                                const name = `${person.first_name} ${person.last_name}`
                                return <option key={index} value={person.id}>{name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSelectModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => navigate("../new-player?person-id=1")}>
                        Register Person
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
