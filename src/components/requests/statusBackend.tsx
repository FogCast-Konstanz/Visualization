import axios from "axios";
import { PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { API_SERVER_BASE_URL, formatGermanDate } from "./helpers";

export async function fetchServerStatus(): Promise<'running' | 'down' | 'unreachable'> {
    try {
        const response = await axios.get(`${API_SERVER_BASE_URL}/cronjob-status`, {
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
        throw error;        
    }
};