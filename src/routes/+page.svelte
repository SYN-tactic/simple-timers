<script lang="ts">
	import Timer from '$lib/components/Timer.svelte';
	import { browser } from '$app/environment';
	import type { CreateTimerType, TimerType } from '$lib/types';

	export let data;
	let intervalTime = 30; // 1 minute - the time to add or subtract from the timer

	let localTimers = data.timers;
	let TimerRefTracker = [];

	function generateUniqueId() {
		return Math.random().toString(36).slice(2, 9);
	}

	function saveToLocalStorage() {
		if (browser) localStorage.setItem('timers', JSON.stringify(localTimers));
	}

	function createTimer({ timeInSeconds, timerName }: CreateTimerType) {
		const uniqueId = generateUniqueId();
		localTimers = [
			...localTimers,
			{
				timerLengthInSeconds: 0,
				timerName: '',
				timerId: uniqueId
			}
		];
		console.log('localtimers after create', localTimers);
		// Save localTimers to local storage
		saveToLocalStorage();
	}

	function saveTimer(timerId: string, timeInSeconds: number) {
		console.log('saveTimer', timerId, timeInSeconds, localTimers);
		const timerIndex = localTimers.findIndex((timer) => timer.timerId === timerId);
		if (timerIndex === -1) {
			// timer has not been saved before
			console.log('Timer Not Found!', timerId, timeInSeconds);
			return;
		}
		console.log('localtimers before save', localTimers);
		localTimers[timerIndex] = {
			...localTimers[timerIndex],
			timerLengthInSeconds: timeInSeconds
		};
		console.log('localtimers after save', localTimers);
		// Save localTimers to local storage
		saveToLocalStorage();
	}

	function deleteTimer(timerId: string) {
		localTimers = localTimers.filter((timer) => timer.timerId !== timerId);
		// Save localTimers to local storage
		saveToLocalStorage();
	}

	function timerEnded(timerId: string) {
		console.log('timerEnded', timerId);
	}
</script>

<h1 class="text-2xl text-center">Simple Timer(s)</h1>

<Timer
	{intervalTime}
	{deleteTimer}
	timerIndex={0}
	{timerEnded}
	{saveTimer}
	timerId={'blah-Default'}
	initialTimeInSeconds={3}
/>

{#each localTimers as timer, i}
	<div class="divider" />
	<Timer
		{intervalTime}
		timerIndex={i}
		{timerEnded}
		{saveTimer}
		{deleteTimer}
		timerId={timer.timerId}
		initialTimeInSeconds={timer.timerLengthInSeconds}
	/>
{/each}

<div class="divider" />
<button
	class="btn btn-primary btn-sm w-full mt-4"
	on:click={() =>
		createTimer({ timeInSeconds: intervalTime, timerName: `Default #${localTimers.length + 1}` })}
	>Stack Timer</button
>
