<template>
    <div>
      <div style="height: 500px">
        <v-sheet class="mx-auto mt-15" style="padding:50px" max-width="800" color="white" elevation="10">
          <form @submit.prevent="createInstruktur">
            
            <h1>Tambah Instruktur</h1>             
            <!-- <v-btn outlined class="mr-2 red white--text" type="submit" @click="generatePDF()"> Cetak Member Card </v-btn> -->
           
            <v-text-field
              v-model="Instruktur.nama_instruktur"
              label="Nama Instruktur"
              required
            ></v-text-field>

            <v-text-field
              v-model="Instruktur.username_instruktur"
              label="Username Instruktur"
              required
            ></v-text-field>

            <v-text-field
              v-model="Instruktur.no_telp_instruktur"
              label="No Telp Instruktur"
              required
            ></v-text-field>

            <v-text-field
              v-model="Instruktur.email_instruktur"
              label="Email Instruktur"
              required
            ></v-text-field>

            <v-text-field
              v-model="Instruktur.password_instruktur"
              label="Password Instruktur"
              required
            ></v-text-field>

            <v-text-field
              v-model="Instruktur.alamat_instruktur"
              label="Alamat Instruktur"
              required
            ></v-text-field>

            
            <v-btn 
              class="mr-1 blue white--text" 
              type="submit" 
              outlined
              > Save </v-btn>
              
            <v-btn 
              class="mr-1 red white--text" 
              @click="batalInstruktur" 
              outlined
              > Cancel </v-btn>

          </form>
        </v-sheet>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  import { reactive, ref } from "vue";
  import router from "../../router/router.js";
  // import { defaults } from "vue-router";
  import axios from "axios";
  
  export default {
    
    setup() {
      const Instruktur = reactive({
        nama_instruktur :"",
        username_instruktur: "",
        no_telp_instruktur: "",
        email_instruktur: "",
        password_instruktur:"",
        alamat_instruktur:"",
        
      });
      const validation = ref([]);
      // const router = default/();
  
      function createInstruktur() {
        console.log("Fungsi Create Instruktur");
        let nama_instruktur = Instruktur.nama_instruktur;
        let username_instruktur = Instruktur.username_instruktur;
        let no_telp_instruktur = Instruktur.no_telp_instruktur;
        let email_instruktur = Instruktur.email_instruktur;
        let password_instruktur = Instruktur.password_instruktur;
        let alamat_instruktur = Instruktur.alamat_instruktur;
        
        axios
          .post("http://127.0.0.1:8000/api/instruktur", {
            nama_instruktur: nama_instruktur,
            username_instruktur : username_instruktur,
            no_telp_instruktur :no_telp_instruktur,
            email_instruktur : email_instruktur,
            password_instruktur: password_instruktur,
            alamat_instruktur: alamat_instruktur,
          })
        .then(() => {
            alert("Berhasil Create");
            router.push({ name: "InstrukturView" });
          })
          .catch((error) => {
            console.log(error.response.data)
            alert("Gagal Create");
            validation.value = error.response.data;
          });
      }
      function batalInstruktur()
      {
        console.log("Batal Instruktur")
        router.push({name: "InstrukturView"})
      }
      // console.log(localStorage.getItem('token'))
  
      // function generatePDF(){
      //   const doc = new jsPDF();
      //   doc.save('dokumen.pdf')
      // }

      return {
        Instruktur,
        createInstruktur,
        batalInstruktur,
      };
      
    },
  };
  </script>
  <style>
  </style>