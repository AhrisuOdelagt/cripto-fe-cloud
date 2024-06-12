<template>
  <v-container class="create-team-container">
    <v-form @submit.prevent="createTeam">
      <div class="create-team_text">Crear Nuevo Equipo</div>
      <v-text-field v-model="name" label="Nombre del equipo"></v-text-field>
      <v-text-field v-model="description" label="Description del equipo"></v-text-field>
      <v-text-field v-model="password" label="Contraseña del equipo" type="password"></v-text-field>

      <div class="create-team-container__buttons">
        <v-btn @click="createTeam" color="primary">Crear</v-btn>
        <v-btn @click="cancel" color="red">Cancelar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      password: ''
    };
  },
  methods: {
    createTeam() {
      console.log('Creando equipo...', this.name, this.description, this.password);
      this.$router.push({ name: 'seleccionar-equipo' });
    },
    cancel() {
      this.$router.push({ name: 'seleccionar-equipo' });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/mixins";


.create-team-container {
  @include laptop {
    max-width: 50%;
    margin: auto;
  }
}

.create-team-container__buttons {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5em;
  padding-top: 2em;

  @include laptop {
    gap: 3em;
    flex-direction: row;
  }
}

.create-team_text{
  text-align: center;
  font-size: 2em;
  padding-bottom: 1em;
}
</style>
