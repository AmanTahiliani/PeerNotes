import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/session";

export const useSessionRedirect = () => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  // Redirect to home if session is defined
  useEffect(() => {
    if (session !== undefined) {
        navigate('/');
    }
  }, [session, navigate])
}