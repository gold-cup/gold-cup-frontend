import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { CoachForm } from "../../components"
import { Person, useGoldCupApi } from "../../hooks"

export const NewCoach = () => {
    const [searchParams,] = useSearchParams()
    const { getPerson, createCookieObject } = useGoldCupApi()
    const [person, setPerson] = useState<Person | null>(null)

    useEffect(() => {
        const personId = searchParams.get('person-id')
        const token = createCookieObject().token
        if (personId && token) {
            getPerson(token, Number(personId)).then(res => setPerson(res.data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1>New Coach</h1>
            {person && <CoachForm person={person}/>}
        </>
    )
}
