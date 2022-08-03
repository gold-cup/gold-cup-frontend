import { useEffect, useState } from "react";
import { Person, useGoldCupApi } from "../../../../hooks";

export const CoachManagement = () => {
    const {createCookieObject, getApprovedPlayers} = useGoldCupApi();
    const [approvedPeople, setApprovedPeople] = useState<Person[]>([])

    useEffect(() => {
        const cookies = createCookieObject()
        const token = cookies.token
        if (!token) {
            window.location.href = '/login';
            } else {
                getApprovedPlayers(token).then(res => { setApprovedPeople(res.data) })
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const markup = approvedPeople.length ? (
        <p>You have people</p>
    ) : (
        <p>You don't have any approved people to create coach registrations for yet. We are currently confirming your current participant registrations. To view the current status of your participant registrations, got to <a href="/dashboard?tab=personal-info">Person Management</a></p>
    )

    return (
        <>
            <h3>Coach Management</h3>
            <p>Here is where you can register yourself or others to be coaches in gold cup.</p>
            {markup}
        </>
    )
}
