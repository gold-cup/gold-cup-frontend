import React, { ChangeEvent, FormEventHandler } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'

export const Register = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [passwordValid, setPasswordValid] = React.useState(true)
    const [emailValid, setEmailValid] = React.useState(true)
    const [nameValid, setNameValid] = React.useState(true)

    // eslint-disable-next-line no-invalid-regexp
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

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const valid = validateForm()
        if (valid) {
            const payload = {
                name,
                email,
                password,
            }
            console.log(payload)
        }
    }

    return (
        <>
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
