<template>
  <v-container class="create-key-container">
    <v-form>
      <div class="create-key_text">Equipo: {{ teamName }}</div>
      <v-text-field v-model="username" label="Usuario a agregar al equipo"></v-text-field>

      <v-alert v-show="isAlertVisible" :type="messageAlertType" dismissible>{{ messageAlertText }}</v-alert>

      <div class="create-key-container__buttons">
        <v-btn @click="addPersonToTeam" color="primary">Añadir Usuario</v-btn>
        <v-btn @click="cancel" color="red">Cancelar</v-btn>
      </div>

      <hr class="hr_css">

      <div class="create-key-container__buttons">
        <v-text-field v-model="password" label="Contraseña del equipo"></v-text-field>
        <v-btn
          @click="generateFragments"
          :color="generateKeyButtonColor"
          :style="{ cursor: generateKeyCursorStyle }"
          :disabled="isBtnGenerateDisabled">
          Generar Llave Maestra
        </v-btn>
        <v-btn @click="redirectToFilesPage" color="primary">Acceder a los Archivos</v-btn>
      </div>

      <v-alert v-show="isAlertVisible2" :type="messageAlertType2" dismissible>{{ messageAlertText2 }}</v-alert>

    </v-form>
  </v-container>
</template>

<script>
import localforage from "localforage";
import axios from "axios";

export default {
  name: "CreateMasterKeyPage",
  data() {
    return {
      username: '',
      password: '',
      isAddUserVisible: false,
      isBtnGenerateDisabled: true,
      generateKeyButtonColor: 'grey',
      generateKeyCursorStyle: 'default',
      isAlertVisible: false,
      messageAlertText: "",
      messageAlertType: "error",
      isAlertVisible2: false,
      messageAlertText2: "",
      messageAlertType2: "error",
    };
  },
  props: ['teamName', 'user'],
  watch: {
    password(newPassword) {
      if (newPassword !== "") {
        this.isBtnGenerateDisabled = false;
        this.generateKeyButtonColor = 'secondary';
        this.generateKeyCursorStyle = 'pointer';
      } else {
        this.isBtnGenerateDisabled = true;
        this.generateKeyButtonColor = 'grey';
        this.generateKeyCursorStyle = 'default';
      }
    },
  },
  methods: {
    async addPersonToTeam() {
      try {
        const responseAddPerson = await this.addPersonTeamPost();
        this.isAddUserVisible = true;
        this.generateKeyButtonColor = 'secondary';
        this.generateKeyCursorStyle = 'pointer';
        this.messageAlertType = "success";
        this.messageAlertText = responseAddPerson.data.message;
      } catch (error) {
        if (error.response.status === 400) {
          this.messageAlertType = "warning";
          this.messageAlertText = error.response.data.error;
        } else if (error.response.status === 404 || error.response.status === 403) {
          this.messageAlertType = "error";
          this.messageAlertText = error.response.data.error;
        } else {
          console.log(error.response.status)
          this.messageAlertType = "error";
          this.messageAlertText = "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.";
        }
      } finally {
        this.isAlertVisible = true;
      }
    },
    async generateFragments() {
      try {
        const responseAddPerson = await this.generateFragmentPost();
        this.isAddUserVisible = true;
        this.generateKeyButtonColor = 'secondary';
        this.generateKeyCursorStyle = 'pointer';
        this.messageAlertType2 = "success";
        this.messageAlertText2 = responseAddPerson.data.message;
      } catch (error) {
        if (error.response.status === 400) {
          this.messageAlertType2 = "warning";
          this.messageAlertText2 = error.response.data.error;
        } else if (error.response.status === 404) {
          this.messageAlertType2 = "error";
          this.messageAlertText2 = error.response.data.error;
        } else {
          console.log(error.response.status)
          this.messageAlertType2 = "error";
          this.messageAlertText2 = "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.";
        }
      } finally {
        this.isAlertVisible2 = true;
      }
    },
    redirectToFilesPage() {
      this.$router.push({ name: 'descargar', params: { teamName: this.teamName, user: this.user} });
    },
    cancel() {
      this.$router.push({ name: 'seleccionar-equipo' });
    },
    async addPersonTeamPost() {
      const data = {
        team_name: this.teamName,
        username: this.username,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${await localforage.getItem('authToken')}`,
        },
      };

      return await axios.post('http://localhost:5000/equipos/agregar', data, config);

    },
    async generateFragmentPost() {
      const data = {
        team_name: this.teamName,
        team_password: this.password,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${await localforage.getItem('authToken')}`,
        },
      };

      return await axios.post('http://localhost:5000/equipos/generar_fragmentos', data, config);

    },
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

.hr_css {
  margin-top: 3em;
}
</style>

