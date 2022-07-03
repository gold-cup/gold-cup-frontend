import React from 'react'
import { Player } from '../../../../hooks'

export interface Props {
    player: Player;
}

export const PlayerRow = ({ player }: Props) => {
    return (
        <tr key={player.id}>
            <td>{player.number}</td>
            <td>{player.name}</td>
            <td>{player.position}</td>
        </tr>
    )
}
