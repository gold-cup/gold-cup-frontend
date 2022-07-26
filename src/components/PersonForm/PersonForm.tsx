import { useEffect, useState } from "react"
import { Form, Row, Col, Button, Stack } from "react-bootstrap"
import { useGoldCupApi, Person } from "../../hooks"


export interface Props {
    person?: Person
    setClientErrors: (errors: string[]) => void
    setServerErrors: (errors: {[key: string]: string}) => void
}

export const PersonForm = ({person, setServerErrors, setClientErrors}: Props) => {
    const {createCookieObject, newPerson, domain, updatePerson} = useGoldCupApi()
    const [waiver, setWaiver] = useState<File | null>(null)
    const [photo, setPhoto] = useState<File | null>(null)
    const [govId, setGovId] = useState<File | null>(null)
    const [token, setToken] = useState<string>("")

    const getAge = (dateString: string) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const validateForm = (
        firstName: string,
        lastName: string,
        email: string,
        birthday: string,
        parentEmail: string,
        gender: string,
        city: string,
        country: string,
        province: string,
        phoneNumber: string
        ) => {
        const errors: string[] = []
        // We neeed to validate the following:
        // 1. Waiver is a pdf
        const waiverFileType = waiver?.type.split('/')[1]
        if (waiverFileType !== 'pdf' && !person) {
            errors.push('Waiver must be a pdf')
        }
        // 2. Photo is an image
        const photoFileType = photo?.type.split('/')[0]
        if (photoFileType !== 'image' && !person) {
            errors.push('Photo must be an image')
        }
        // 3. GovId is an image
        const govIdFileType = govId?.type.split('/')[0]
        if (govIdFileType !== 'image' && !person) {
            errors.push('Government ID must be an image')
        }
        // 4. First Name, Last Name, Birthday, Gender, City, Province, email and Country, Phone Number are not empty
        if (firstName === '') {
            errors.push('No first name provided')
        }
        if (lastName === '') {
            errors.push('No last name provided')
        }
        if (birthday === '') {
            errors.push('No birthday provided')
        }
        if (gender === '') {
            errors.push('No gender provided')
        }
        if (city === '') {
            errors.push('No city provided')
        }
        if (province === '') {
            errors.push('No province provided')
        }
        if (country === '') {
            errors.push('No country provided')
        }
        if (email === '') {
            errors.push('No email provided')
        }
        if (phoneNumber === '') {
            errors.push('No phone number provided')
        }
        // 5. If birthday is less than 13 years old, make sure parentEmail is not empty
        if (getAge(birthday) < 13) {
            if (parentEmail === '') {
                errors.push('Parent email is required')
            }
        }
        return errors
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formTarget = e.target as HTMLFormElement
        const firstName = formTarget.firstName.value;
        const middleName = formTarget.middleName.value;
        const lastName = formTarget.lastName.value;
        const email = formTarget.email.value;
        const birthday = formTarget.birthday.value;
        const gender = formTarget.gender.value;
        const parentEmail = formTarget.parentEmail.value;
        const city = formTarget.city.value
        const province = formTarget.province.value
        const country = formTarget.country.value
        const phoneNumber = formTarget.phoneNumber.value

        const errors = validateForm(firstName, lastName, email, birthday, parentEmail, gender, city, country, province, phoneNumber)
        if (errors.length === 0) {
            const formData = new FormData()
            formData.append('first_name', firstName)
            formData.append('middle_name', middleName)
            formData.append('last_name', lastName)
            formData.append('email', email)
            formData.append('birthday', birthday)
            formData.append('gender', gender)
            formData.append('parent_email', parentEmail)
            formData.append('city', city)
            formData.append('province', province)
            formData.append('country', country)
            formData.append('phone_number', phoneNumber)
            if (waiver) {
                formData.append('waiver', waiver)
            }
            if (photo) {
                formData.append('photo', photo)
            }
            if (govId) {
                formData.append('gov_id', govId)
            }

            const cookies = createCookieObject()
            if (cookies.token) {
                let res: any
                if (person) {
                    res = await updatePerson(person.id, formData, cookies.token)
                } else {
                    res = await newPerson(formData, cookies.token)
                }
                if (res.data.errors) {
                    setServerErrors(res.data.errors)
                } else {
                    window.location.href = '/dashboard'
                }
            }
        } else {
            setClientErrors(errors)
        }
    }

    useEffect(() => {
        const cookieObject = createCookieObject()
        if (cookieObject.token) {
            setToken(cookieObject.token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
        <Row>
            <Col md>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" name='firstName' value={person?.first_name}/>
                </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicMiddleName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control type="text" placeholder="Middle Name" name='middleName' value={person?.middle_name || undefined}/>
            </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" name='lastName' value={person?.last_name} />
            </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md>
            <Form.Group controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" placeholder="Birthday" name='birthday' value={person?.birthday} />
            </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select name='gender' value={person?.gender}>
                    <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
            </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email" name='email' value={person?.email}/>
            </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicParentEmail">
                <Form.Label>Parent Email</Form.Label>
                <Form.Control type="text" placeholder="Parent Email" name='parentEmail' value={person?.parent_email || undefined}/>
                <Form.Text>This is only applicable if you are under 13</Form.Text>
            </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" name='phoneNumber' value={person?.phone_number}/>
            </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md>
            <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" name='city' value={person?.city} />
            </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicProvince">
                <Form.Label>Province</Form.Label>
                <Form.Control type="text" placeholder="Province" name='province' value={person?.province} />
            </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Country" name='country' value={person?.country} />
            </Form.Group>
            </Col>
        </Row>
        <Row className='form-header'>
            <h3>Waivers and ID</h3>
        </Row>
        <Row>
            <Col md>
            <Form.Group controlId="formBasicWaiver">
                <Form.Label>Waiver</Form.Label>
                <Form.Control type="file" name="waiver" onChange={(e: any) => setWaiver(e.target.files[0])}/>
                {person && <Form.Text><a href={`${domain}/person/${person.id}/files?type=waiver&token=${token}`} target="blank">Download Current Waiver</a></Form.Text>}
            </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicPhoto">
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" onChange={(e: any) => setPhoto(e.target.files[0])} />
                {person && <Form.Text><a href={`${domain}/person/${person.id}/files?type=photo&token=${token}`} target="blank">Download Current Photo</a></Form.Text>}
            </Form.Group>
            </Col>
            <Col md>
            <Form.Group controlId="formBasicID">
                <Form.Label>Government Identification</Form.Label>
                <Form.Control type="file" onChange={(e: any) => setGovId(e.target.files[0])}/>
                {person && <Form.Text><a href={`${domain}/person/${person.id}/files?type=gov_id&token=${token}`} target="blank">Download Current ID</a></Form.Text>}
            </Form.Group>
            </Col>
        </Row>
        <Stack direction="horizontal" gap={3}>
        <Button type='submit' variant="primary" className='btn-top'>Submit</Button>
        <Button variant="secondary" className='btn-top' onClick={() => window.location.href = '/dashboard'}>Cancel</Button>
        </Stack>
</Form>
    )
}