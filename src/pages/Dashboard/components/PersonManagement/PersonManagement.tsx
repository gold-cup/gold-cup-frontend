import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Modal, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useGoldCupApi } from '../../../../hooks';

export const PersonManagement = () => {
    const {createCookieObject, getPeople, deletePerson} = useGoldCupApi()
    const [people, setPeople] = useState<any[]>([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const navigate = useNavigate();

    const getPeopleDetails = async () => {
        const cookies = createCookieObject()
        if (cookies.token) {
            const res = await getPeople(cookies.token)
            if (res.data) {
                console.log(res.data)
                setPeople(res.data)
            }
        }
    }

    useEffect(() => {
        getPeopleDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = async (id: number) => {
        const cookies = createCookieObject()
        const res = await deletePerson(id, cookies.token)
        if (res.status === 200) {
            setShowDeleteModal(false)
            getPeopleDetails()
        }
    }

    const createPeopleGrid = () => {
        const rowSize = 3
        for (let i = 0; i < people.length; i += rowSize) {
            const row = people.slice(i, i + rowSize)
            const rowItems = row.map((person, index) => {
                const name = [person.first_name, person.middle_name, person.last_name].join(' ')
                return (
                    <>
                        <Col key={index} md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Text>Status: {person.status}</Card.Text>
                                    <ButtonGroup>
                                        <Button variant="primary" onClick={() => navigate(`/dashboard/people/${person.id}`)}>View</Button>
                                        <Button variant="secondary" onClick={() => navigate(`/person/${person.id}`)}>Edit</Button>
                                        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                            <Modal.Header>
                                <Modal.Title>Delete Person</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to delete {name}?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(person.id)}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )
            })
            return rowItems
        }
    }

    const peopleList = people.length ? (
        createPeopleGrid()
    ) : <p>You haven't registered any people yet. Click "Add Person" to get started.</p>


    return (
        <>
            <Stack direction='horizontal' gap={3}>
                    <h3>People Management</h3>
                    <Button className='ms-auto' onClick={() => navigate("../new-person")}>Add Person</Button>
            </Stack>
            <Row>
            <p>This is where you can view and edit the people attached to this account. Before you can register as a coach or player, you must add a personal record.</p>
            </Row>
            {peopleList}
        </>
    )
}
