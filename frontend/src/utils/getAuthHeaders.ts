import { getSessionCookie } from "../contexts/session";
export const getAuthHeaders = () => {
    const token = getSessionCookie();
    return {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    };
  };