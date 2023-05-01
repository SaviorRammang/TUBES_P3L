<template>
  <div>
      <v-card max>
      <v-card-title>
          Jadwal Umum 
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>
        
        <v-btn color="red" outlined @click="createJadwal(item)">Create Jadwal</v-btn>
    
      </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dataJadwal"
      :search="search"
      >
      <template v-slot:[`item.actions`]="{item}">
        
        <v-btn 
          color = "green" 
          outlined 
          @click="editHandler(item)"
          > EDIT
        </v-btn>

        <v-btn 
          color="red" 
          outlined 
          @click="deleteHandler(item.id)"
          > DELETE
        </v-btn>
        
        <!-- Button Cetak Member Card-->
        <!-- <v-btn color="red" outlined @click="dialogMember(item)">Cetak Card Member</v-btn> -->

      <v-dialog
        v-model="dialogConfirm"
        persistent 
        max-width="420px"
    >
          <v-card
            color="white"
          >
          <v-card-title>
            <span class="headline">Ingin Menghapus Jadwal ?</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="dialogConfirm = false"> Cancel </v-btn>
            <v-btn color="red darken-1" text @click="deleteData(item.id)"> Delete </v-btn>
          </v-card-actions>
            </v-card>
          </v-dialog>
          </template>
        </v-data-table>
      </v-card>
  </div>
</template>

<script>

import {  ref } from 'vue';
import axios from 'axios';

export default {
 
  data () {
    return {
      dialogConfirm: false,
      color: '',
      search: '',
      headers: [
        {
          text: 'ID Jadwal',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nama Instruktur', value: 'instruktur.nama_instruktur' },
        { text: 'Nama Kelas', value: 'kelas.nama_kelas' },
        { text: 'Hari', value: 'hari_jadwal_umum' },
        { text: 'Jam', value: 'jam_jadwal_umum' },
        { text: 'Aksi', value: 'actions' },
        
      ],
      editId: '',
      deleteId: '',
      dataJadwal : ref([]),
      // member : {}
      // router: useRouter(),
      
  }
},
  methods: {
      async getDataJadwalUmum(){
          const url = "http://127.0.0.1:8000/api/jadwal_umum";
          const request = await axios.get(url)
          console.log(request.data.data)
          this.dataJadwal=request.data.data
      },
      
      editHandler(item){
          this.dialogConfirm = true;
          console.log('Gagal')
          console.log(item)
          this.$router.push({name: 'Mo-Jadwal-UmumViewEdit', query : item})
      },

      deleteHandler(id){
          // try{
          //   this.dialogConfirm = true;
          //     const url = `http://127.0.0.1:8000/api/jadwal_umum/${id}`
          //     const request = await axios.delete(url);
          //     alert(request.data.message)
          //     this.getDataJadwalUmum();
          // }catch{
          //     alert('Gagal');
          // }
        this.deleteId = id;
        this.dialogConfirm = true;
          
      },
      deleteData(id) {
        console.log(id)
        axios
        .delete(`http://127.0.0.1:8000/api/jadwal_umum/${id}`)
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.dialogConfirm = false;
            // this.snackbar = true;
            // this.load = false;
            // this.close();
            this.getDataJadwalUmum();
            // this.type = "Tambah";
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            // this.snackbar = true;
            // this.load = false;
          });
      },
      
      createJadwal(item){
          console.log("Gagal")
          this.dialogConfirm = true;
          this.$router.push({name: 'Mo-Jadwal-UmumViewCreate' /*'mo/jadwal-umum/create'*/, query : item})
      }
  },
  mounted (){
      this.getDataJadwalUmum();
  }
}
</script>