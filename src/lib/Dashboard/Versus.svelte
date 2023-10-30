<script>
    import Select from "./Select.svelte";
     let player1;
     let player2;
    let expDif=0;

    function updatePlayer1(e){
            player1=e.target.value;
            calcExpGain(player1,player2);
    }

    function updatePlayer2(e){
            player2=e.target.value;
            calcExpGain(player2,player1);
    }
    
    function calcExpGain(player1,player2){
        let dif = player1.exp - player2.exp;
    }
</script>

{#if player1 && player2}
    <h1>{player1.name} vs {player2.name} </h1>
{/if}
<div class="container">
    <Select selected={player1} on:change={updatePlayer1}/>
    <h1>  VS  </h1>
    <Select selected={player2} on:change={updatePlayer2}/>
</div>



<style lang="scss">

</style>