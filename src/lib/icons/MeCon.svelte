<script>
	import me from '$lib/images/me.png';
	export let href = '';
	export let tooltipText = '';
</script>

<a {href} target="_blank" class="basis-8">
	<button class="tooltip w-12 mt-4" data-tip={tooltipText}>
		<div class="avatar">
			<div class="w-12 rounded-full">
				<img src={me} alt="Austen Goodson" />
			</div>
		</div>
	</button>
</a>
