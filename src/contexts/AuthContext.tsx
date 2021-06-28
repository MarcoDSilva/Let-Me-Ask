import { createContext, ReactNode, useEffect, useState } from "react"; // used to pass information between all components, usually for global info like logins and so on
import { auth, firebase } from "../services/firebase"; // firebase and google authentications

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType); // while instantiating the context we must pass the specific time

type AuthContextProviderProps = {
  children?: ReactNode; // when the variable is a children and it's coming from a react comp, we define as ReactNode
}


export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => { // to run once when the component is mounted and to update the information if the user is logged in, to save the session
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Username or user photo are missing from google account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }

      return () => { // used to always finish the event listener, preventing possible infinite loops of the listener 
        unsubscribe();
      }
    })
  }, []);

  // login authenthication and validation 
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Username or user photo are missing from google account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}