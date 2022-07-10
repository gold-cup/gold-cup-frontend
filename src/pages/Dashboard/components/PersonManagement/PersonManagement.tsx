import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Stack } from 'react-bootstrap';
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
                    setPeople(res.data)
                }
            }
        }
        getPeopleDetails()
    }, [])


    const markup = people.length === 0 ?
        <p>You don't have any people yet</p>
        : <p>You have people</p>


    return (
        <>
            <Stack direction='horizontal' gap={3}>
                    <h3>People Management</h3>
                    <Button className='ms-auto' onClick={() => navigate("../new-person")}>Add New</Button>
            </Stack>
            <p>This is where you can view and edit the people attached to this account. Before you can register as a coach or player, you must add a personal record.</p>
            {markup}
        </>
    )
}
