import { createContext, useContext, useState } from "react";
import { User } from "../api/User";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (user) => {
        try {
            const response = await User.login(user);
            console.log(response.data);
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            
        }
    };

    const logout = () => {
        setUser(null);
    };
    return (
        <AuthContext.Provider 
        value={{
            login,
            user,
            isAuthenticated,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
