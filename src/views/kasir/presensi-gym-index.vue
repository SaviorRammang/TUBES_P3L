<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
      <v-card max>
      <v-card-title>
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
      :items="dataBooking"
      :search="search"
      >
      // eslint-disable-next-line vue/valid-v-slot
      <template v-slot:item.status_kehadiran="{ item }">
                  {{ item.status_presensi == 0 ? 'Belum Di Presensi' : 'Sudah di Presensi' }}
              </template>
      <template v-slot:[`item.actions`]="{item}">
          <!--Dialog Confirm Libur-->

        <v-btn 
          color = "red" 
          outlined
          @click="buttonKonfirmasi(item)"
          > Presensi Member
        </v-btn>
      </template>
    </v-data-table>
  </v-card>

  <!--Dialog Confirm Generate -->
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
          text: 'No Booking',
          align: 'start',
          sortable: false,
          value: 'no_struk_booking_presensi_gym',
        },
        { text: 'Tanggal Booking', value: 'tanggal_booking_gym' },
        { text: 'Tanggal Yang Di Booking', value: 'tanggal_yang_di_booking_gym' },
        { text: 'Sesi', value: 'sesi_booking_gym' },
        { text: 'Nama Member', value: 'member.nama_member' },
        { text: 'Status Presensi', value: 'status_presensi' },

        { text: 'Aksi', value: 'actions' },
        
      ],

      // sesi : {
      //         waktu_mulai : '', 
      //         waktu_selesai: ''},
              // transaksi_member :{},
      dataBooking : ref([]),
      newMember : ref({})
      
      
  }
},
  methods: {
      async getDatapresensi(){
        
          const url = "http://127.0.0.1:8000/api/presensiGym";
          const request = await axios.get(url)
          console.log(request.data.data)
          this.dataBooking=request.data.data
          console.log(request)
      },
      

      openDialogGenerate(){
        console.log('masuk open dialog generate');
        this.dialogConfirm = true;
      },
      async generateHandler(){
          this.dialogConfirm = false;
          console.log(this.dialogConfirm)
          const url = "http://127.0.0.1:8000/api/presensiGym";
            const request = await axios.post(url)
            this.getDatapresensi();
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
        const konfirmasi = confirm('Apakah Anda yakin ingin melakukan Presensi Gym ?');
        if(konfirmasi){
          axios
          .put(`http://127.0.0.1:8000/api/presensiMemberGym/${item.no_struk_booking_presensi_gym}`,{})
          .then((response)=>{
            console.log(response)
            this.getDatapresensi()
          })
        }
        // console.log(`http://127.0.0.1:8000/api/jadwal_harian/${item.id_jadwal_harian}`);

      }   
  },
  mounted (){
      this.getDatapresensi();
  }
}
</script>