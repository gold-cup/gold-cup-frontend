import React, { ChangeEvent, FormEventHandler } from 'react'
import { Form, Stack, Button, Alert } from 'react-bootstrap'
import { useGoldCupApi } from '../../hooks'

export const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const {login} = useGoldCupApi()
    const handleSubmit: FormEventHandler<HTMLFormElement>  = async (event) => {
        event.preventDefault()
        const payload = {
            email,
            password,
        }
        const res = await login(payload)
        if (res.data.error) {
            setError(res.data.error)
        } else if (res.data.token) {
            const expiry = new Date(Date.now() + (4 * 60 * 60 * 1000))
            document.cookie = "token=" + res.data.token + ";path=/; expires=" + expiry.toUTCString()
            window.location.href = '/dashboard'
        } else {
            setError('Unknown error')
        }
    }

    const errorMarkup = error ? (
        <Alert variant="danger">
            <Alert.Heading>Looks like we got some errors</Alert.Heading>
            <p>{error}</p>
        </Alert>
    ) : null

    return (
    <>
    {errorMarkup}
    <h1>Login</h1>
    <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password" value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Stack direction='horizontal' gap={3}>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button onClick={() => setShowPassword(!showPassword)} variant='secondary'>Show Passwords</Button>
            <a href='/register'>Sign up for an Account</a>
            </Stack>
        </Form>
        </>
    )
}
