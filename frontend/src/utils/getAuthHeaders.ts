import { getSessionCookie } from "../contexts/session";
export const getAuthHeaders = () => {
  const token = getSessionCookie();
  console.log(token);
    return {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    };
  };