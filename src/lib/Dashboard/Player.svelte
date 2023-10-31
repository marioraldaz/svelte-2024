<script>
	export let name;
	export let experience;
	export let expPoints;
</script>

<div aria-label="player {name}">
	<span>{name}</span> ({experience}) totalPoints:{expPoints} <slot />
</div>
