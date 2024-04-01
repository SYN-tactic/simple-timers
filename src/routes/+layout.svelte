<script lang="ts">
	import '../app.css';
	import QuestionMarkCircle from '$lib/icons/QuestionMarkCircle.svelte';
	import Modal from '$lib/components/Modal.svelte';
	// Prevent double tapping from zooming in on mobile - thanks copilot!
	var lastTouchEnd = 0;

	function handleTouchEnd(event: any) {
		var now = new Date().getTime();
		if (now - lastTouchEnd <= 300) {
			event.preventDefault();
		}
		lastTouchEnd = now;
	}
	let openModal = false;
</script>

<svelte:window on:touchend={handleTouchEnd} />
<div class="p-4">
	<slot />
</div>

<button
	class="btn btn-circle btn-primary absolute left-4 bottom-4"
	on:click={() => {
		console.log('clicking open', openModal);
		openModal = !openModal;
	}}
>
	<QuestionMarkCircle />
</button>
<Modal
	title="It's just Simple Timers"
	open={openModal}
	closeAction={() => {
		openModal = false;
	}}
>
	I hope you find them helpful! If you do have any questions, check out the issues page on GitHub <a
		href=""
		target="_blank">here</a
	>.
</Modal>
