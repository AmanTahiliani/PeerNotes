import React from "react";

type SessionContextType = string | undefined;

export const getSessionCookie = () => {
    const sessionCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
    return sessionCookie;
}
export const destroySessionCookie = () => {
    document.cookie = "token=; Max-Age=0;"
}

export const SessionContext = React.createContext<SessionContextType>(getSessionCookie());

