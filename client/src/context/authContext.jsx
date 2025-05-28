import { useUser } from "@clerk/react-router";
import { createContext, useMemo } from "react";

export const authContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const { isSignedIn, user } = useUser();

  const currentUser = useMemo(() => {
    //If not logged in return null
    if (!isSignedIn) return null;
    //If logged in, return user details
    return {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress || "",
      profilePicture: user.imageUrl,
    };
  }, [isSignedIn, user]);

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  )
};
