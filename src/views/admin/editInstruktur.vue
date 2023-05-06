<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >

    <v-text-field
        v-model="inputDataInstruktur.id"
        label="ID Instruktur"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataInstruktur.nama_instruktur"
        label="Nama Instruktur"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataInstruktur.email_instruktur"
        label="Email Instruktur"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="inputDataInstruktur.username_instruktur"
        label="Username Instruktur"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataInstruktur.no_telp_instruktur"
        label="No Telp Instruktur"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataInstruktur.alamat_instruktur"
        label="Alamat Instruktur"
        required
      ></v-text-field>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="saveInstruktur()"
      >
        Save
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="cancelInstruktur()"
      >
        Cancel
      </v-btn>

    </v-form>
  </template>


<script>
import axios from 'axios'

export default{
  data: () => ({
    // isDisabled: true,
    valid: true,
    inputDataInstruktur: {
        id: '',
        nama_instruktur: '',
        email_instruktur:'',
        username_instruktur:'',
        no_telp_instruktur:'',
        alamat_instruktur:'',
    },

  }),

  methods: {
        async saveInstruktur(){
            try{
                const url = `http://127.0.0.1:8000/api/instruktur/${this.inputDataInstruktur.id}`
                const request = await axios.put(url,this.inputDataInstruktur)
                alert(request.data.message)
                this.$router.push({name : 'InstrukturView'});
            }catch(e){
                console.log(e)
                alert('Error')
            }
        },

        cancelInstruktur(){
            this.inputDataInstruktur =  this.$router.push({name: 'InstrukturView'})
        },

        getDataInstruktur(){
            this.inputDataInstruktur =  this.$route.query
        }
    },
    mounted(){
        this.getDataInstruktur();
    }
}
</script>