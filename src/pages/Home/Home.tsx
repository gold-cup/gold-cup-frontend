import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './Home.css'

export const Home = () => {
    return (
        <>
        <Row>
        <div className='logo'>
            <img src="/GC Logo .png" alt="logo" />
        </div>
        </Row>
        <Row>
            <Col></Col>
            <Col md='auto'>
                <h1>Gold Cup</h1>
            </Col>
            <Col></Col>
        </Row>
        </>
    )
}
