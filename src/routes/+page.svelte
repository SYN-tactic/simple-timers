<script lang="ts">
	import Timer from '$lib/components/Timer.svelte';

	let timers = {};
	let intervalTime = 60; // 1 minute - the time to add or subtract from the timer

	function generateUniqueId() {
		return Math.random().toString(36).slice(2, 9);
	}

	function createTimer() {
		const uniqueId = generateUniqueId();
		const numberOfTimers = Object.keys(timers).length;
		const order = numberOfTimers + 1;
		timers = {
			...timers,
			[order]: {
				timerLengthInSeconds: 0,
				timerName: '',
				timerId: uniqueId,
				order: numberOfTimers + 1
			}
		};
	}
</script>

<h1 class="text-2xl text-center">Simple Timer</h1>

<Timer {intervalTime} />

<div class="divider" />
<button class="btn btn-primary btn-sm w-full mt-4" on:click={createTimer}>Add Timer</button>
