<template>
  <!-- <div> -->
    <div>
      <v-card>
        <v-card-title>
          Data Member
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        ></v-text-field>

          <v-spacer></v-spacer>
          <v-btn color="black" outlined @click="createMember(item)">Register Member</v-btn>

      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="dataMember"
        :search="search"
        >
        <template v-slot:[`item.actions`]="{item}">
          <!-- this.$router.push('/member') -->
          <!-- :to="({name : 'EditMember'}) -->
          
          <v-btn 
            icon small class="mr-2"
            @click="editHandler(item)"
            >     
            <v-icon color="green">mdi-pencil</v-icon>          
          </v-btn>

          <v-btn
            icon small class="mr-2"
            color="red" 
            @click="deleteHandler(item.id)"
            >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
          
          <!-- Button Cetak Member Card-->
          <v-btn color="brown" outlined @click="dialogMember(item)">Cetak Card Member</v-btn>
          
        </template>
      </v-data-table>      
      
    </v-card>
  <!-- </div> -->
  
  <v-dialog
    v-model="dialog"
    persitent
    max-width="650px"
  >
  <v-card>
      <v-card-title>
        <span class="text-h5">Member Card</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>

            <v-col cols="12">
              <v-text-field
                v-model="member.id"
                label="ID Member"
                required
                ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="member.nomor_member"
                label="ID Member"
                required
                ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                v-model="member.nama_member"
                label="Nama Member"
                required
                ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="member.email_member"
                label="Email Member"
                required
                ></v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                v-model="member.username_member"
                label="Username Member"
                required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
              <v-text-field
                v-model="member.tanggal_lahir_member"
                label="Tanggal Lahir"
                required
                ></v-text-field>
              </v-col>
            
              <v-col cols="12">
              <v-text-field
              v-model="member.no_telp_member"
              label="No Telp Member*"
              required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="member.alamat_member"
                label="Alamat Member"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="member.tanggal_aktivasi_member"
                label="Tanggal Aktivasi"
                required
              ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                v-model="member.saldo_deposit_member"
                label="Saldo Deposit"
                required
                ></v-text-field>
              </v-col> 

              <v-btn 
              color="red" 
              outlined 
              @click="CetakStruk(item)"
              >Cetak Card Member</v-btn>
            
            <v-btn color="blue" 
              outlined 
              @click="cancleCetak(item)"
              >Cancel</v-btn>

            </v-row>

            <!-- <v-btn 
              color="red" 
              outlined 
              @click="CetakStruk(item)"
              >Cetak Card Member</v-btn>
            
            <v-btn color="blue" 
              outlined 
              @click="batalCetak(item)"
              >Cancel</v-btn> -->
                
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>

<script>

import {  ref } from 'vue';
import axios from 'axios';
import { jsPDF } from "jspdf";


  export default{
   
    data () {
      return {
        // isDisabled: true,
        dialog: false,
        color: '',
        search: '',
        headers: [
          {
            text: 'ID Member',
            align: 'start',
            sortable: false,
            value: 'id',
          },          
          { text: 'Nomor Member', value: 'nomor_member' },
          { text: 'Nama Member', value: 'nama_member' },
          { text: 'Email Member', value: 'email_member' },
          { text: 'Username Member', value: 'username_member' },
          { text: 'Tanggal Lahir', value: 'tanggal_lahir_member' },
          { text: 'No Telp Member', value: 'no_telp_member' },
          { text: 'Alamat Member', value: 'alamat_member' },
          { text: 'Tanggal Aktivasi', value: 'tanggal_aktivasi_member' },
          { text: 'Saldo Deposit', value: 'saldo_deposit_member' },
          { text: 'Aksi', value: 'actions'},

          
        ],
        dataMember : ref([]),
        member : {}
        // router: useRouter(),
        
    }
  },
    methods: {
        async getDataMember(){
            const url = "http://127.0.0.1:8000/api/member";
            const request = await axios.get(url)
            console.log(request.data.data)
            this.dataMember=request.data.data

        },
        
        editHandler(item){
            console.log('test')
            console.log(item)
            this.$router.push({name: 'EditMember', query : item})
        },

        async deleteHandler(id){
            try{
                const url = `http://127.0.0.1:8000/api/member/${id}`
                const request = await axios.delete(url);
                alert(request.data.message)
                this.getDataMember();
            }catch{
                alert('Gagal');
            }
        },

        createMember(item){
            console.log('Gagal')
            this.$router.push({name: 'CreateMember', query : item})
        },

        dialogMember(item){
            console.log(item)
            this.member = {...item};
            this.dialog = true;
        },

        CetakStruk()
        {
            // console.log(this.member)
              // console.log(this.member['ID Member'])
            // Membuat instance dari jspdf
              let doc = new jsPDF({
                orientation : 'landscape',
                unit : 'mm',
                format : ['150','80']
              });
                // Mengatur posisi dan ukuran teks untuk judul
                doc.setFontSize(18);
                doc.setFont(undefined,"bold");
                doc.text("GoFit", 10, 10, null, null, "left");

                // Mengatur posisi dan ukuran teks untuk alamat
                doc.setFontSize(12);
                doc.setFont(undefined,"normal");
                doc.text("Jl. Centralpark No. 10 Yogyakarta", 10 , 20, null, null, "");

                // Mengatur posisi dan ukuran teks untuk nomor member
                doc.setFontSize(16);
                doc.setFont(undefined,"bold");
                doc.text("MEMBER CARD", 10, 30, null, null, "left");
                doc.setFontSize(12);
                doc.setFont(undefined,"normal");
                doc.text(`Member ID : ${this.member['nomor_member']}`, 10, 40, null, null, "left");

                // Mengatur posisi dan ukuran teks untuk nama, alamat, dan nomor telepon
                doc.setFontSize(12);
                doc.setFont(undefined,"normal");
                doc.text("Nama :", 10, 50);
                doc.setFont(undefined,"normal");
                doc.text(this.member['nama_member'], 40, 50);
                doc.setFont(undefined,"normal");
                doc.text("Alamat :", 10, 60);
                doc.setFont(undefined,"normal");
                doc.text(this.member['alamat_member'], 40, 60); 
                doc.setFont(undefined,"normal");
                doc.text("Telpon :", 10, 70);
                doc.setFont(undefined,"normal");
                doc.text(this.member['no_telp_member'], 40, 70  );

                // Menyimpan dokumen ke dalam PDF
                doc.save(`${this.member['nomor_member']}.pdf`);
              
        },

        cancleCetak(item){
          console.log(item)
          console.log("Error")
          this.member = this.$router.push({name: 'MemberView'})
            // router.push({name: "MemberView"})
        }

    },
    mounted (){
        this.getDataMember();
    }
}
</script>