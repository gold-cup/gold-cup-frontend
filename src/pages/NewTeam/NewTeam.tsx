import { useState } from "react"
import { TeamForm } from "../../components"
import { Team } from "../../hooks"

export const NewTeam = () => {
    const [team, setTeam] = useState<Team | undefined>(undefined)
    return (
        <>
        <h1>New Team</h1>
        <TeamForm team={team} setTeam={setTeam} />
        </>
    )
}
