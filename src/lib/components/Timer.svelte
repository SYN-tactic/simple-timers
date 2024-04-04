<svelte:options accessors={true} />

<script lang="ts">
	import { Sound } from 'svelte-sound';
	import tonalBeep from '$lib/sounds/tonal_beep.wav';

	import Plus from '$lib/icons/Plus.svelte';
	import Minus from '$lib/icons/Minus.svelte';
	import Play from '$lib/icons/Play.svelte';
	import Pause from '$lib/icons/Pause.svelte';
	import ArrowPath from '$lib/icons/ArrowPath.svelte';
	import Trash from '$lib/icons/Trash.svelte';

	const beepSound = new Sound(tonalBeep);

	// The time in milliseconds to play an alert sounds or flashings
	const alertTime = 3000;

	export let intervalTime = 60; // 1 minute - the time to add or subtract from the timer
	export let timerId: string;
	export let timerIndex: number;
	export let initialTimeInSeconds: number = 0;
	export let saveTimer: (timerId: string, timeInSeconds: number) => void;
	export let deleteTimer: (timerId: string) => void;
	export let timerEnded: (timerId: string) => void;

	function convertTimeToString(timeInSeconds: number) {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	// Attributes of a single timer
	let timeInSeconds = initialTimeInSeconds;
	$: {
		// Only runs if there is a change in timeInSeconds
		saveTimer(timerId, timeInSeconds);
	}
	$: timeLeft = timeInSeconds;
	$: {
		if (timeLeft < 0) timeLeft = 0;
		if (timeInSeconds < 0) timeInSeconds = 0;
	}
	$: timerHasStarted = false;
	$: timerPaused = false;
	$: timerHasEnded = timeLeft === 0 && timerHasStarted;
	let intervalId: ReturnType<typeof setTimeout>;
	$: {
		// Logic to handle the timer ending
		if (timerHasEnded) {
			// Play the alerts
			playAlert();
			// Let the parent component konw that the timer has ended
			timerEnded(timerId);
			// Reset the timer
			resetCountdown();
		}
	}

	// Indicates whether the alert text should be showing or not
	let activeAlertText: boolean = false;
	function playAlert() {
		// Play a sound when the timer ends
		beepSound.play();
		// Set an interval to turn off the sound
		setTimeout(() => {
			beepSound.stop();
		}, alertTime);
		let intervalId = setInterval(() => {
			activeAlertText = !activeAlertText;
		}, 200);
		setTimeout(() => {
			clearInterval(intervalId);
			activeAlertText = false;
		}, alertTime);
	}

	export let startCountdown = () => {
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
	};

	function pauseCountdown() {
		timerPaused = true;
		clearInterval(intervalId);
	}
	export let resetCountdown = () => {
		clearInterval(intervalId);
		timerPaused = false;
		timerHasStarted = false;
		timeLeft = timeInSeconds;
	};
</script>

<div class="flex flex-row w-full justify-between items-center">
	{#if timerIndex !== 0}
		<button on:click={() => deleteTimer(timerId)}><Trash /></button>
	{/if}
	<div class="flex flex-col justify-center items-center grow">
		<div class={`text-7xl ${activeAlertText ? 'text-accent' : ''}`}>
			{convertTimeToString(timeLeft)}
		</div>
		<div class="flex flex-row items-center">
			<div class="badge badge-outline mr-1">{convertTimeToString(timeInSeconds)}</div>
			<button on:click={resetCountdown}><ArrowPath /></button>
		</div>
	</div>
	<div class="flex flex-col w-24">
		<button
			class="btn btn-success btn-md"
			on:click={() => {
				if (timerHasStarted) {
					timeLeft += intervalTime;
				} else {
					timeInSeconds += intervalTime;
				}
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
				} else {
					timeInSeconds -= intervalTime;
				}
			}}><Minus /></button
		>
	</div>
</div>
