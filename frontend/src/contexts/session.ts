import React from "react";

type SessionContextType = string | null;

export const getSessionCookie = () => {
    // const sessionCookie = document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('token='))
    //     ?.split('=')[1];
    const sessionCookie = localStorage.getItem('authToken');
    return sessionCookie;
}
export const destroySessionCookie = () => {
    console.log("destroying session cookie");
    localStorage.removeItem('authToken');
    // document.cookie = "token=; Max-Age=0;"
}

export const SessionContext = React.createContext<SessionContextType>(getSessionCookie());

