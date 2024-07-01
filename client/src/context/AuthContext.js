// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (user) => {
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
