import React from "react";
import { Team } from "../../../../hooks";
import {Link} from "react-router-dom";

export interface Props {
    team: Team;
}

export const TeamRow = ({ team }: Props) => {
    return (
        <tr key={team.id}>
            <td><Link to={`/teams/${team.id}`}>{team.name}</Link></td>
            <td>{team.points}</td>
            <td>{team.division}</td>
        </tr>
    )
}
