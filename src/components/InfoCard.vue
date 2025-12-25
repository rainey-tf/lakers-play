<template>
    <v-alert
      v-if="alertOpen"
      position="fixed"
      color="secondary"
      height="100px"
      class="ma-auto"
    >
      <div>
        Merry Christmas, Spencer!
      </div>
      <v-btn
        text="Close"
        class="mt-5"
        @click="alertOpen = false"
      ></v-btn>
    </v-alert>
    <v-card v-if="loaded" class="rounded-xl ma-1">
      <template v-if="!error">
        <v-card-title class="text-h1 bg-primary h-50 d-flex flex-column justify-space-around">
            <div class="text-subtitle-1">
              Today is {{ todaysDate }}, and...
            </div>
            {{  heading.main }}
            <div class="text-subtitle-1">
              ... {{ heading.subtext }}
            </div>
        </v-card-title>
        <v-card-text>
            <StatusTile
              :status="status"
              :game-is-today="gameIsToday"
              :next-game="nextGame"
            />
        </v-card-text>
      </template>
      <template v-else>
        <v-card-title class="text-subtitle-1 bg-primary">
          Sorry, there's an issue:
        </v-card-title>
        <v-card-text>
          {{ error }}
        </v-card-text>
      </template>
    </v-card>
    <v-progress-circular
      v-else
      color="primary"
      indeterminate
    ></v-progress-circular>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTeamData } from '../stores/teamData'
import { useGameData } from '../stores/gameData';
import StatusTile from './StatusTile.vue';

const teamDataStore = useTeamData();
const gameDataStore = useGameData();
const { upcomingGames, loaded: gameLoaded, error: gameError } = storeToRefs(gameDataStore);
const { teams, selectedTeam, loaded: teamLoaded, error: teamError } = storeToRefs(teamDataStore);

const alertOpen = ref(false);

const teamName = ref('Lakers');
const loaded = computed(() => {
  return teamLoaded.value && gameLoaded.value;
});
const todaysDate = computed(() => new Date().toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}));
const todaysDateISO = computed(() => new Date().toLocaleDateString('en-CA'));
const error = computed(() => {
  return teamError.value || gameError.value || null;
});

// Call getGameData action when component is mounted
onMounted(async () => {
  // Check if today is December 25th
  const today = new Date();
  if (today.getMonth() === 11 && today.getDate() === 25) {
    alertOpen.value = true;
  }
  
  await teamDataStore.loadTeamData();
  selectedTeam.value = teams.value.find(team => team.name === teamName.value);
  await gameDataStore.loadGameData(selectedTeam?.value?.id);
}); 

const gameIsToday = computed(() => {
  if (!upcomingGames.value) return false;
  return upcomingGames.value.some((game) => game.date === todaysDateISO.value);
});

const nextGame = computed(() => {
  if (!upcomingGames.value) return null;
  return upcomingGames.value[0];
});

const status = computed(() => {
  if (gameIsToday.value) {
    if (nextGame.value.time) {
      return `${nextGame.value.time}`;
    } else {
      const gameTime = new Date(nextGame.value.status).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/New_York'
      });
      return `${gameTime} Eastern`;
    }
  } else {
    return `Next game: ${nextGame.value.visitor_team.abbreviation} @ ${nextGame.value.home_team.abbreviation}`
  }
});

const heading = computed(() => {
  return gameIsToday.value ? {
    main: 'Yes',
    subtext: `The ${teamName.value} play today.`
  } : {
    main: 'No',
    subtext: `The ${teamName.value} do not play today.`
  };
});

</script>

<style scoped>
    .v-card {
        height: calc(100vh - 40px);
        max-height: 800px;
        min-height: 600px;
        width: calc(100vw - 40px);
        max-width: 400px;
    }

    .v-alert {
      z-index: 1;
      top: 120px;
      left: 0;
      right: 0;
      width: calc(100vw - 60px);
      max-width: 380px;
    }
</style>