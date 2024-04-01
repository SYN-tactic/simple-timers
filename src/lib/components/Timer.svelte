<script lang="ts">
	import Plus from '$lib/icons/Plus.svelte';
	import Minus from '$lib/icons/Minus.svelte';
	import Play from '$lib/icons/Play.svelte';
	import Pause from '$lib/icons/Pause.svelte';
	import ArrowPath from '$lib/icons/ArrowPath.svelte';

	export let intervalTime = 60; // 1 minute - the time to add or subtract from the timer

	function convertTimeToString(timeInSeconds: number) {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	// Attributes of a single timer
	let timeInSeconds = 3;
	$: timeLeft = timeInSeconds;
	$: timerHasStarted = false;
	$: timerPaused = false;
	$: timerHasEnded = timeLeft === 0;
	let intervalId: ReturnType<typeof setTimeout>;

	function startCountdown() {
		if (timerHasEnded) {
			timeLeft = timeInSeconds;
		} else if (timerPaused) {
			timerPaused = false;
		} else if (timerHasStarted) {
			return;
		}
		timerHasStarted = true;

		intervalId = setInterval(() => {
			timeLeft--;
			if (timeLeft <= 0) {
				timeLeft = 0;
				clearInterval(intervalId);
			}
		}, 1000);
	}

	function pauseCountdown() {
		timerPaused = true;
		clearInterval(intervalId);
	}
	function resetCountdown() {
		clearInterval(intervalId);
		timerPaused = false;
		timerHasStarted = false;
		timeLeft = timeInSeconds;
	}
</script>

<div class="flex flex-row w-full justify-between">
	<div class="flex flex-col justify-center items-center grow">
		<div class="text-7xl">{convertTimeToString(timeLeft)}</div>
		<button on:click={resetCountdown}><ArrowPath /></button>
	</div>
	<div class="flex flex-col w-24">
		<button
			class="btn btn-success btn-md"
			on:click={() => {
				if (timerHasStarted) {
					timeLeft += intervalTime;
				}
				timeInSeconds += intervalTime;
			}}><Plus /></button
		>
		{#if timerPaused || !timerHasStarted || timerHasEnded}
			<button class="btn btn-primary btn-md mt-1" on:click={startCountdown}>
				<Play />
			</button>
		{:else}
			<button class="btn btn-primary btn-md mt-1" on:click={pauseCountdown}>
				<Pause />
			</button>
		{/if}
		<button
			class="btn btn-error btn-md mt-1"
			on:click={() => {
				if (timerHasStarted) {
					timeLeft -= intervalTime;
				}
				timeInSeconds -= intervalTime;
			}}><Minus /></button
		>
	</div>
</div>
