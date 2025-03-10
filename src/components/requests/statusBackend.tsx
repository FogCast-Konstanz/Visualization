import axios from "axios";
import { PlotlyChartDataFormat } from "../plotly/DataFormat";
import { API_SERVER_BASE_URL, formatGermanDate } from "./helpers";

export async function fetchServerStatus(): Promise<boolean> {
    try {
        const response = await axios.get(`${API_SERVER_BASE_URL}/cronjob-status`, {
            headers: { Accept: "application/json" },
        });

        let data = response.data
        if (data['status'] == 'success') {
            return true
        }

        return false
    } catch (error) {
        console.error("Error fetching forecast:", error);
        return false
        throw error;

        
    }
};