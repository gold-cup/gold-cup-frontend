import React, { useState } from 'react'
import { Alert, Row } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './NewPerson.css'
import { PersonForm } from '../../components';

export const NewPerson = () => {
    const [clientErrors, setClientErrors] = useState<string[]>([])
    const [serverErrors, setServerErrors] = useState<{[key: string]: string}>({})

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
                <PersonForm setClientErrors={setClientErrors} setServerErrors={setServerErrors} />
            </Row>
        </>
    )
}
