import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useGoldCupApi, UserDetails } from '../../hooks'

export const Dashboard = () => {
    const {getLoggedInUserDetails} = useGoldCupApi()
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
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
        const getUserDetails = async () => {
            const res = await getLoggedInUserDetails(token)
            if (res.data) {
                setUserDetails({name: res.data.name, email: res.data.email})
            }
        }
        const cookies = createCookieObject()
        const token = cookies.token
        if (!token) {
            window.location.href = '/login';
        } else {
           getUserDetails()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/login'
    }


    return (
        <>
            <h1>Dashboard</h1>
            {userDetails && <p>Welcome {userDetails.name}</p>}
            <Button onClick={logout}>Logout</Button>
        </>
    )
}
