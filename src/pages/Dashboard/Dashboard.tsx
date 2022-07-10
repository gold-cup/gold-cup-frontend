import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap'
import { useGoldCupApi, UserDetails } from '../../hooks'
import { PersonManagement, TeamManagement } from './components'

export const Dashboard = () => {
    const {getLoggedInUserDetails, createCookieObject} = useGoldCupApi()
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)


    useEffect(() => {
        const getUserDetails = async () => {
            const res = await getLoggedInUserDetails(token)
            if (res.data) {
                setUserDetails({name: res.data.name, email: res.data.email})
            }
        }
        const cookies = createCookieObject()
        const token = cookies.token
        if (!token) {
            window.location.href = '/login';
        } else {
           getUserDetails()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <Row>
            <Col>
            <h1>Welcome, {userDetails?.name}</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Tabs
                    defaultActiveKey="player-management"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="personal-info" title="Personal Information">
                        <PersonManagement />
                    </Tab>
                    <Tab eventKey="player-management" title="Player Management">
                        <h3>Player Management</h3>
                        <p>Here is where you can register yourself or others to be players in gold cup.</p>
                        <Row>
                            <Col>
                            <Card>Player 1</Card>
                            </Col>
                            <Col>
                            <Card>Player 1</Card>
                            </Col>
                            <Col>
                            <Card>Player 1</Card>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="coach-management" title="Coach Management">
                        <h3>Coach Management</h3>
                        <p>Here is where you can register yourself or others to be coaches in gold cup.</p>
                    </Tab>
                    <Tab eventKey="team-management" title="Team Management">
                        <TeamManagement />
                    </Tab>
                </Tabs>
            </Col>
        </Row>
        </>
    )
}
