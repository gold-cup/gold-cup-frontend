import React from 'react'
import { Player } from '../../../../hooks'

export interface Props {
    player: Player;
}

export const PlayerRow = ({ player }: Props) => {
    const nameArr = [player.person.first_name, player.person.last_name]
    if (player.person.middle_name) {
        nameArr.splice(1, 0, player.person.middle_name)
    }
    const name = nameArr.join(' ')
    return (
        <tr key={player.id}>
            <td>{player.number}</td>
            <td>{name}</td>
            <td>{player.position}</td>
        </tr>
    )
}
