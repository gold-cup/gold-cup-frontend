import React, { useEffect, useState } from 'react'
import { Alert, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import { PersonForm } from '../../components'
import { useGoldCupApi, Person } from '../../hooks'

export const PersonEdit = () => {
    const [clientErrors, setClientErrors] = useState<string[]>([])
    const [serverErrors, setServerErrors] = useState<{[key: string]: string}>({})
    const {id} = useParams()
    const {getPerson, createCookieObject} = useGoldCupApi()
    const [person, setPerson] = useState<Person | null>(null)

    useEffect(() => {
        async function fetchData(token: string, id: string) {
            const res = await getPerson(cookieObject.token, Number(id))
            if (res.data) {
                setPerson(res.data)
            } else {
                console.log('error failed to fetch person')
            }
        }
        const cookieObject = createCookieObject()
        if (cookieObject.token && id) {
            fetchData(cookieObject.token, id)
        } else {
            console.log('failed to get cookie')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <PersonForm person={person || undefined} setClientErrors={setClientErrors} setServerErrors={setServerErrors} />
        </Row>
    </>
    )
}
