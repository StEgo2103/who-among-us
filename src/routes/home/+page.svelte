<script lang="ts">
	import * as XLSX from 'xlsx';
	import { playersStore, setPlayers } from '$lib/stores/players.store';
	import { sheetsStore, setSheets } from '$lib/stores/sheets.store';

	import Title from '$lib/components/Title.svelte';
	import type { Player } from '$lib/interfaces/player.interface';

	let players: Player[] = [];

	const handleFile = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;
		const file = target.files[0];

		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			const arrayBuffer = e.target?.result;
			if (!arrayBuffer) return;

			const workbook = XLSX.read(arrayBuffer, { type: 'array' });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];

			const sheetData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
			setSheets(sheetData);

			players = [];
			for (let i = 1; i < sheetData.length; i++) {
				const row = sheetData[i];
				if (row && row[1] !== undefined) {
					const randomColor =
						'#' +
						Math.floor(Math.random() * 16777215)
							.toString(16)
							.padStart(6, '0');
					players.push({ name: row[1], color: randomColor });
				}
			}
			setPlayers(players);
		};

		reader.readAsArrayBuffer(file);
	};

	const updateColor = (event: Event, name: String) => {
		const target = event.target as HTMLInputElement;
		players = players.map((player) => {
			if (player.name === name) {
				player.color = target.value;
			}
			return player;
		});
	};
</script>

<div class="flex h-screen flex-col items-center justify-center px-12">
	<div class="flex w-full justify-center py-6">
		<Title fontSize="text-4xl" />
	</div>
	<div class="bg-blue/40 h-1 w-full rounded-full"></div>
	<div class="flex h-full w-full justify-between">
		<div class="flex w-1/2 flex-col items-start justify-center space-y-5">
			<span>Insérer le fichier Excel</span>
			<input
				type="file"
				id="file"
				name="file"
				accept=".xlsx,.xls"
				class="hover:border-blue w-2/3 rounded-lg border p-2 transition-all hover:border-b-4"
				on:change={handleFile}
			/>
		</div>
		<div class="flex w-1/2 flex-col items-start justify-center space-y-5">
			{#if players.length}
				<ol class="w-2/3 list-disc">
					{#each players as player}
						<li class="p-2">
							<div class="flex">
								<span class="w-1/2">{player.name}</span>
								<input
									type="color"
									value={player.color}
									on:change={(event) => updateColor(event, player.name)}
									class="w-1/2"
								/>
							</div>
						</li>
					{/each}
				</ol>
				<a href="/round">
					<button class="bg-blue hover:bg-blue/80 mt-5 rounded-lg p-2 text-white transition-all"
						>Commencer</button
					>
				</a>
			{/if}
		</div>
	</div>
</div>
