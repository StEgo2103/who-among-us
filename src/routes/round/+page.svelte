<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount, onDestroy } from 'svelte';
	import { playersStore, getIndexOfPlayer } from '$lib/stores/players.store';
	import { sheetsStore } from '$lib/stores/sheets.store';

	let players = $playersStore;
	let sheets = $sheetsStore;
	let ctx: CanvasRenderingContext2D | null;
	let canvas: HTMLCanvasElement;
	let nbQuestions = 1;
	let question: string = '';
	let chart: Chart;

	let displayChart = false;

	function getGraphData() {
		let responseQuestions: number[] = Array(players.length).fill(0);
		question = sheets[0][nbQuestions];
		for (let i = 0; i < players.length; i++) {
			const sheet = sheets[i + 1][nbQuestions];
			responseQuestions[getIndexOfPlayer(sheet)] += 1;
		}

		return {
			labels: players.map((player) => player.name),
			datasets: [
				{
					data: responseQuestions,
					backgroundColor: players.map((player) => player.color)
				}
			]
		};
	}

	function updateChart() {
		const newData = getGraphData();
		if (chart) {
			chart.data = newData;
			chart.update();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			if (displayChart === false) {
				displayChart = true;
			} else if (nbQuestions !== sheets[0].length - 1 && displayChart === true) {
				displayChart = false;
				nbQuestions++;
				updateChart();
			}
		} else if (event.key === 'ArrowLeft') {
			if (nbQuestions !== 1) {
				nbQuestions--;
				updateChart();
			}
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Cannot get 2d context');
		}

		chart = new Chart(ctx, {
			type: 'pie',
			data: getGraphData(),
			options: {
				maintainAspectRatio: false
			}
		});

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div class="flex h-full flex-col items-center justify-center space-y-12">
	<h1 class="text-6xl my-20">{question}</h1>
	<div class="flex items-center justify-center h-96 w-full">		
		<div class="chart-container" class:opacity-0={!displayChart}>
			<canvas bind:this={canvas}></canvas>
		</div>
	</div>
</div>

<style>
	:global(body) {
		padding: 0;
	}

	.chart-container {
		position: relative;
		height: 100%;
		width: 100%;
	}
</style>
