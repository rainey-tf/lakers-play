import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey: import.meta.env.VITE_BALLDONTLIE_API_KEY });

export const getTeamData = async () => {
    try {
        // Try different parameter formats - the API might expect singular names
        const teams = await api.nba.getTeams();
        return teams;
    } catch (error) {
        throw error;
    }
};