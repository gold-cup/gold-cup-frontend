import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useGoldCupApi } from '../../../../hooks';

export const PersonManagement = () => {
    const {createCookieObject, getPeople} = useGoldCupApi()
    const [people, setPeople] = useState<any[]>([])
    const navigate = useNavigate();


    useEffect(() => {
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
        getPeopleDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createPeopleGrid = () => {
        const rowSize = 3
        for (let i = 0; i < people.length; i += rowSize) {
            const row = people.slice(i, i + rowSize)
            const rowItems = row.map((person, index) => {
                const name = [person.first_name, person.middle_name, person.last_name].join(' ')
                return (
                    <Col key={index} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Text>Status: {person.status}</Card.Text>
                                <Stack gap={3} direction='horizontal'>
                                <Button variant="primary" onClick={() => navigate(`/dashboard/people/${person.id}`)}>View</Button>
                                <Button variant="primary" onClick={() => navigate(`/dashboard/people/${person.id}`)}>Edit</Button>
                                <Button variant="danger" onClick={() => navigate(`/dashboard/people/${person.id}`)}>Delete</Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })
            return rowItems
        }
    }

    const peopleList = people.length ? (
        createPeopleGrid()
    ) : <p>You have people</p>


    return (
        <>
            <Stack direction='horizontal' gap={3}>
                    <h3>People Management</h3>
                    <Button className='ms-auto' onClick={() => navigate("../new-person")}>Add New</Button>
            </Stack>
            <Row>
            <p>This is where you can view and edit the people attached to this account. Before you can register as a coach or player, you must add a personal record.</p>
            </Row>
            {peopleList}
        </>
    )
}
