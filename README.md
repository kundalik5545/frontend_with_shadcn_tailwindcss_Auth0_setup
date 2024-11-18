# Frontend setup with Shadcn TailwindCss Vite

## Instal react using vite

```
npm create vite@latest
```

## Now run

```
npm i
```

This will load all node modules and create frontend folder structure

## To check vite-react project created run

```
npm run dev
```

## Installation of tailwind css

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Add below to tailwind.config.js.

```
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

## Add below to index.css file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```

## Update App.js file with this

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

## Check vite-react project with tailwind Css is running.

```
npm run dev
```

## Now Add shadcn to project

## Create new file jsconfig.json

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

## Run this

```
npm i -D @types/node
```

## Add this to vite.config.js

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

## Run this command

```
npx shadcn@latest init
```

If error occured re-run above command again or clear the cookie using.

```
npm cache clean --force
```

Select options correctly shown during installation.

## Add Button Component from shadcn

```
npx shadcn@latest add button
```

## Add this to App.jsx

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

## Run app again

```
npm run dev
```

## Now setup App.jsx for routing

```
npm i react-router-dom
```

## Add this to App.jsx to handle routing

```
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { Button } from "@/components/ui/button"
//Navbar page
//import NavbarMain from "./components/Navbar/NavbarMain";
// Basic Pages
import HomePage from "./pages/HomePage";

function App() {
return (
<>
  <Router>
    //<NavbarMain />
    <Routes>
        <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
</>
);
}

export default App;

```

## Now add these packages as required

```
npm i dotenv react-hot-toast axios
```

# Now handle authorisation using Auth0

## Create .env file under main project

```
VITE_WEBSITE_domain="dev-jk_*_.us.auth0.com"
VITE_WEBSITE_clientId="lO_*_dR_*_GNcRc_*_hf"
```

## Now run this

```
npm install @auth0/auth0-react
```

## Now inside main.jsx add this to activate Auth0

```
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_WEBSITE_domain}
      clientId={import.meta.env.VITE_WEBSITE_clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
```

## Now inside app.jsx add this to activate Auth0

```
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//Navbar page
// import NavbarMain from "./components/Navbar/NavbarMain";
// Basic Pages
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        {/* <NavbarMain /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
```

## Now create pages folder with HomePage.jsx & use rfce

```
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

function HomePage() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("Current user", user);
  return (
    <div className="p-4 m-4">
      <h1 className="text-blue-700 font-bold text-2xl p-2">HomePage</h1>
      <div className="">
        {isAuthenticated && (
          <>
            <span>{user.name}</span>
          </>
        )}
        {isAuthenticated ? (
          <Button onClick={(e) => logout()}>Logout</Button>
        ) : (
          <Button onClick={(e) => loginWithRedirect()}>
            Login with redirect
          </Button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
```

## Now add react-hot-toast to package.json but we already did.

```
npm i react-hot-toast
```

## Now add import below to App.jsx

```
//Extra plugin
import { Toaster } from "react-hot-toast";
```

## Now add this to App.jsx

```
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//Navbar page
// import NavbarMain from "./components/Navbar/NavbarMain";
// Basic Pages
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
    <main>
      <Router>
        {/* <NavbarMain /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </main>
        <Toaster position="top-right" />
      <Footer />

  );
}

export default App;
```

## Creadted hooks folder and written my own toast lib

```
"use client";
// Inspired by react-hot-toast library
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString();
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
}

const listeners = []

let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function toast({
  ...props
}) {
  const id = genId()

  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    };
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast }
```

## More....
