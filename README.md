# Who Among Us

Little project in Svelte to display a XLSX file with charts with the reponse of the game Who Among Us.

## Starting

Go to [https://who-among-us.deltort.net](https://who-among-us.deltort.net) to use the website online.

## Starting in local

### Installing dependencies:

```bash
npm install
```

### Starting the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## How to use

- Import XLSX file from a Google Form
- Choose a color for each player (optional)
- Press "Commencer"
- The app will display the question
- Press the right arrow key to advance
- Press the left arrow key to go back

## Technologies

- Svelte
- SvelteKit
- Tailwind CSS
- Charts.js
- Netlify