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
            } catch {
                this.error = "Error Loading Game Data";
            } finally {
                this.loaded = true
            }
        },
        reset() {
            this.$reset();
        },
    },
})