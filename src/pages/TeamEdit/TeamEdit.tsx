import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TeamForm } from "../../components"
import { Team, useGoldCupApi } from "../../hooks"

export const TeamEdit = () => {
    const {id} = useParams()
    const {createCookieObject, getTeam} = useGoldCupApi()
    const [team, setTeam] = useState<Team | null>(null)
    useEffect(() => {
        const cookieObject = createCookieObject()
        if (cookieObject.token) {
            getTeam(cookieObject.token, Number(id)).then((res: { data: Team; }) => setTeam(res.data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <h1>Edit Team</h1>
            <TeamForm team={team || undefined} setTeam={setTeam}/>
        </>
    )
}
