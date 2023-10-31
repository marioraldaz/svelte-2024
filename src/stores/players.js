import { writable } from 'svelte/store';

import * as samples from '$data/samples.js';

const levels = samples.levels || [];
const players = samples.players || [];
const games = samples.games || {};

const playersStore = writable({
	levels,
	players,
	games
});

function updatePlayer(playerName, selectedGames) {
	playersStore.update((data) => {
		const player = data.players.find(
			(player) => player.name === playerName
		);
		if (player) {
			player.games = selectedGames.map(
				(gameName) => data.games[gameName]
			);
		}
		return data;
	});
}

function onLevelUp(playerName) {
	return () => {
		playersStore.update((data) => {
			const playerIndex = data.players.findIndex(
				(player) => {
					return player.name === playerName;
				}
			);

			const player = data.players[playerIndex];

			if (
				player.experience ===
				data.levels[data.levels.length - 1]
			) {
				return data;
			}
			let level = data.levels.indexOf(
				player.experience
			);
			data.players[playerIndex].experience =
				data.levels[level + 1];

			return data;
		});
	};
}

function onAddPoints(playerName,points) {
	
	return () => {
		playersStore.update((data) => {
			const playerIndex = data.players.findIndex((player)=>{
				return player.name === playerName;
			}
			)
			
			data.players[playerIndex].expPoints = points;

			return data;
		})
	}
}

function onAddPointsVS(playerName1,playerName2,increment1,increment2) {
	
	return () => {
		playersStore.update((data) => {

			const playerIndex1 = data.players.findIndex((player)=>{
				return player.name === playerName1;
			})
			const playerIndex2 = data.players.findIndex((player)=>{
				return player.name === playerName2;
			})
			
			data.players[playerIndex1].expPoints += increment1;
			data.players[playerIndex2].expPoints += increment2;

			return data;
		})
	}
}

export function getPlayer(playerName) {
	for(let i=0;i<players.length;i++){
		if (players[i].name === playerName){
			return players[i];
		}
	}
}


export default {
	...playersStore,
	updatePlayer,
	onLevelUp,
	onAddPoints,
	onAddPointsVS
};
