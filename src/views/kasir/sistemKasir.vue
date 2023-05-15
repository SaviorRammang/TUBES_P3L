<template>
    <!-- <div> -->
      <div class="member">
        <v-card>
          
          <v-card-title>
            <v-list-item-avatar color="darkgrey">
            <img src="https://i.pinimg.com/564x/65/70/7d/65707df9bf6745c6cb950a22ff5295b9.jpg" />
          </v-list-item-avatar>
          <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          ></v-text-field>
  
        <v-spacer></v-spacer>
        <v-btn color="black" outlined @click="resetDeaktivasiMember(item)" v-if="dataMember.length > 0">
          <v-icon color="black">mdi-account-off-outline</v-icon>
        </v-btn>
        <!--Dialog Deaktivais member  -->
              <!-- Dialog Confirm1 Hapus Member -->
              <v-dialog
              v-model="dialogDeaktivasi"
              persistent 
              max-width="420px"
            >
            <v-card
              color="white"
            >
            <v-card-title>
              <span class="headline">Ingin Deaktivasi Member  ?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="dialogConfirm = false"> Cancel </v-btn>
              <v-btn color="red darken-1" text @click="resetDeaktivasi()"> Deaktivasi </v-btn>
            </v-card-actions>
              </v-card>
            </v-dialog>
        <!-- Akhir Dialog Deaktivasi -->
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="dataMember"
          :search="search"
          >
          <template v-slot:[`item.actions`]="{item}">
            <v-dialog
              v-model="dialogConfirm2"
              persistent 
              max-width="420px"
            >
            <v-card
              color="white"
            >
            <v-card-title>
              <span class="headline">Ingin Reset Password Member ?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="dialogConfirm2 = false"> Cancel </v-btn>
              <v-btn color="red darken-1" text @click="resetPassword(item.id_member)"> Reset </v-btn>
            </v-card-actions>
              </v-card>
            </v-dialog>
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
                  v-model="member.id_member"
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
                      label="Tanggal Kadeluarsa"
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
                @click="cancelCetak(item)"
                >Cancel</v-btn>
  
              </v-row>
                  
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>
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
          dialogConfirm3: false,
          dialogConfirm2: false,
          dialogConfirm: false,
          dialogDeaktivasi : false,
          dialog: false,
          snackbar: false,
          color: '',
          search: '',
          headers: [
            {
              text: 'ID Member',
              align: 'start',
              sortable: false,
              value: 'id_member',
            },          
            // { text: 'Nomor Member', value: 'nomor_member' },
            { text: 'Nama Member', value: 'nama_member' },
            { text: 'Email Member', value: 'email_member' },
            { text: 'Username Member', value: 'username_member' },
            { text: 'Tanggal Lahir', value: 'tanggal_lahir_member' },
            { text: 'No Telp Member', value: 'no_telp_member' },
            { text: 'Alamat Member', value: 'alamat_member' },
            { text: 'Tanggal Kadaluwarsa', value: 'tanggal_aktivasi_member' },
            { text: 'Saldo Deposit', value: 'saldo_deposit_member' },
            // { text: 'Aksi', value: 'actions'},
  
            
          ],
          resetId: '',
          deletId: '',
          dataMember : ref([]),
          member : {}
          // router: useRouter(),
          
      }
    },
      methods: {
          async getDataMember(){
              const url = "http://127.0.0.1:8000/api/member_kedaluwarsa";       
              const request = await axios.get(url)
              console.log(request)
              this.dataMember=request.data.data
            //   console.log(this.dataMember);

  
          },
          resetHandler(id_member){
            console.log(id_member);
            this.resetId = id_member;
            this.dialogConfirm2 = true;
          },
  
          resetPassword(id_member){
            console.log(id_member)
              axios
              .put(`http://127.0.0.1:8000/api/reset/${id_member}`)
                .then((response) => {
                  this.error_message = response.data.message;
                  this.color = "green";
                  this.snackbar = true;
                  this.dialogConfirm2 = false;
                  // this.load = false;
                  // this.close();
                  this.getDataMember();
                  // this.type = "Tambah";
              })
            .catch((error) => {
              this.error_message = error.response.data.message;
              this.color = "red";
              this.snackbar = true;
              // this.snackbar = true;
              // this.load = false;
            });
          },
          
          editHandler(item){
              console.log(item)
              this.$router.push({name: 'EditMember', query : item})
          },
          // transaksiHandler(item){
          //   console.log(item)
          //   this.$router.push({name: 'transaksi-deposit-uang', query : item})
          // },
  
          deleteHandler(id_member){
              this.deleteId = id_member;
              this.dialogConfirm = true;
          },
  
          deleteData(id_member) {
            console.log(id_member)
              axios
              .delete(`http://127.0.0.1:8000/api/member/${id_member}`)
                .then((response) => {
                  this.error_message = response.data.message;
                  this.color = "green";
                  this.dialogConfirm = false;
                  this.snackbar = true;
                  // this.load = false;
                  // this.close();
                  this.getDataMember();
                  // this.type = "Tambah";
              })
            .catch((error) => {
              this.error_message = error.response.data.message;
              this.color = "red";
              this.snackbar = true;
              // this.load = false;
            });
        },
  
        resetDeaktivasiMember(){
            this.dialogDeaktivasi = true;
        },
        async resetDeaktivasi(){
            const url = "http://127.0.0.1:8000/api/deaktivasi_member";       
              const request = await axios.get(url)
              console.log(request)
              this.getDataMember()

            //Tutup Dialog
            this.dialogDeaktivasi = false;
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
                  doc.text(`Member ID : ${this.member['id_member']}`, 10, 40, null, null, "left");
  
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
                  doc.save(`${this.member['id_member']}.pdf`);
                
          },
  
          cancelCetak(item){
            console.log(item)
            console.log("Error")
            this.dialog = false;
            // this.member = this.$router.push({name: 'MemberView'})
              // router.push({name: "MemberView"})
          }
  
      },
      mounted (){
          this.getDataMember();
      }
  }
  </script>
  <style scoped>
    .member {
      background: url('https://i.pinimg.com/564x/65/70/7d/65707df9bf6745c6cb950a22ff5295b9.jpg');
      /* background: linear-gradient(
        to right,
        rgba(3, 12, 41, 0.75),
        rgba(5, 11, 31, 0.65)
      ); */
    }
    .memberstyle{
      opacity: 0.8;
    }
    
    </style>