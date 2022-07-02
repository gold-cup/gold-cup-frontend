import React from "react";
import { Team } from "../../../../hooks";

export interface Props {
    team: Team;
}

export const TeamRow = ({ team }: Props) => {
    return (
        <tr key={team.id}>
            <td>{team.name}</td>
            <td>{team.points}</td>
            <td>{team.division}</td>
        </tr>
    )
}
