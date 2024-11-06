# Frontend setup

## Step 01: Instal react using vite

```
npm create vite@latest
```

## Step 02: Now run

```
npm i
```

This will load all nodemodules and create frontend folder structure

### Step 03: To check vite-react project created run

```
npm run dev
```

## Step 04: Installation of tailwind css

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Step 05: Add new file tailwind.config.js file in your project directory. Replace the content object with:

```
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

## Step 06: Add the following lines to your "index.css" file

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```

## Step 07: Update App.js file with this

```
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-3xl underline">Heloo</h1>
    </>
  );
}

export default App;
```

## Step 08: To check vite-react project with tailwind css is created and working correct by running.

```
npm run dev
```

## Now Add shadcn to project

## Step 09: Create jsconfig.json

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## Step 10: Run this

```
npm i -D @types/node
```

## Step 11: Add this to vite.config.js

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```

## Step 12: Run this command

```
npx shadcn@latest init
```

If error occured re-run above command again or clear the cookie using

```
npm cache clean --force
```

## Step 13: Add Button Component from shadcn

```
npx shadcn@latest add button
```

## 14: Add this to App.jsx

```
import "./App.css";
import { Button } from "@/components/ui/button"

function App() {
return (
<>
<h1 className="text-3xl underline">Heloo</h1>
<Button>Click me</Button>
</>
);
}

export default App;

```

## Step 15: Run app again

```
npm run dev
```
