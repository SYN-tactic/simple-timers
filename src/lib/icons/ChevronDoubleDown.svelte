<script>
	import IconWrapper from './IconWrapper.svelte';
	export let active = true;
</script>

<IconWrapper>
	<div class="relative">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class={`w-6 h-6 ${active ? 'stroke-primary' : ''}`}
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
			/>
		</svg>
	</div>
</IconWrapper>
