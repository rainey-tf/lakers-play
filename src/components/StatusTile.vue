<template>
  <v-chip variant="flat" class="bg-secondary ma-2" size="x-large">
    {{ status }}
  </v-chip>
  <v-chip v-if="!gameIsToday" variant="flat" class="bg-primary ma-2" size="x-large">
    {{ readableDateAndTime }}
  </v-chip>
  <div v-if="gameIsToday && nextGame.period >= 1" class="ma-2 d-flex align-center justify-space-around">
    <div class="text-center">
      <div class="text-h5">
        {{ nextGame.visitor_team.abbreviation }}
      </div>
      <div class="font-weight-bold">
        {{ nextGame.visitor_team_score }}
      </div>
    </div>
    <div class="text-center">
      <div class="text-h5">
        {{ nextGame.home_team.abbreviation }}
      </div>
      <div class="font-weight-bold">
        {{ nextGame.home_team_score }}
      </div>
    </div>
  </div>
  <v-table v-if="gameIsToday">
    <thead>
        <tr>
            <th class="opacity-0">Teams</th>
            <td class="text-center">1</td>
            <td class="text-center">2</td>
            <td class="text-center">3</td>
            <td class="text-center">4</td>
            <td 
              v-for="n in overtimePeriods" 
              :key="n + 4" 
              class="text-center"
            >
              OT{{ n }}
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="font-weight-bold pa-0">{{ nextGame.visitor_team.abbreviation }}</td>
            <td class="text-center pa-0">{{ (nextGame.visitor_q1 === 0 || nextGame.visitor_q1 === '0') ? '-' : (nextGame.visitor_q1 || '-') }}</td>
            <td class="text-center pa-0">{{ (nextGame.visitor_q2 === 0 || nextGame.visitor_q2 === '0') ? '-' : (nextGame.visitor_q2 || '-') }}</td>
            <td class="text-center pa-0">{{ (nextGame.visitor_q3 === 0 || nextGame.visitor_q3 === '0') ? '-' : (nextGame.visitor_q3 || '-') }}</td>
            <td class="text-center pa-0">{{ (nextGame.visitor_q4 === 0 || nextGame.visitor_q4 === '0') ? '-' : (nextGame.visitor_q4 || '-') }}</td>
            <td 
              v-for="n in overtimePeriods" 
              :key="n + 4" 
              class="text-center pa-0"
            >
              {{ getOvertimeScore(nextGame, 'visitor', n) }}
            </td>
        </tr>
        <tr>
            <td class="font-weight-bold pa-0">{{ nextGame.home_team.abbreviation }}</td>
            <td class="text-center pa-0">{{ (nextGame.home_q1 === 0 || nextGame.home_q1 === '0') ? '-' : (nextGame.home_q1 || '-') }}</td>
            <td class="text-center pa-0">{{ (nextGame.home_q2 === 0 || nextGame.home_q2 === '0') ? '-' : (nextGame.home_q2 || '-') }}</td>
            <td class="text-center pa-0">{{ (nextGame.home_q3 === 0 || nextGame.home_q3 === '0') ? '-' : (nextGame.home_q3 || '-') }}</td>
            <td class="text-center pa-0">{{ (nextGame.home_q4 === 0 || nextGame.home_q4 === '0') ? '-' : (nextGame.home_q4 || '-') }}</td>
            <td 
              v-for="n in overtimePeriods" 
              :key="n + 4" 
              class="text-center pa-0"
            >
              {{ getOvertimeScore(nextGame, 'home', n) }}
            </td>
        </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  gameIsToday: {
    type: Boolean,
    required: true
  },
  nextGame: {
    type: Object,
    required: false,
    default: null
  },
});

const overtimePeriods = computed(() => {
  if (!props.nextGame?.period || props.nextGame.period < 5) {
    return 0;
  }
  return props.nextGame.period - 4;
});

const getOvertimeScore = (game, team, overtimeNumber) => {
  const score = game?.[`${team}_ot${overtimeNumber}`];
  return (score === 0 || score === '0') ? '-' : (score || '-');
};

const readableDateAndTime = computed(() => {
  const date = new Date(props.nextGame.status);
  
  // Convert to Eastern Time
  const easternTime = new Date(date.toLocaleString("en-US", { timeZone: "America/New_York" }));
  
  const month = String(easternTime.getMonth() + 1).padStart(2, '0');
  const day = String(easternTime.getDate()).padStart(2, '0');
  const year = easternTime.getFullYear();
  
  let hours = easternTime.getHours();
  const minutes = String(easternTime.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  return `${month}-${day}-${year} @ ${hours}:${minutes} ${ampm} Eastern`;
});


</script>

<style scoped>
</style>