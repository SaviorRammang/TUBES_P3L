<template>
    <div>
        <v-card max>
        <v-card-title>
            Data Instruktur 
          <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
          
          <v-btn color="black" outlined @click="createInstruktur(item)">Create Instruktur</v-btn>
      
        </v-card-title>
      <v-data-table
        :headers="headers"
        :items="dataInstruktur"
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
          
          <!--Dialog Confirm-->
          <v-dialog
            v-model="dialogConfirm"
            persistent 
            max-width="420px"
          >
          <v-card
            color="white"
          >
          <v-card-title>
            <span class="headline">Ingin Menghapus Instruktur ?</span>
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
        snackbar:false,
        dialogConfirm: '',
        color: '',
        search: '',
        headers: [
          {
            text: 'ID Instruktur',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Nama Instruktur', value: 'nama_instruktur' },
          { text: 'Email Instruktur', value: 'email_instruktur' },
          { text: 'Username Instruktur', value: 'username_instruktur' },
          { text: 'No Telp Instruktur', value: 'no_telp_instruktur' },
          { text: 'Alamat Instruktur', value: 'alamat_instruktur' },
          { text: 'Aksi', value: 'actions'},

          
        ],
        deleteId: '',
        dataInstruktur : ref([]),
        // member : {}
        // router: useRouter(),
        
    }
  },
    methods: {
        async getDataInstruktur(){
            const url = "http://127.0.0.1:8000/api/instruktur";
            const request = await axios.get(url)
            console.log(request.data.data)
            this.dataInstruktur=request.data.data
        },
        
        editHandler(item){
            console.log('test')
            console.log(item)
            this.$router.push({name: 'EditInstruktur', query : item})
        },

        deleteHandler(id){
            // try{
            //     const url = `http://127.0.0.1:8000/api/instruktur/${id}`
            //     const request = await axios.delete(url);
            //     alert(request.data.message)
            //     this.getDataInstruktur();
            // }catch{
            //     alert('Gagal');
            // }
            this.deleteId = id;
            this.dialogConfirm = true;
        },

        deleteData(id) {
          console.log(id)
          axios
            .delete(`http://127.0.0.1:8000/api/instruktur/${id}`)
              .then((response) => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                // this.load = false;
                // this.close();
                this.dialogConfirm = false;
                this.getDataInstruktur();
                // this.type = "Tambah";
            })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            // this.load = false;
          });
      },
        
        createInstruktur(item){
            console.log("Gagal")
            this.$router.push({name: 'CreateInstruktur', query : item})
        }
    },
    mounted (){
        this.getDataInstruktur();
    }
}
</script>