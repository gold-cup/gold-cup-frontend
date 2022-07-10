import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export const NewPerson = () => {
    return (
        <>
            <h1>New Person</h1>
            <Form>
                <Row>
                    <Form.Group as={Col} controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicMiddleName">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control type="text" placeholder="Middle Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="formBasicBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" placeholder="Birthday" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select>
                            <option>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicParentEmail">
                        <Form.Label>Parent Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" />
                        <Form.Text>This is only applicable if you are under 13</Form.Text>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicProvince">
                        <Form.Label>Province</Form.Label>
                        <Form.Control type="text" placeholder="Province" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Country" />
                    </Form.Group>
                </Row>
            </Form>
        </>
    )
}
