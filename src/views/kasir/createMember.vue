<template>
  <div>
    <div style="height: 815px" class="member">
      <v-sheet class="mx-auto mt-15" style="padding:50px" max-width="800" color="white" elevation="10">
        <form @submit.prevent="createMember" class="memberstyle" >
          <h1>Tambah Member</h1>             
          <!-- <v-btn outlined class="mr-2 red white--text" type="submit" @click="generatePDF()"> Cetak Member Card </v-btn> -->
          
          <v-text-field
            v-model="Member.nama_member"
            label="Nama Member"
            required
          ></v-text-field>
          <v-text-field
            v-model="Member.username_member"
            label="Username Member"
            required
          ></v-text-field>
          <v-text-field
            v-model="Member.tanggal_lahir_member"
            label="Tanggal Lahir"
            required
          ></v-text-field>
          <v-text-field
            v-model="Member.no_telp_member"
            label="No Telp Member"
            required
          ></v-text-field>
          <v-text-field
            v-model="Member.email_member"
            label="Email Member"
            required
          ></v-text-field>
          <v-text-field
            v-model="Member.password_member"
            label="Password Member"
            required
          ></v-text-field>
          <v-text-field
            v-model="Member.alamat_member"
            label="Alamat Member"
            required
          ></v-text-field>
          <v-text-field
            v-model="Member.tanggal_aktivasi_member"
            label="Tanggal Aktivasi"
            required
          ></v-text-field>
          <v-text-field
            v-model="Member.saldo_deposit_member"
            label="Saldo Deposit"
            required
          ></v-text-field>
         
          <v-btn 
            class="mr-1 blue white--text" 
            type="submit" 
            outlined
            > Save </v-btn>
            
          <v-btn 
            class="mr-1 red white--text" 
            @click="batalMember" 
            outlined
            > Cancel </v-btn>

        </form>
      </v-sheet>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import { reactive } from "vue";
import router from "../../router/router.js";
// import { defaults } from "vue-router";
import axios from "axios";

export default {
  
  setup() {
    const Member = reactive({
      id_member: "",
      nama_member: "",
      username_member: "",
      tanggal_aktivasi_member: "",
      no_telp_member: "",
      email_member: "",
      password_member:"",
      alamat_member:"",
      tanggal_aktivasi_member:"",
      saldo_deposit_member:""
    });
    // const validation = ref([]);
    // const router = default/();

    function createMember() {
      console.log("Fungsi Create Member");
      let id_member = Member.id_member;
      let nama_member = Member.nama_member;
      let username_member = Member.username_member;
      let no_telp_member = Member.no_telp_member;
      let tanggal_lahir_member = Member.tanggal_lahir_member;
      let email_member = Member.email_member;
      let password_member = Member.password_member;
      let alamat_member = Member.alamat_member;
      let tanggal_aktivasi_member = Member.tanggal_aktivasi_member;
      let saldo_deposit_member = Member.saldo_deposit_member;

      axios
        .post("http://127.0.0.1:8000/api/member", {
          id_member: id_member,
          nama_member: nama_member,
          username_member : username_member,
          tanggal_lahir_member : tanggal_lahir_member,
          no_telp_member :no_telp_member,
          email_member : email_member,
          password_member: password_member,
          alamat_member: alamat_member,
          tanggal_aktivasi_member: tanggal_aktivasi_member,
          saldo_deposit_member: saldo_deposit_member,
          // id_mahasiswa: id_mahasiswa
        })
      .then(() => {
          // this.snackbar = true;
          alert("Berhasil Create");
          router.push({ name: "MemberView" });
        })
        .catch((error) => {
          console.log(error.response.data)
          alert("Gagal Create");
          // this.snackbar = true;
          validation.value = error.response.data;
        });
    }
    function batalMember()
    {
      console.log("Batal Member")
      router.push({name: "MemberView"})
    }
    // console.log(localStorage.getItem('token'))

    // function generatePDF(){
    //   const doc = new jsPDF();
    //   doc.save('dokumen.pdf')
    // }

    return {
      Member,
      createMember,
      batalMember,
    };
    
  },
};
</script>
<style scoped>
.member {
  background: url('https://i.pinimg.com/564x/65/70/7d/65707df9bf6745c6cb950a22ff5295b9.jpg');
  width: 100%;
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