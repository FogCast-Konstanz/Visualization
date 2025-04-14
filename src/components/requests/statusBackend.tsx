import axios from "axios";

export async function fetchServerStatus(): Promise<'running' | 'down' | 'unreachable'> {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/cronjob-status`, {
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