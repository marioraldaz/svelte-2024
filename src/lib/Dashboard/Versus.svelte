<script>
    import Select from "./Select.svelte";
	import { createEventDispatcher, onMount } from "svelte";
    import playersStore, {getPlayer} from '$stores/players';
    import Game from "./Game.svelte";
	const dispatch = createEventDispatcher();	

    let player1;
    let player2;
    let players=[];
    let expDif=0;
    let selected1;
    let selected2;
    let increment1 = 0;
    let increment2 = 0;

    onMount(()=>{
        playersStore.subscribe((data)=>{
            players=data.players;
        })
    })
    
    function updatePlayer1(e){
            player1=getPlayer(e.target.value);
            calcExpGain(player1,player2);
    }

    function updatePlayer2(e){
            player2=getPlayer(e.target.value);
            calcExpGain(player2,player1);
    }
    
    function calcExpGain(player1,player2){
        if(player1 && player2){

            expDif = player1["expPoints"] - player2["expPoints"];
        }
        
    }

    function addPoints(player1,player2,increment){
        
        dispatch('onAddPointsVS');
    }
</script>

{#if player1 && player2}
    <h1>{player1["name"]} vs {player2["name"]} </h1>
{:else}
    <h1>Choose the players</h1>
{/if}
<div class="container">
    <div class="container__select1">
        <Select {players} bind:value={selected1} on:change={updatePlayer1}/>
    </div>
    <div class="container__VS">  VS  </div>
    <div class="container__select2">
        <Select {players}  bind:value={selected2} on:change={updatePlayer2}/>
    </div>

    <div class="container__expDif">
        Diferencia exp:{expDif}
    </div>

    <div class="container__play">
        {#if player1 && player2}
            {#each player1.games as game1}
                {#each player2.games as game2}
                    {#if game1==game2}
                    <GameVS
                    {...game1}
                    on:levelUp={playersStore.onLevelUp(player1.name)}
                    on:addPoints={playersStore.onAddPointsVS(player1.name,player2.name,increment1,increment2)} 
                        />
                    {/if}
                {/each}
            {/each}
        {/if}
    </div>
</div>





<style lang="scss">
    .container{
        width:100%;
        height: 500px;
        display: inline-block;
        box-sizing: border-box;
        position:absolute;
        &__select1,&__select2{
            position: absolute;
            width:200px;
        }
        &__select2{
            top:0;
            left:20%;
        }
       
        &__VS{
            position: absolute;
            left:17.5%;
            width:50px;
        }
        &__expDif{
            position: absolute;
            left:40%;
        }

        &__play{
            position:absolute;
            top:50%;
        }
    }
</style>