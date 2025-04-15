import axios from "axios";
import { BACKEND_URL } from "../constants";

export async function fetchServerStatus(): Promise<'running' | 'down' | 'unreachable'> {
    try {
        const response = await axios.get(`${BACKEND_URL}/cronjob/status`, {
            headers: { Accept: "application/json" },
        });

        let data = response.data
        if (data['status'] == 'success') {
            return 'running'
        }

        return 'down'
    } catch (error) {
        console.error("Error fetching forecast:", error);
        return 'unreachable'    
    }
};