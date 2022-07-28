import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { useGoldCupApi, UserDetails } from '../../hooks'
import { PersonManagement, PlayerManagement, TeamManagement } from './components'

export const Dashboard = () => {
    const {getLoggedInUserDetails, createCookieObject} = useGoldCupApi()
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const getUserDetails = async () => {
            const res = await getLoggedInUserDetails(token)
            if (res.data) {
                setUserDetails({name: res.data.name, email: res.data.email, permission: res.data.permission})
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
                    defaultActiveKey="personal-info"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    onSelect={(k) => setSearchParams({tab: k || 'person-management'})}
                    activeKey={searchParams.get('tab') || 'person-management'}
                >
                    <Tab eventKey="personal-info" title="Personal Information">
                        <PersonManagement />
                    </Tab>
                    <Tab eventKey="player-management" title="Player Management">
                        <PlayerManagement />
                    </Tab>
                    <Tab eventKey="coach-management" title="Coach Management">
                        <h3>Coach Management</h3>
                        <p>Here is where you can register yourself or others to be coaches in gold cup.</p>
                    </Tab>
                    <Tab eventKey="team-management" title="Team Management">
                        <TeamManagement permission={userDetails?.permission || ''} />
                    </Tab>
                </Tabs>
            </Col>
        </Row>
        </>
    )
}
