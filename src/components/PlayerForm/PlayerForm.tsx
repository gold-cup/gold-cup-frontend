import { ChangeEvent, useState } from "react"
import { Form, Row, Col, Stack, Button } from "react-bootstrap"
import { useGoldCupApi, Team, Person } from "../../hooks"

interface payload {
    number: number
    position: string
    team_id?: number
    person_id?: number
}

export interface Props {
    person: Person
}

export const PlayerForm = ({person}: Props) => {
    const {getTeamFromToken, createCookieObject, newPlayer} = useGoldCupApi()
    const [team, setTeam] = useState<Team | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formTarget = e.target as HTMLFormElement
        const number = formTarget.number.value
        const position = formTarget.position.value
        const payload: payload = {number: number, position: position, person_id: person.id}
        if (team) {
            payload.team_id = team.id
        }
        const token = createCookieObject().token
        if (token) {
            const res = await newPlayer(token, payload)
            if (res.status === 201) {
                window.location.href = "../dashboard?tab=player-management"
            }
        }
    }

    const getTeamFromPassword = (password: string) => {
        setError(undefined)
        getTeamFromToken(password)
        .then(res => {
            if (res.data.error) {
                setError(res.data.error)
                setTeam(undefined)
            } else {
                setTeam(res.data)
            }
        })
        .catch(e => {
            console.log(e);
            setTeam(undefined)
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
        <Row>
            <Col md={8}>
                <Form.Group controlId="formBasicTeamName">
                    <Form.Label>Team Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter team password" onChange={(e: ChangeEvent<HTMLInputElement>) => getTeamFromPassword(e.target.value)}  />
                    <Form.Text>
                        This can be gotten from your team manager.
                        If you are participating in the Men's 50+ Draft, leave this empty.
                    </Form.Text>
                </Form.Group>
                {team && <p>Team Name: {team.name}, Division: {team.division}</p>}
                {error && <p>Error: {error}</p>}
            </Col>
            <Col md={2}>
                <Form.Group controlId="formBasicPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Select name='position'>
                        <option>Select</option>
                        <option value='GK'>Goalkeeper</option>
                        <option value='D'>Defender</option>
                        <option value='M'>Midfielder</option>
                        <option value='F'>Forward</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={2}>
                <Form.Group controlId="formBasicNumber">
                    <Form.Label>Number</Form.Label>
                    <Form.Control type="number" name='number' placeholder="Number" min="1" max="99" />
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
