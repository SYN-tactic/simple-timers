<script lang="ts">
	import '../app.css';
	import QuestionMarkCircle from '$lib/icons/QuestionMarkCircle.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';
	import Github from '$lib/icons/Github.svelte';
	import LinkedIn from '$lib/icons/LinkedIn.svelte';
	import MeCon from '$lib/icons/MeCon.svelte';
	// Prevent double tapping from zooming in on mobile - thanks copilot!
	var lastTouchEnd = 0;

	let openModal = false;
</script>

<svelte:window />
<div class="p-4 touch-manipulation">
	<slot />
</div>

<button
	class="btn btn-circle btn-primary absolute left-4 bottom-4"
	on:click={() => {
		openModal = !openModal;
	}}
>
	<QuestionMarkCircle />
</button>
<Modal
	title="Just Some Simple Timers"
	open={openModal}
	closeAction={() => {
		openModal = false;
	}}
>
	I hope you find them helpful! If you do run into any issues, check out the <a
		href="https://github.com/SYN-tactic/simple-timers/issues"
		target="_blank"
		class="link link-primary"
		>issues page on GitHub here.
	</a>

	<div class="flex flex-col items-center relative mt-4">
		<span class="text-sm absolute -top-2">👇Look me up at one of these web places👇</span>
		<div class="flex flex-row items-center">
			<div class="mr-1" />
			<Github href="https://github.com/SYN-tactic" tooltipText="My Github" />
			<div class="mr-1" />
			<LinkedIn href="https://www.linkedin.com/in/austengoodson/" tooltipText="My LinkedIn" />
			<div class="mr-1" />
			<MeCon href="https://austengoodson.com" tooltipText="My Website" />
		</div>
	</div>
	<div class="divider" />
	<div class="w-full flex justify-center items-center"><BuyMeACoffee /></div>
</Modal>
