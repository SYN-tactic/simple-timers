<script lang="ts">
	import Timer from '$lib/components/Timer.svelte';
	import { browser } from '$app/environment';
	import type { CreateTimerType } from '$lib/types';
	import Link from '$lib/icons/Link.svelte';

	export let data;
	let intervalTime = 30; // 1 minute - the time to add or subtract from the timer

	let localTimers = data.timers;
	let TimerRefTracker: any[] = [];

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
				timerId: uniqueId,
				linked: true
			}
		];
		// Save localTimers to local storage
		saveToLocalStorage();
	}

	function saveTimer(timerId: string, timeInSeconds: number) {
		const timerIndex = localTimers.findIndex((timer) => timer.timerId === timerId);
		if (timerIndex === -1) {
			// timer has not been saved before
			return;
		}
		localTimers[timerIndex] = {
			...localTimers[timerIndex],
			timerLengthInSeconds: timeInSeconds
		};
		// Save localTimers to local storage
		saveToLocalStorage();
	}

	function saveTimerLinkStatus(timerIndex: number, linked: boolean) {
		if (timerIndex === -1) {
			// timer has not been saved before
			return;
		}
		localTimers[timerIndex] = {
			...localTimers[timerIndex],
			linked
		};
		// Save localTimers to local storage
		saveToLocalStorage();
	}

	function deleteTimer(timerId: string) {
		let filteredTimers = localTimers.filter((timer) => timer.timerId !== timerId);
		localTimers = filteredTimers;
		// Save localTimers to local storage
		saveToLocalStorage();
	}

	function timerEnded(timerId: string) {
		const timerIndex = localTimers.findIndex((timer) => timer.timerId === timerId);
		const timerInfo = localTimers[timerIndex];
		if (timerIndex === -1) {
			// timer has not been saved before
			return;
		}
		if (timerInfo?.linked) {
			const nextTimerIndex = timerIndex + 1;
			if (nextTimerIndex < localTimers.length) {
				// Start the next timer
				TimerRefTracker[nextTimerIndex].startCountdown();
			} else if (nextTimerIndex === localTimers.length) {
				// We are on the last timers, so start the first timer.
				// TODO: maybe have this back track all the way to the first timer?
				TimerRefTracker[0].startCountdown();
			}
		}
	}
</script>

<h1 class="text-2xl text-center">Simple Timer(s)</h1>

{#each localTimers as timer, i (timer.timerId)}
	{#if i > 0}
		<div class="w-full relative">
			<div class="absolute flex flex-row w-full items-center justify-center">
				<button on:click={() => saveTimerLinkStatus(i - 1, !localTimers[i - 1].linked)}
					><Link active={localTimers[i - 1].linked} /></button
				>
			</div>
			<div class="divider" />
		</div>
	{/if}
	<Timer
		bind:this={TimerRefTracker[i]}
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
