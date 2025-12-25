import { defineStore } from 'pinia'
import { getGameData } from '../apis/gameData'

export const useGameData = defineStore('gameData', {
    state: () => ({
        loaded: false,
        error: null,
        upcomingGames: [],
    }),
    getters: {

    },
    actions: {
        async loadGameData(teamId) {
            try {
                this.loaded = false
                const { data } = await getGameData(teamId);
                this.upcomingGames = data;
            } catch (error) {
                if (error.status === 429) {
                    this.error = "We requested data too many times. Wait a minute and then try again.";
                }
                else {
                    this.error = "Error Loading Game Data";
                }
            } finally {
                this.loaded = true
            }
        },
        reset() {
            this.$reset();
        },
    },
})