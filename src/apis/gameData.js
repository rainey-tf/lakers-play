import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey: import.meta.env.VITE_BALLDONTLIE_API_KEY });

export const getGameData = async (teamId) => {
    const todaysDateISO = new Date().toLocaleDateString('en-CA');
    try {
        const games = await api.nba.getGames({
            team_ids: [teamId],
            start_date: todaysDateISO,
        });
        return games;
    } catch (error) {
        throw error;
    }
};