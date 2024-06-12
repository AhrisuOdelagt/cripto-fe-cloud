<template>
  <v-container class="team_container">
    <div class="team_text">Tus Equipos</div>
    <div class="team_cards">
      <CardTeam team-number="1" team-name="Fisica" @click="team"></CardTeam>
      <CardTeam team-number="2" team-name="Matematicas"></CardTeam>
      <CardTeam team-number="3" team-name="Quimica"></CardTeam>
    </div>
    <div class="team-container__buttons">
      <v-btn @click="createTeam" color="primary">Crear Equipo</v-btn>
      <v-btn @click="closeSesion" color="red">Cerrar Sesión</v-btn>
    </div>
  </v-container>
</template>

<script>
import CardTeam from "@/components/CardTeam.vue";

export default {
  name: "SelectionTeamPage",
  components: { CardTeam },
  methods: {
    createTeam() {
      this.$router.push({ name: 'crear-equipo' });
    },
    closeSesion() {
      this.$router.push({ name: 'iniciar-sesion' });
    },
    team() {
      this.$router.push({ name: 'team', params: { teamNumber: "1", teamName: "Fisica" } });
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";

.team_container {
  text-align: center;
  @include laptop {
    max-width: 50%;
    margin: auto;
  }
}

.team_text {
  font-size: 2em;
  padding-bottom: 1em;
}

.team_cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2em;

  @include laptop {
    grid-template-columns: repeat(3, 1fr);
    gap: 5em;
  }
}

.team-container__buttons {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5em;
  padding-top: 2em;

  @include laptop {
    gap: 3em;
    flex-direction: row;
    padding-top: 5em;
  }
}
</style>
