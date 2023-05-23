<template>
    <div>
        <v-card max>
        <v-card-title>
            Izin Instruktur 
          <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
            <v-spacer></v-spacer>
        </v-card-title>
      <v-data-table
        :headers="headers"
        :items="dataIzin"
        :search="search"
        >
        <template v-slot:[`item.actions`]="{item}">
          
          <v-btn 
            color = "white" 
            @click="dialogConfirm2 = true"
            v-if="item.status_konfirmasi=='Belum Dikonfirmasi'"
            > Confirm
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
              <span class="headline">Ingin Mengijinkan Instruktur ?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="dialogConfirm2 = false"> Cancel </v-btn>
              <v-btn color="red darken-1" text @click="acceptHandler(item.ijin_instruktur)"> Accept </v-btn>
              <v-btn color="yellow darken-1" text @click="rejectHandler(item.ijin_instruktur)"> Reject </v-btn>
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
        dialogConfirm2: false,
        snackbar: false,
        color: '',
        search: '',
        headers: [
          {
            text: 'ID Izin',
            align: 'start',
            sortable: false,
            value: 'ijin_instruktur',
          },
          { text: 'Nama Instruktur', value: 'instruktur.nama_instruktur' },
          { text: 'Instruktur Pengganti', value: 'instruktur_pengganti.nama_instruktur' },
          { text: 'Tanggal Jadwal Harian', value: 'jadwal_harian.tanggal_jadwal_harian' },
          { text: 'Hari Izin', value: 'hari_izin' },
          { text: 'Tanggal Pengajuan Izin', value: 'tanggal_pengajuan_izin' },
          { text: 'Tanggal Izin', value: 'tanggal_izin' },
          { text: 'Jam Sesi Izin', value: 'jam_sesi_izin' },
          { text: 'Keterangan Izin', value: 'keterangan_izin' },
          { text: 'Status Konfirmasi', value: 'status_konfirmasi' },
          { text: 'Aksi', value: 'actions' },
          
        ],
        selectedData: '',
        editId: '',
        deleteId: '',
        dataIzin : ref([]),
        // member : {}
        // router: useRouter(),
        
    }
  },
    methods: {
        async getDataIzin(){
            const url = "http://127.0.0.1:8000/api/ijin_instruktur";
            const request = await axios.get(url)
            console.log(request.data.data)
            this.dataIzin=request.data.data
        },

        setData(item){
            // console.log(item.ijin_instruktur);
            this.selectedData = item;
            this.dialogConfirm2 = true;
          },

        async acceptHandler(item){
            console.log(item.ijin_instruktur);
            const url = `http://127.0.0.1:8000/api/ijin_instruktur/${this.selectedData.ijin_instruktur}`;
            console.log(url)
            const request = await axios.put(url, {status_konfirmasi : "Telah Dikonfirmasi."})
            this.snackbar = true;
            console.log(request.data.data)
            this.dialogConfirm2 = false;
            this.getDataIzin();
        },
        async rejectHandler(item){
            console.log(item.ijin_instruktur);
            const url = `http://127.0.0.1:8000/api/ijin_instruktur/${this.selectedData.ijin_instruktur}`;
            console.log(url)
            const request = await axios.put(url, {status_konfirmasi : "Izin Ditolak."})
            console.log(request.data.data)
            this.dialogConfirm2 = false;
            this.getDataIzin();
        },
        
    },
    mounted (){
        this.getDataIzin();
    }
  }
  </script>