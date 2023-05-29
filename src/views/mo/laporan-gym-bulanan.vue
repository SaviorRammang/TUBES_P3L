<template>
    <div>
      <v-card max>
        <v-card-title>
          Laporan GYM Bulanan
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>    
          <v-btn color="white" @click="printData">Print</v-btn>  
        </v-card-title>
        <v-data-table
          id="printable"  
          :headers="headers"
          :items="dataJadwal"
          :search="search"
        >
        <template v-slot:[`item.actions`]="{ item }">
            <!-- Dialog Confirm -->
            <v-dialog
              v-model="dialogConfirm"
              persistent 
              max-width="420px"
            >
              <v-card color="white">
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
        dialogConfirm2: false,
        dialogConfirm: false,
        color: '',
        search: '',
        headers: [

          { text: 'Tanggal', value: 'tanggal' },
          { text: 'Jumlah Member', value: 'count' },
        //   { text: 'Jumlah Izin', value: 'jumlah_izin' },
        //   { text: 'Jumlah Keterlambatan', value: 'jumlah_keterlambatan_instruktur' },
        //   { text: 'Aksi', value: 'actions' },
          
        ],
        totalMember: 0,
        editId: '',
        deleteId: '',
        dataJadwal : ref([]),
        // member : {}
        // router: useRouter(),
        
    }
  },
    methods: {
        printTable() {
            window.print();
        },

        printData() {
          

                // Membuka jendela baru untuk mencetak konten
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.open();
        printWindow.document.write(`
        <html>
        <head>
            <style>
            @media print {
                /* Gaya untuk menyembunyikan elemen yang tidak perlu dicetak */
                #printable {
                    visibility: visible;
                }
                /* Gaya khusus lainnya sesuai kebutuhan Anda */
            }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background-color: #f2f2f2;
        }
        </style>
        </head>
        <body>
            <h1>Laporan Kinerja Instruktur</h1>
            <h2>Bulan: Mei   Tahun: 2023</h2>
            <h3>Tanggal Cetak: 2023-05-29</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Jumlah Member</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.dataJadwal.map(row => `
                        <tr>
                            <td>${row.tanggal}</td>
                            <td>${row.count}</td>
                        </tr>
                    `).join('')}
                      <tr>
                        <td>Total</td>  
                        <td>${this.totalMember}</td>  
                      </tr>
                </tbody>
            </table>
        </body>
        </html>
    `);
        printWindow.document.close();

    // console.log(printWindow);
    // Tunggu beberapa saat sebelum mencetak untuk memastikan konten dimuat
    setTimeout(() => {
    printWindow.print();
    printWindow.close();
    }, 500);
},
        calculateTotalMember() {
          this.totalMember = this.dataJadwal.reduce((total, row) => total + row.count, 0);
        },
        async getDataJadwalGymBulanan(){
            const url = "http://127.0.0.1:8000/api/laporanaktivitasgym";
            const request = await axios.get(url)
            console.log(request.data.data)
            this.dataJadwal=request.data.data
            this.calculateTotalMember();

        },
        
        editHandler(item){
            // this.dialogConfirm = true;
            console.log('Gagal')
            console.log(item)
            this.$router.push({name: 'Mo-Jadwal-UmumViewEdit', query : item})
        },
  
        deleteHandler(id){
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
              this.getDataJadwalGymBulanan();
              // this.type = "Tambah";
            })
            .catch((error) => {
              this.error_message = error.response.data.message;
              this.color = "red";
              // this.snackbar = true;
              // this.load = false;
            });
        },
        
    },
    mounted (){
        this.getDataJadwalGymBulanan();
    }
  }
  </script>
<style>
@media print {
  /* Hide unnecessary elements when printing */
  /* * v-data-table {
    visibility: visible !important;
}
body * {
    visibility: hidden; */
    body > *:not(#printable) {
      display: none 
    }
  } 

  /* Show only the data table when printing */
</style>