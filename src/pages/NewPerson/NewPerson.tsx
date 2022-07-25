import React, { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './NewPerson.css'
import { useGoldCupApi } from '../../hooks';

export const NewPerson = () => {
    const [waiver, setWaiver] = useState<File | null>(null)
    const [photo, setPhoto] = useState<File | null>(null)
    const [govId, setGovId] = useState<File | null>(null)
    const [clientErrors, setClientErrors] = useState<string[]>([])
    const [serverErrors, setServerErrors] = useState<{[key: string]: string}>({})
    const {newPerson, createCookieObject} = useGoldCupApi()

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
        if (waiverFileType !== 'pdf') {
            errors.push('Waiver must be a pdf')
        }
        // 2. Photo is an image
        const photoFileType = photo?.type.split('/')[0]
        if (photoFileType !== 'image') {
            errors.push('Photo must be an image')
        }
        // 3. GovId is an image
        const govIdFileType = govId?.type.split('/')[0]
        if (govIdFileType !== 'image') {
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
                const res = await newPerson(formData, cookies.token)
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

    const clientErrorsMarkup = clientErrors.map((error, index) => {
        return <li key={index}>{error}</li>
    })

    const serverErrorsMarkup = () => {
        const keys = Object.keys(serverErrors)
        const keyObj = keys.map((key, index) => {return {[key]: serverErrors[key]}})
        return keyObj.map((item, index) => {
            return <li key={index}>{Object.keys(item)[0]}: {Object.values(item).join(',')}</li>
        })
    }

    const clearErrors = () => {
        setClientErrors([])
        setServerErrors({})
    }

    const innerErrorMarkup = (
        <>
            {clientErrorsMarkup}
            {serverErrorsMarkup()}
        </>
    )

    const errorMarkup = (
        <Alert variant="danger" show={clientErrors.length > 0 || Object.keys(serverErrors).length > 0} onClose={clearErrors} dismissible>
            <Alert.Heading>Looks like we got some errors</Alert.Heading>
            <ul>
                {innerErrorMarkup}
            </ul>
        </Alert>

    )

    return (
        <>
            {errorMarkup}
            <Row>
                <h1>New Person</h1>
            </Row>
            <Row>
                <h3>Person Details</h3>
            </Row>
            <Row>
                <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md>
                                <Form.Group controlId="formBasicFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" name='firstName' />
                                </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicMiddleName">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="Middle Name" name='middleName'/>
                            </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" name='lastName' />
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md>
                            <Form.Group controlId="formBasicBirthday">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="date" placeholder="Birthday" name='birthday' />
                            </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select name='gender'>
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
                                <Form.Control type="text" placeholder="Email" name='email'/>
                            </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicParentEmail">
                                <Form.Label>Parent Email</Form.Label>
                                <Form.Control type="text" placeholder="Parent Email" name='parentEmail'/>
                                <Form.Text>This is only applicable if you are under 13</Form.Text>
                            </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="tel" name='phoneNumber'/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md>
                            <Form.Group controlId="formBasicCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" name='city' />
                            </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicProvince">
                                <Form.Label>Province</Form.Label>
                                <Form.Control type="text" placeholder="Province" name='province' />
                            </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" placeholder="Country" name='country' />
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
                            </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicPhoto">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control type="file" onChange={(e: any) => setPhoto(e.target.files[0])} />
                            </Form.Group>
                            </Col>
                            <Col md>
                            <Form.Group controlId="formBasicID">
                                <Form.Label>Government Identification</Form.Label>
                                <Form.Control type="file" onChange={(e: any) => setGovId(e.target.files[0])}/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Button type='submit' variant="primary" className='btn-top'>Submit</Button>
                </Form>
            </Row>
        </>
    )
}
