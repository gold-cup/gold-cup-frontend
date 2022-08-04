import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import styles from './Home.module.css'
import "./Home.css"
import axios from 'axios'

export const Home = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formTarget = e.target as HTMLFormElement
        const name = formTarget.personName.value
        const email = formTarget.email.value
        const res = await axios.post('https://e-sports-mailing-list.herokuapp.com/add', {name, email})
        if (res.status !== 200) {
            alert('Something went wrong, please try again. If this persists, please contact us.')
        }
        else {
            alert('Success!')
        }
    }
    return (
        <>
        <Row>
        <div className={styles.logo}>
            <img src="/GC Logo .png" alt="logo" />
        </div>
        </Row>
        <Row>
            <Col></Col>
            <Col md='auto'>
                <h1 className={styles.heading}>Gold Cup 2022</h1>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md='auto'>
                <h2 className={styles.subHeading}>Registration Opening Soon, Sign Up to Get Notified</h2>
            </Col>
            <Col></Col>
        </Row>
        <Form onSubmit={handleSubmit}>
        <Row>
            <Col></Col>
            <Col md='auto'>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={styles.formLabel}>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name='personName' />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={styles.formLabel}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" name='email' />
                        </Form.Group>
                    </Col>
                </Row>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col md='auto'>
            <Button type="submit">Sign Up</Button>
            </Col>
            <Col></Col>
        </Row>
        </Form>
        </>
    )
}
