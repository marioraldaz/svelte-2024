<script>
	import playersStore from '$stores/players';

	import Player from './Player.svelte';
	import Game from './Game.svelte';
	import Versus from './Versus.svelte';
</script>

<h1>Dashboard</h1>

{#each $playersStore.players as { name, experience, expPoints, games }}
	<Player {name} {experience} {expPoints}>
		{#each games as game}
			<Game
				{...game}
				on:levelUp={playersStore.onLevelUp(name)}
				on:addPoints={playersStore.onAddPoints(name, expPoints)} 
				bind:expPoints={expPoints}
			/>
		{/each}
	</Player>
	<br />
{/each}

<Versus/>
