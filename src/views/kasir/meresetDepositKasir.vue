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
        
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="dataMember"
          :search="search"
          >
          <template v-slot:[`item.actions`]="{item}">

            <v-btn color="black" outlined @click="resetDepositPaket(item)
            " v-if="dataMember.length > 0">
             Reset Deposit Paket
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
              <span class="headline">Ingin Reset Member  ?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="dialogDeaktivasi = false"> Cancel </v-btn>
              <v-btn color="red darken-1" text @click="resetDeposit()"> Reset </v-btn>
            </v-card-actions>
              </v-card>
            </v-dialog>
        <!-- Akhir Dialog Deaktivasi -->

          </template> 
        </v-data-table>      
        
      </v-card>
    <!-- </div> -->
    
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
          dialogConfirm3: false,
          dialogConfirm2: false,
          dialogConfirm: false,
          dialogDeaktivasi : true,
          dialog: false,
          snackbar: false,
          error_message: false,
          color: '',
          search: '',
          headers: [
            {
              text: 'No Struk',
              align: 'start',
              sortable: false,
              value: 'no_struk_deposit_paket',
            },          
            // { text: 'Nomor Member', value: 'nomor_member' },
            { text: 'Tanggal Kadaluwarsa', value: 'tanggal_kedaluwarsa' },
            { text: 'Nominal Deposit', value: 'nominal_deposit_paket' },
            { text: 'Total Deposit', value: 'nominal_uang_deposit_paket' },
            { text: 'Tanggal Deposit', value: 'tanggal_deposit_paket' },
            { text: 'Aksi', value: 'actions'},
  
            
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
              const url = "http://127.0.0.1:8000/api/deposit_kedaluwarsa";       
              const request = await axios.get(url)
              console.log(request)
              this.dataMember=request.data.data
              console.log(this.dataMember);

  
          },
  
          editHandler(item){
              console.log(item)
              this.$router.push({name: 'EditMember', query : item})
          },
  
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
  
        resetDepositPaket(){
            this.dialogDeaktivasi = true;
        },
        async resetDeposit(){
            const url = "http://127.0.0.1:8000/api/reset_deposit";       
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