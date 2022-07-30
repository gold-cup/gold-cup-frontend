import { Stack, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import { PlayersList } from "./components"

export const PlayerManagement = () => {
    const navigate = useNavigate()

    return (
        <>
            <Stack direction='horizontal' gap={3}>
                <h3>Player Management</h3>
                <Button className='ms-auto' onClick={() => navigate("../new-player")}>Add Person</Button>
            </Stack>
            <p>Here is where you can register yourself or others to be players in gold cup.</p>
            <PlayersList />
        </>
    )
}
