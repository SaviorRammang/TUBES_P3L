<template>
    <div id="background">
      <v-container fill-height fluid>
        <v-card elevation="2" class="centered">
          <h2 class="text-center" style="font-weight: 1000;">MASUK</h2>
          <form @submit.prevent='login'>
            
            <v-text-field 
            type="email"
            label="Email" 
            v-model="email" 
            placeholder="Masukan Email" 
            outlined 
            :rules="emailRules">
          </v-text-field>
          
          <v-text-field 
          type="password" 
          label="Password" 
          v-model="password" 
          placeholder="Masukkan Password" 
          outlined 
          :rules="passwordRules">
        </v-text-field>
        
        <!-- click="@login()" -->
        <v-btn block class="m-0" color="success" :loading="isLoading" type="submit">Masuk</v-btn>
      </form>
              <!-- <p class="mt-3 text-center">Belum punya akun? <router-link to="/register">Daftar</router-link></p> -->
        </v-card>
      </v-container>
    </div>
  </template>

<script>
import axios from "axios";
// import test from "node:test";

  /* eslint-disable */
  export default {
    name: 'LoginView',
    data() {
      return {
        load: false,
        isLoading: false,
        snackbar: false,
        error_message: "",
        valid: false,
        color: "",
        password: "",
        email: "",
        passwordRules: [
                  (v) => !!v || "Harap isi Password terlebih dahulu",
        ],
        emailRules: [
                  (v) => !!v || "Harap isi Username terlebih dahulu",
        ],
      };
    },
    // mounted(){
    //     this.$http.get(this.$api + "/kelas")
    //     .then((response)=>console.log(response))
    // },
    methods: {
      login() {
        // console.log("Error")
        // console.log(this.$api)
        this.isLoading = true;
        axios
        .post("http://127.0.0.1:8000/api/login", {
            email: this.email,
            password: this.password,
        })
          .then((response) => {
            console.log(response);
                this.isLoading = false;
                localStorage.setItem("id", response.data.data.user.id);
                console.log(response.data.data.user.id);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.data.user.role);
                localStorage.setItem("dataPegawai", JSON.stringify(response.data.data.pegawai));
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                
                let role = localStorage.getItem('role');
                if(role == 'Admin'){
                  this.$router.push('/admin')
                }else if(role =='Kasir')
                {
                  this.$router.push('/kasir')
                }else if(role == 'MO')
                {
                  this.$router.push('/mo')
                }
            
          })
          .catch((error) => {
              console.log(error)
              this.error_message = error.response.data.message;
              this.color = "red";
              this.snackbar = true;
              localStorage.removeItem("token");
              this.load = true;
              // this.$toastr.error(error.response.data.message);
              alert("Email atau Password Salah")
              location.reload();

              // this.load = false;
            });
      }
    }
  }
  </script>
  <style>
     #background {
        background: url('../assets/dashboard.png');
        min-height: 92vh;
        display: flex;
      }
      .centered{
        margin: 0;
        width: 700px;
        padding: 20px;
        border: 8px solid rgb(	3, 4, 94);
        background-color: #FFFFFF;
        border-radius: 3px;
        justify-content: center;
        text-align: center;
        max-width: 1316px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%)
      }
    @media screen and (max-width: 1316px){
      .login{
        border: 5px solid rgb(5,111,111);
      }
    }
  </style>
  <!-- / eslint-disable */
<template>
    <div>
        <div style="height: 500px">
      <v-sheet class="mx-auto mt-15" style="padding:50px" max-width="500" color="white" elevation="10">
        <form @submit.prevent="Login">
          <h1>Login</h1>
          <v-text-field
            v-model="inputAkun.email"
            label="Email"
            required
          ></v-text-field>
        <v-text-field
            v-model="inputAkun.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn class="mr-1 blue white--text mr-10" type="submit"> submit </v-btn>
          <v-btn class="blue--text" type=""> Forget Password? </v-btn>
          <v-spacer></v-spacer>
          <v-chip class="blue white--text mt-8 ms-10">Not Have a Account ? Register</v-chip>
          <v-divider class="mt-5"></v-divider>
        </form>
      </v-sheet>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import { reactive, ref } from "vue";
import router from "../router/router";
// import { defaults } from "vue-router";
import axios from "axios";
// import Vue from 'vue/types/umd';
export default {
  data() {
    return {
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 4 || "Min 8 characters",
        color: "",
        snackbar: false,
        error_message:"",
      },
    };
  },
  setup() {
    const inputAkun = reactive({
      email: "",
      password: "",
    });
    const validation = ref([]);
    
    function Login() {
      console.log("Fungsi Login");
      let email = inputAkun.email;
      let password = inputAkun.password;
      console.log("Data " , email, password);
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
       
          console.log(response)
          
          alert("Berhasil Login");
          
          router.push({ name: "MemberView"});
          

        })
        .catch((error) => {
          console.log(error)
          console.log("Gagal");
          // validation.value = error.response.data;

        });
    }

    return {
      inputAkun,
      Login,
    };
  },
};
</script>

<style>
</style> -->
