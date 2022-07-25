import React, { ChangeEvent, FormEventHandler } from 'react'
import { Alert, Button, Form, Stack } from 'react-bootstrap'
import { useGoldCupApi } from '../../hooks'
import { RegistrationErrors } from '../../hooks/useGoldCupApi'

export const Register = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [passwordValid, setPasswordValid] = React.useState(true)
    const [emailValid, setEmailValid] = React.useState(true)
    const [nameValid, setNameValid] = React.useState(true)
    const [serverErrors, setServerErrors] = React.useState<RegistrationErrors | null>(null)
    const {register} = useGoldCupApi()

    const EMAIL_REGEX = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    const validateForm = () => {
        setNameValid(true)
        setEmailValid(true)
        setPasswordValid(true)
        if (password !== confirmPassword || password.length < 8) {
            setPasswordValid(false)
        }
        if (!email.match(EMAIL_REGEX)) {
            setEmailValid(false)
        }
        if (name.length === 0) {
            setNameValid(false)
        }
        if (nameValid && emailValid && passwordValid) {
            return true
        }
        return false
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const valid = validateForm()
        if (valid) {
            const payload = {
                name,
                email,
                password,
            }
            const res = await register(payload)
            if (res.data.errors) {
                setServerErrors(res.data.errors);
            } else if (res.data.token) {
                document.cookie = "token=" + res.data.token
                window.location.href = '/dashboard'
            }
        }
    }

    const generateServerBanner = () => {
        if (serverErrors) {
            return (
                <Alert variant="danger">
                    <Alert.Heading>Looks like we got some errors</Alert.Heading>
                    <ul>
                        {serverErrors?.name && <li>Name Errors: {serverErrors.name}</li>}
                        {serverErrors?.email && <li>Email Errors: {serverErrors.email}</li>}
                        {serverErrors?.password && <li>Password Errors: {serverErrors.password}</li>}
                    </ul>
                </Alert>
            )
        }
        return null
    }

    return (
        <>
        {generateServerBanner()}
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    isInvalid={!nameValid}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter your name
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    isInvalid={!emailValid}
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                    Email is invalid
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password" value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    isInvalid={!passwordValid}
                />
                <Form.Control.Feedback type="invalid">
                    Passwords either do not match or are too short.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password" value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    isInvalid={!passwordValid}
                />
            </Form.Group>
            <Stack direction='horizontal' gap={3}>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button onClick={() => setShowPassword(!showPassword)} variant='secondary'>Show Passwords</Button>
            </Stack>
        </Form>
        </>
    )
}
