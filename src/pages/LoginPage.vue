<template>
  <v-container class="login-container">
    <v-form @submit.prevent="submitForm">
      <div class="login_text">Iniciar Sesión</div>
      <v-text-field v-model="username" label="Nombre de usuario"></v-text-field>
      <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>

      <div class="login-container__buttons">
        <v-btn type="submit" color="primary">Iniciar Sesión</v-btn>
        <v-btn @click="register" color="secondary">Registrarse</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      console.log('Iniciar sesión con:', this.username, this.password);
      this.$router.push({ name: 'seleccionar-equipo' });
    },
    register() {
      this.$router.push({ name: 'registro' });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/mixins";


.login-container {
  @include laptop {
    max-width: 50%;
    margin: auto;
  }
}

.login-container__buttons {
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

.login_text{
  text-align: center;
  font-size: 2em;
  padding-bottom: 1em;
}
</style>
