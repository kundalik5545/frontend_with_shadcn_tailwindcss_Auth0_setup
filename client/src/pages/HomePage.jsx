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
