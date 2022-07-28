import { ChangeEvent } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { TeamDivisions, useGoldCupApi, Team } from "../../hooks"

export interface Props {
    team?: Team
    setTeam?: (team: Team) => void
}

export const TeamForm = ({team, setTeam}: Props) => {
    const {createCookieObject, newTeam, updateTeam} = useGoldCupApi()
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
            let res;
            if (window.location.pathname.includes('edit')) {
                res = await updateTeam(cookie.token, team!.id, payload)
            } else {
                res = await newTeam(cookie.token, payload)
            }
            if (res.status === 200) {
                window.location.href = "/dashboard?tab=team-management"
            }
        }
    }

    const handleTeamChange = (e: ChangeEvent<any>, field: string) => {
        console.log(team)
        if (team && setTeam) {
            setTeam({...team!, [field]: e.target.value})
        } else if (setTeam) {
            const emptyTeam = {
                id: 0,
                name: "",
                points: 0,
                division: "",
                players: [],
                password: "",
            }
            setTeam({
                ...emptyTeam,
                [field]: e.target.value,
            })
        }
    }

    return (
       <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={8}>
                    <Form.Group controlId="formBasicTeamName">
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Team Name"
                            name='teamName' value={team?.name || ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTeamChange(e, 'name')} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="formBasicDivision">
                        <Form.Label>Division</Form.Label>
                        <Form.Select name='division'
                            value={team?.division}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleTeamChange(e, 'division')}
                        >
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
