<template>
    <div>
      <div style="height: 470px" class="jadwal">
        <v-sheet class="mx-auto mt-15" style="padding:50px" max-width="800" color="white" elevation="10">
          <form @submit.prevent="createJadwal">
            
            <h1>Tambah Jadwal Umum</h1>             
            <!-- <v-btn outlined class="mr-2 red white--text" type="submit" @click="generatePDF()"> Cetak Member Card </v-btn> -->
           
            <v-select
              v-model="Jadwal.id_instruktur"
              label="Nama Instruktur"
              :items="instruktur"
              item-text="nama_instruktur"
              item-value="id"
              required
            ></v-select>
              <v-select
              v-model="Jadwal.id_kelas"
              label="Nama Kelas"
              :items = "kelas"
              item-text = "nama_kelas"
              item-value = "id"
              required
            ></v-select>
              <v-select
              v-model="Jadwal.hari_jadwal_umum"
              label="Hari"
              :items = "['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Mingggu']"
              required
              ></v-select>
              <v-select
              v-model="Jadwal.jam_jadwal_umum"
              label="Jam"
              :items = "['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00']"
              required
              ></v-select>
              <!-- item-text = "nama_kelas"
              item-value = "id" -->
            <!-- <v-text-field
              v-model="Jadwal.jam_jadwal_umum"
              label="Jam"
              required
            ></v-text-field> -->

            
            <v-btn 
                class="mr-1 blue white--text" 
                type="submit" 
                outlined
                > Save </v-btn>
            
            <v-btn 
                class="mr-1 red white--text" 
                @click="batalJadwal" 
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
  import { onMounted, reactive, ref } from "vue";
  import router from "../../router/router.js";
  // import { defaults } from "vue-router";
  import axios from "axios";
  
  export default {
    setup() {
      let Jadwal = reactive({
        id_instruktur : null,
        id_kelas: null,
        hari_jadwal_umum:"",
        jam_jadwal_umum: "",
        
      });
      const validation = ref([]);
      const instruktur = ref([]);
      const kelas = ref([])
      // const router = default/();
  
      function createJadwal() {
        console.log("Fungsi Create Jadwal");
        console.log(Jadwal);
        let id_instruktur = Jadwal.id_instruktur;
        let id_kelas = Jadwal.id_kelas;
        let hari_jadwal_umum = Jadwal.hari_jadwal_umum;
        let jam_jadwal_umum = Jadwal.jam_jadwal_umum;
        
        axios
          .post("http://127.0.0.1:8000/api/jadwal_umum", {
            id_instruktur: id_instruktur,
            id_kelas: id_kelas,
            hari_jadwal_umum : hari_jadwal_umum,
            jam_jadwal_umum: jam_jadwal_umum,
          })
        .then(() => {
            alert("Berhasil Create");
            router.push({ name: "Mo-Jadwal-UmumView" });
          })
          .catch((error) => {
            console.log(error.response.data)
            alert("Jadwal Instruktur Bertabrakan");
            validation.value = error.response.data;
          })
    }


    function getAllData()
    {
      axios 
            .get("http://127.0.0.1:8000/api/instruktur" ,{

            }).then(response => {
                instruktur.value = response.data.data
                console.log(instruktur.value)
            }).catch(error => {
                console.log(error.response.data)
        })
        axios 
            .get("http://127.0.0.1:8000/api/kelas" ,{

            }).then(response => {
                kelas.value = response.data.data
                console.log(kelas.value)
            }).catch(error => {
                console.log(error.response.data)
        })
    }
      onMounted(() => {
        getAllData()
      })

      function batalJadwal()
      {
        console.log("Batal Jadwal")
        router.push({name: "Mo-Jadwal-UmumView"})
      }

    return {
        Jadwal,
        createJadwal,
        batalJadwal,
        kelas,
        instruktur
      }
      
    },    
    
    //Create Jadwal
    // data(){
    //   return{
    //     dataForm : {}
    //   }

    // },
    // mounted(){

    // }
}


  </script>

  <style>
  .jadwal{
    background: url('https://i.pinimg.com/564x/24/f3/24/24f324d2d472e39067179483bb1b6604.jpg');
  }
  </style>