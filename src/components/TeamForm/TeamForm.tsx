import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { TeamDivisions, useGoldCupApi } from "../../hooks"

export const TeamForm = () => {
    const {createCookieObject, newTeam} = useGoldCupApi()
    const options = Object.keys(TeamDivisions).map((division) => {
        return <option key={division} value={division}>{TeamDivisions[division]}</option>
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formTarget = e.target as HTMLFormElement
        const teamName = formTarget.teamName.value;
        const teamDivision = formTarget.division.value;
        const payload = {name: teamName, division: teamDivision}
        const cookie = createCookieObject()
        if (cookie.token) {
            const res = await newTeam(cookie.token, payload)
            if (res.status === 200) {
                window.location.href = "/dashboard?tab=team-management"
            }
        }
    }

    return (
       <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={8}>
                    <Form.Group controlId="formBasicTeamName">
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control type="text" placeholder="Team Name" name='teamName' />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="formBasicDivision">
                        <Form.Label>Division</Form.Label>
                        <Form.Select name='division'>
                            <option>Select</option>
                            {options}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Stack direction="horizontal" gap={3}>
                <Button type='submit' variant="primary" className='btn-top'>Submit</Button>
                <Button variant="secondary" className='btn-top' onClick={() => window.location.href = '/dashboard?tab=team-management'}>Cancel</Button>
            </Stack>
       </Form>
    )
}
