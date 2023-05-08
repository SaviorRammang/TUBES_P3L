<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

  <v-text-field
      v-model="inputDataJadwal.id"
      label="ID Instruktur"
      required
    ></v-text-field>

    <v-select
          v-model="inputDataJadwal.id_instruktur"
          label="Nama Instruktur"
          :items ="instruktur"
          item-text="nama_instruktur"
          item-value="id"
          required
      ></v-select>
          <v-select
          v-model="inputDataJadwal.id_kelas"
          :items ="kelas" 
          label="Nama Kelas"
          item-text = "nama_kelas"
          item-value = "id"
          required
      ></v-select>

    <v-select
      v-model="inputDataJadwal.hari_jadwal_umum"
      label="Hari"
      :items = "['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Mingggu']"
      required
    ></v-select>

    <v-select
        v-model="inputDataJadwal.jam_jadwal_umum"
        label="Jam"
        :items = "['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00']"
        required
    ></v-select>

        <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="saveJadwal()"
        >
        Save
        </v-btn>

        <v-btn
        color="error"
        class="mr-4"
        @click="cancelJadwal()"
        >
        Cancel
        </v-btn>

    <!-- <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn> -->
  </v-form>
</template>

<script>
import axios from 'axios'
// import { response } from 'express'

export default {
data: () => ({
  // isDisabled: true,
  valid: true,
  inputDataJadwal: {
      id:'',
      id_instruktur:'',
      id_kelas:'',
      hari_jadwal_umum:'',
      jam_jadwal_umum:'',
  },
  kelas: {},
  instruktur: ([]),
  jadwal_umum:([]),

}),

methods: {
      async saveJadwal(){
          // try{
              const url = `http://127.0.0.1:8000/api/jadwal_umum/${this.inputDataJadwal.id}`
              const request = await axios.put(url,{...this.inputDataJadwal})
              alert(request.data.message)
              console.log(request);
              this.$router.push({name: 'Mo-Jadwal-UmumView'});
          // }catch(e){
          //     console.log(e)
          //     alert('Error Save')
          // }
      },

      cancelJadwal(){
          this.inputDataJadwal =  this.$router.push({name: 'Mo-Jadwal-UmumView'})
      },

      getDataJadwal(){
          this.inputDataJadwal =  this.$route.query
      },

      getAllData(){
        axios.get('http://localhost:8000/api/instruktur')
        .then(response => {
        //assign state posts with response data
          this.instruktur = response.data.data
        }).catch(error => {
          console.log(error.response.data)
        })
        axios.get('http://localhost:8000/api/kelas')
        .then(response => {
          this.kelas = response.data.data
        }).catch(error => {
          console.log(error.response.data)
        })
        axios.get('http://localhost:8000/api/jadwal_umum')
        .then(response => {
          this.jadwal_umum = response.data.data
        }).catch(error => {
          console.log(error.response.data)
        })
      } 
  },
  mounted(){
      this.getAllData();
      this.getDataJadwal();
  }
}
</script>