<script>
	import { onMount } from "svelte";
    export let players=[];
    export let value;
</script>


<select bind:value={value} name="select" class="select" on:change>
    
    {#each players as player}
    <option value={player.name}>{player.name}</option>
    {/each}
</select>

<style lang="scss">
    .select{
        width: 100%;
        height: 100%;

        option{
            width:100%;
            height: 50px;
        }
    }
</style>