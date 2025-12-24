import { defineStore } from 'pinia';
import { getTeamData } from '../apis/teamData';

export const useTeamData = defineStore('teamData', {
    state: () => ({
        loaded: false,
        error: null,
        teams: [],
        selectedTeam: null,
    }),
    actions: {
        async loadTeamData() {
            try {
                this.loaded = false
                const { data } = await getTeamData();
                this.teams = data;
            } catch {
                this.error = "Error Loading Team Data";
            } finally {
                this.loaded = true
            }
        },
        reset() {
            this.$reset();
        },
    },
});