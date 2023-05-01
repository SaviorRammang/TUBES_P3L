<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >

    <v-text-field
        v-model="inputDataMember.id"
        label="ID Instruktur"
        required
        disabled ="isDisabled"
      ></v-text-field>

      <v-text-field
        v-model="inputDataMember.nama_member"
        label="Nama Member"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="inputDataMember.username_member"
        label="Username Member"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataMember.tanggal_lahir_member"
        label="Tanggal Lahir"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataMember.no_telp_member"
        label="No Telp"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataMember.alamat_member"
        label="Alamat Member"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataMember.tanggal_aktivasi_member"
        label="Aktivasi Member"
        required
      ></v-text-field>

      <v-text-field
        v-model="inputDataMember.saldo_deposit_member"
        label="Saldo Deposit"
        required
      ></v-text-field>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="saveMember()"
      >
        Save
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="cancelMember()"
      >
        Cancel
      </v-btn>
  
      <!-- <v-btn
        color="warning"
        @click="resetValidation"
      >
        Reset Validation
      </v-btn> -->
    </v-form>
  </template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    isDisabled: true,
    valid: true,
    inputDataMember: {
        id:'',
        nomor_member:'',
        nama_member: '',
        username_member:'',
        tanggal_lahir_member: '',
        no_telp_member:'',
        alamat_member:'',
        tanggal_aktivasi_member:'',
        saldo_deposit_member:'',
    },

  }),

  methods: {
        async saveMember(){
            try{
                const url = `http://127.0.0.1:8000/api/member/${this.inputDataMember.id}`
                const request = await axios.put(url,this.inputDataMember)
                alert(request.data.message)
                this.$router.push({name : 'MemberView'});
            }catch(e){
                console.log(e)
                alert('Error Bangg')
            }
        },

        cancelMember(){
            this.inputDataMember =  this.$router.push({name: 'MemberView'})
        },

        getDataMember(){
            this.inputDataMember =  this.$route.query
        }
    },
    mounted(){
        this.getDataMember();
    }
}
</script>