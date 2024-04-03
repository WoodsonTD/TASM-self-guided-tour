// src/components/AuthComponent.js
import { useEffect } from 'react';
import { auth } from "./src/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthComponent = () => {
    const handleSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User signed in successfully
                const {user} = userCredential;
                console.log("User signed in:", user);
                // Redirect to the dashboard or perform other actions
            })
            .catch((error) => {
                // Handle errors
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Sign-in error:", errorCode, errorMessage);
                // Display an error message to the user
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // User signed out successfully
                console.log("User signed out");
                // Redirect to the login page or perform other actions
            })
            .catch((error) => {
                // Handle errors
                console.error("Sign-out error:", error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log("User is signed in:", user);
                // Show the dashboard or perform other actions
            } else {
                // User is signed out
                console.log("User is signed out");
                // Redirect to the login page or perform other actions
            }
        });

        // Clean up the subscription on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {/* Render your component's JSX */}
            <button onClick={() => handleSignIn("user@example.com", "password")}>
                Sign In
            </button>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default AuthComponent;
