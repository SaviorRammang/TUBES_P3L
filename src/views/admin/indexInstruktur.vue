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
          
          <!-- Button Cetak Member Card-->
          <!-- <v-btn color="red" outlined @click="dialogMember(item)">Cetak Card Member</v-btn> -->
          
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

        async deleteHandler(id){
            try{
                const url = `http://127.0.0.1:8000/api/instruktur/${id}`
                const request = await axios.delete(url);
                alert(request.data.message)
                this.getDataInstruktur();
            }catch{
                alert('Gagal');
            }
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