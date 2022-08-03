import { ChangeEvent, useState } from "react";
import { Form, Row, Col, Stack, Button } from "react-bootstrap";
import { Person, Team } from "../../hooks";
import { useGoldCupApi } from "../../hooks";

export interface Props {
    person: Person;
}

export const CoachForm = ({person}: Props) => {
    const [team, setTeam] = useState<Team | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [certificate, setCertificate] = useState<File | null>(null)
    const {getTeamFromToken, createCookieObject, createCoach } = useGoldCupApi()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        if (certificate) {
            formData.append('certificate', certificate)
        }
        if (team) {
            formData.append('team_id', team?.id.toString())
        }
        formData.append('person_id', person.id.toString())
        const token = createCookieObject().token
        if (token) {
            const res = await createCoach(token, formData)
            if (res.status === 201) {
                window.location.href = "../dashboard?tab=coach-management"
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

    const certificationNeeded =
        team?.division === "B10" || team?.division === "G10"
        ? "Learn to Train"
        : "Soccer for Life"

    return (
        <Form onSubmit={handleSubmit}>
        <Row>
            <Col md={8}>
                <Form.Group controlId="formBasicTeamName">
                    <Form.Label>Team Password</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter team password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => getTeamFromPassword(e.target.value)}
                    />
                    <Form.Text>
                        This can be gotten from your team manager.
                    </Form.Text>
                </Form.Group>
                {team && <p>Team Name: {team.name}, Division: {team.division}</p>}
                {error && <p>Error: {error}</p>}
            </Col>
            <Col md={4}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Certification</Form.Label>
                <Form.Control type="file" onChange={(e: any) => setCertificate(e.target.files[0])}/>
                <Form.Text>
                    Upload a copy of your coachiing certification. {team && `For this you will need ${certificationNeeded}`}.
                </Form.Text>
            </Form.Group>
            </Col>
        </Row>
        <Stack direction="horizontal" gap={3}>
            <Button type='submit' variant="primary" className='btn-top'>Submit</Button>
            <Button variant="secondary" className='btn-top' onClick={() => window.location.href = '/dashboard?tab=team-management'}>Cancel</Button>
        </Stack>
   </Form>
    );
}
