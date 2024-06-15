<template>
  <v-container class="create-key-container">
    <v-form @submit.prevent="validateFragment">
      <div class="create-key_text">Descargar | {{teamName}}</div>

      <div class="download-validate_container">
        <div v-for="(member, index) in members" :key="index">
          <div>{{ member }}</div>
          <div :class="fragments.includes(member) ? 'download-validate_box_correct' : 'download-validate_box'"></div>
        </div>
      </div>

      <div class="download-keys_buttons">
        <v-btn @click="downloadFragment">Descargar Fragmento</v-btn>
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">Subir Fragmento</v-btn>
          </template>
          <v-list>
            <v-list-item @click="selectFile">
              <v-list-item-title>Archivo .pem</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-alert v-show="isAlertVisible" :type="messageAlertType" dismissible>{{ messageAlertText }}</v-alert>

      <div class="create-key-container__buttons">
        <div class="text-center">
          <v-menu open-on-hover >
            <template v-slot:activator="{ props }">
              <v-btn color="secondary" v-bind="props"> Seleccione un archivo </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" >
                <v-list-item-title>{{  itemSelected = item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div>{{ itemSelected }}</div>
        </div>

        <v-btn @click="upload" color="primary">Subir Archivo</v-btn>
        <v-btn
          @click="generateMasterKey"
          :color="generateKeyButtonColor"
          :style="{ cursor: generateKeyCursorStyle }"
          :disabled="generateKeyButtonColor !== 'secondary'">
          Descargar
        </v-btn>
        <v-btn @click="updateStatusFragment" color="orange">Actualizar</v-btn>
        <v-btn @click="cancel" color="red">Cancelar</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import localforage from "localforage";
import axios from "axios";

export default {
  name: "DownloadPage",
  data() {
    return {
      generateKeyButtonColor: 'grey',
      generateKeyCursorStyle: 'default',
      validateBoxClass: 'download-validate_box',
      isAlertVisible: false,
      messageAlertText: "",
      messageAlertType: "error",
      items: [
        { title: 'Archivo 1' },
        { title: 'Archivo 2' },
        { title: 'Archivo 3' },
        { title: 'Archivo 4' },
      ],
      itemSelected: "Seleccione un Archivo",
      members: [],
      fragments: [],
    };
  },
  props: ['teamName', 'user'],
  mounted() {
    this.getMembers();
  },
  methods: {
    upload() {
      this.$router.push({name: 'subir'});
    },
    validateFragment() {
      this.isAddUserVisible = true;
      this.generateKeyButtonColor = 'secondary';
      this.generateKeyCursorStyle = 'pointer';
      this.validateBoxClass = 'download-validate_box_correct';
    },
    generateMasterKey() {
      this.$router.push({name: 'descargar'});
    },
    cancel() {
      this.$router.push({name: 'seleccionar-equipo'});
    },
    updateStatusFragment() {
      location.reload();
    },
    async getMembers() {
      const response = await axios.get(`http://localhost:5000/equipos/miembros/${this.teamName}`, {
        headers: {
          Authorization: `Bearer ${await localforage.getItem('authToken')}`
        }
      });

      this.members = response.data.members;

      for (let member of response.data.fragments) {
        this.fragments.push(member.username)
      }
    },
    async downloadFragment() {
      const response = await axios.get(`http://localhost:5000/equipos/descargar_fragmentos/${this.teamName}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${await localforage.getItem('authToken')}`
        }
      });

      // Crear una URL para el Blob
      const url = URL.createObjectURL(response.data);

      // Crear un enlace para la descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${this.teamName}_${this.user}_fragment.pem`);

      // Agregar el enlace al documento y simular un clic
      document.body.appendChild(link);
      link.click();

      // Eliminar el enlace del documento
      document.body.removeChild(link);

      // Liberar la URL del Blob
      URL.revokeObjectURL(url);

      location.reload();
    },
    selectFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pem';
      input.onchange = this.handleFileUpload;
      input.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.uploadFile(file);
    },
    async uploadFile(file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async () => {
        const fileContent = reader.result;
        try {
          const response = await axios.post(
            `http://localhost:5000/equipos/subir_fragmentos/${this.teamName}`,
            { content: fileContent }, // Enviar solo el contenido
            {
              headers: {
                Authorization: `Bearer ${await localforage.getItem('authToken')}`,
              },
            }
          );
          console.log('File uploaded successfully:', response.data);
          this.updateStatusFragment();
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
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

.create-key_text {
  text-align: center;
  font-size: 2em;
  padding-bottom: 1em;
}

.download-validate_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}

.download-validate_box {
  padding: 1em;
  background-color: red;
}

.download-validate_box_correct {
  padding: 1em;
  background-color: greenyellow;
}

.download-keys_buttons {
  padding-top: 1em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>

