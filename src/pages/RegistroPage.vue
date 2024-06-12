<template>
  <v-container class="register-container">
    <v-form @submit.prevent="submitForm">
      <div class="register_text">Registrarse</div>
      <v-text-field v-model="username" label="Nombre de usuario"></v-text-field>
      <v-text-field v-model="email" label="Correo" type="email"></v-text-field>
      <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>

      <div class="register-container__buttons">
        <v-btn @click="register" color="primary">Registrarse</v-btn>
        <v-btn @click="cancel" color="red">Cancelar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      console.log('Iniciar sesión con:', this.username, this.password);
    },
    register() {
      console.log('Registro con...', this.username, this.email, this.password);
      this.$router.push({ name: 'iniciar-sesion' });
    },
    cancel() {
      this.$router.push({ name: 'iniciar-sesion' });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/mixins";


.register-container {
  @include laptop {
    max-width: 50%;
    margin: auto;
  }
}

.register-container__buttons {
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

.register_text{
  text-align: center;
  font-size: 2em;
  padding-bottom: 1em;
}
</style>
