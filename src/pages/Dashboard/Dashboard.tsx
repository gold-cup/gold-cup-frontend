import React, { useEffect } from 'react'

export const Dashboard = () => {
    const createCookieObject = () => {
        const cookieObject: {[key: string]: string} = {}
        document.cookie.split('; ').map((item) => item.split('=')).forEach((item) => {
            console.log(item[1]);
            cookieObject[item[0]] = item[1]
            console.log(cookieObject)
        })
        return cookieObject
    }

    useEffect(() => {
        const cookies = createCookieObject()
        const token = cookies.token
        if (!token) {
            window.location.href = '/register';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}
