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
          
          <v-btn color="red" outlined @click="generateJadwal(item)">Generate Jadwal</v-btn>
      
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
            @click="dialogConfirm2 = true"
            > 
            <v-icon color="green">mdi-pencil</v-icon>
          </v-btn>
  
          <!--Dialog Confirm Edit -->
          <v-dialog
              v-model="dialogConfirm2"
              persistent 
              max-width="420px"
            >
            <v-card
              color="white"
            >
            <v-card-title>
              <span class="headline">Ingin Mengedit Jadwal ?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="dialogConfirm2 = false"> Cancel </v-btn>
              <v-btn color="red darken-1" text @click="editHandler(item)"> Edit </v-btn>
            </v-card-actions>
              </v-card>
            </v-dialog>
  
          <v-btn 
            color="red" 
            outlined 
            @click="deleteHandler(item.id)"
            ><v-icon color="red">mdi-delete</v-icon>
          </v-btn>
          
          <!-- Dialog Confirm-->
            <!-- <v-dialog
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
            </v-dialog> -->
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
        dialogConfirm2: false,
        dialogConfirm: false,
        color: '',
        search: '',
        headers: [
          {
            text: 'ID Jadwal Harian',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Nama Instruktur', value: 'instruktur.nama_instruktur' },
        //   { text: 'Nama Kelas', value: 'jadwal__umums.nama_kelas' },
          { text: 'Tanggal', value: 'tanggal_jadwal_harian' },
          { text: 'Status', value: 'status_jadwal_harian' },
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
        async getDataJadwalHarian(){
            const url = "http://127.0.0.1:8000/api/jadwal_harian";
            const request = await axios.get(url)
            console.log(request.data.data)
            this.dataJadwal=request.data.data
        },

        getDataInstruktur(){
            
        },
        
        editHandler(item){
            // this.dialogConfirm = true;
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
              this.snackbar = true;
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
        
        generateJadwal(item){
            a
        }
    },
    mounted (){
        this.getDataHarian();
    }
  }
  </script>