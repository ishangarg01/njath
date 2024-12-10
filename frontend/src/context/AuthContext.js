import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [unlockedQuestion, setUnlockedQuestion] = useState(false);

    const authValues = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        unlockedQuestion,
        setUnlockedQuestion
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};
