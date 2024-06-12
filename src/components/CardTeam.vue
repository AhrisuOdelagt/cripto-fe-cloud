<template>
  <div class="card-team_container">
    <div>Equipo #{{ teamNumber }}</div>
    <div>{{ teamName }}</div>
  </div>
</template>

<script>
export default {
  name: "CardTeam",
  props: {
    teamNumber: {
      type: Number,
      default: 0,
      required: true
    },
    teamName: {
      type: String,
      default: "",
      required: true
    },
  }
}
</script>

<style scoped lang="scss">
.card-team_container {
  cursor: pointer;
  padding: 20%;
  color: white;
  background-color: orangered;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
