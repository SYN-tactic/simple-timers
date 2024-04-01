<script lang="ts">
	export let open: boolean = false;
	export let title: string | null = null;
	export let closeAction: () => void;

	let modalElement: any;

	$: if (open) {
		modalElement.showModal();
	} else if (Boolean(modalElement) && !open) {
		modalElement.close();
	}
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog
	bind:this={modalElement}
	class="modal modal-bottom sm:modal-middle"
	on:close={() => {
		closeAction();
	}}
>
	<div class="modal-box">
		{#if title}
			<h3 class="font-bold text-lg">{title}</h3>
		{/if}
		<p class="py-4"><slot /></p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
