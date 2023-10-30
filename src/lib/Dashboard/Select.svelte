<script>
	import { onMount } from "svelte";
    import Players from "../../stores/players.js";
    export let players=[];
    
    onMount(()=>{
        return Players.subscribe((data)=>{
            players=data.players;
        })
    })
    export let selected;
</script>


<select bind:value={selected} name="select" class="select" on:change>
    
    {#each players as player}
    <option value={player}>{player.name}</option>
    {/each}
</select>