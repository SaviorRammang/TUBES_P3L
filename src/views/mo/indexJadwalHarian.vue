/* eslint-disable */
<template>
    <div>
        <v-card max>
        <v-card-title>
            <p style="font-family:serif; color:red; font-size: 1cm;"> GO FIT</p>
          <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
          <v-btn color="blue" outlined @click="openDialogGenerate()">Generate Jadwal</v-btn>
        </v-card-title>
      <v-data-table
        :headers="headers"
        :items="dataJadwal"
        :search="search"
        >
        <template v-slot:[`item.actions`]="{item}">
            <!--Dialog Confirm Libur-->

          <v-btn 
            color = "black" 
            outlined 
            @click="buttonKonfirmasi(item)"
            > MELIBURKAN
            <!-- <v-icon color="green">mdi-pencil</v-icon> -->
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!--Dialog Confirm Generate -->
    <v-dialog
        v-model="dialogConfirm"
        persistent 
        max-width="420px"
      >
      <v-card
        color="white"
      >
      <v-card-title>
        <span class="headline">Ingin Mengenerate Jadwal ?</span>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" text @click="dialogConfirm = false"> Cancel </v-btn>
        <v-btn color="red darken-1" text @click="generateHandler()"> Generate </v-btn>
      </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>

<script>
  
  import {  ref } from 'vue';
  import axios from 'axios';
  
  export default {
   
    data () {
      return {
        dialogConfirmLibur:false,
        dialogConfirm: false,
        color: '',
        search: '',
        headers: [
          {
            text: 'ID Jadwal Harian',
            align: 'start',
            sortable: false,
            value: 'id_jadwal_harian',
          },
          { text: 'Nama Instruktur', value: 'instruktur.nama_instruktur' },
          { text: 'Tanggal', value: 'tanggal_jadwal_harian' },
          { text: 'Status', value: 'status_jadwal_harian' },
          { text: 'Aksi', value: 'actions' },
          
        ],
        dataJadwal : ref([]),
        
        
    }
  },
    methods: {
        async getDataJadwalHarian(){
            const url = "http://127.0.0.1:8000/api/jadwal_harian";
            const request = await axios.get(url)
            console.log(request.data.data)
            this.dataJadwal=request.data.data
            console.log(request)

        },

        openDialogGenerate(){
          console.log('masuk open dialog generate');
          this.dialogConfirm = true;
        },
        async generateHandler(){
            this.dialogConfirm = false;
            console.log(this.dialogConfirm)
            const url = "http://127.0.0.1:8000/api/jadwal_harian";
              const request = await axios.post(url)
              this.getDataJadwalHarian();
              // console.log(request.data.success)
              if(!request.data.success){
                alert(request.data.message)
              }else{
                alert('Berhasil Melakukan Generate')
              }
          },
        buttonKonfirmasi(item){
          this.dialogConfirmLibur = false;
          console.log(item);
          const konfirmasi = confirm('Apakah Anda yakin ingin meliburkan jadwal ?');
          if(konfirmasi){
            axios
            .put(`http://127.0.0.1:8000/api/jadwal_harian/${item.id_jadwal_harian}`,{})
            .then((response)=>{
              alert("Berhasil Diliburkan")
              console.log(response)
              this.getDataJadwalHarian()
            })
          }
          // console.log(`http://127.0.0.1:8000/api/jadwal_harian/${item.id_jadwal_harian}`);

        }

          

        
    },
    mounted (){
        this.getDataJadwalHarian();
    }
  }
  </script>
  /* eslint-disable */
