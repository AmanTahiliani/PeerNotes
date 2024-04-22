import { useEffect } from "react"
import { getAuthHeaders } from "../utils/getAuthHeaders"
export const usePoll = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        pollServer()
        .catch((error) => {
          console.error('Error:', error);
        });
      }, 30 * 60000) // poll every 30 minutes  
      return () => {
        // clean up
        clearInterval(interval);
      };
    }, [])

    const pollServer = async () => {
        // request private ip from local api
      return fetch('http://localhost:8080/ip')
        .then(response => response.text())
        .then((data) => {
          // send private ip to central server
          return fetch('http://localhost:8000/api/poll/', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ip: data}),
          })
        }).then(response => response.json())
        .then(data => {
          console.log("Poll response data:", data);
        })
    }
}