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
        <v-btn color="white" @click="resetDeaktivasiMember(item)" v-if="dataMember.length > 0"> Reset Deaktivasi Member
          <!-- <v-icon color="black">mdi-account-off-outline</v-icon> -->
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
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar>
      </div>
    </template>
  
<script>
  
import {  ref } from 'vue';
import axios from 'axios';

export default{
     
      data () {
        return {
          // isDisabled: true,
          dialogConfirm2: false,
          dialogDeaktivasi : false,
          dialog: false,
          snackbar: false,
          error_message: false,
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
  
          
      mounted (){
          this.getDataMember();
      }
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