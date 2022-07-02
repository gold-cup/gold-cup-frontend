import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <>
        <h1>Gold Cup</h1>
        <Link to="/teams">Teams</Link>
        </>
    )
}
