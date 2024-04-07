<script lang="ts">
	import ChevronDoubleDown from './ChevronDoubleDown.svelte';
	import DoubleBars from './DoubleBars.svelte';

	export let active = true;
</script>

{#if active}
	<ChevronDoubleDown {active} />
{:else}
	<DoubleBars />
{/if}
