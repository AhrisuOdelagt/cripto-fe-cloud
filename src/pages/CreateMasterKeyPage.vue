<template>
  <v-container class="create-key-container">
    <v-form @submit.prevent="addPersonToTeam">
      <div class="create-key_text">Equipo # {{ teamNumber }} - {{ teamName }}</div>
      <v-text-field v-model="user" label="Usuario a agregar al equipo"></v-text-field>
      <div v-show="isAddUserVisible">Se ha agregado correctamente el usuario {{ user }} al equipo</div>

      <div class="create-key-container__buttons">
        <v-btn @click="addPersonToTeam" color="primary">Añadir Usuario</v-btn>
        <v-btn
          @click="generateMasterKey"
          :color="generateKeyButtonColor"
          :style="{ cursor: generateKeyCursorStyle }"
          :disabled="generateKeyButtonColor !== 'secondary'">
          Generar Llave Maestra
        </v-btn>
        <v-btn @click="cancel" color="red">Cancelar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "CreateMasterKeyPage",
  data() {
    return {
      user: '',
      isAddUserVisible: false,
      generateKeyButtonColor: 'grey',
      generateKeyCursorStyle: 'default'
    };
  },
  props: ['teamNumber', 'teamName'],
  methods: {
    addPersonToTeam() {
      this.isAddUserVisible = true;
      this.generateKeyButtonColor = 'secondary';
      this.generateKeyCursorStyle = 'pointer';
    },
    generateMasterKey() {
      this.$router.push({ name: 'descargar' });
    },
    cancel() {
      this.$router.push({ name: 'seleccionar-equipo' });
    }
  }
}

</script>


<style scoped lang="scss">
@import "@/styles/mixins";


.create-key-container {
  @include laptop {
    max-width: 50%;
    margin: auto;
  }
}

.create-key-container__buttons {
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

.create-key_text{
  text-align: center;
  font-size: 2em;
  padding-bottom: 1em;
}
</style>

