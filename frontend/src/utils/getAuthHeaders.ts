import { getSessionCookie } from "../contexts/session";
export const getAuthHeaders = () => {
    const token = getSessionCookie();
    // const token = localStorage.getItem('authToken');
    console.log("Using token for API call:", token);
    return {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    };
  };