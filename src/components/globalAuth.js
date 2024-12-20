import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [currentUser,setCurrentUSer]=useState(null)
    const [loading,setLoading]=useState(true)


    useEffect(()=>{
        const newSubscribe=onAuthStateChanged(auth,(user)=>{
            setCurrentUSer(user)
            setLoading(false)
        })

        return()=> newSubscribe()
    },[])


    const value={
        currentUser
    }


    return (
        <AuthContext.Provider value={value}>
          {!loading && children} {/* Render children only when loading is done */}
        </AuthContext.Provider>
      );
}

export const useAuth = () => {
    return useContext(AuthContext);
  };

