<template>
    <div class="dashboard">
      <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>
  
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> GO-FIT </v-list-item-title>
            <v-list-item-subtitle class="subtitle"> SEHAT BERSAMA GOFIT </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-list dense nav v-if="loggedIn && !loggedInKasir" >
          <v-list-item 
            v-for="item in kasir"
            :key="item.title"
            link
            tag="router-link"
            :to="item.to"
          >
          <v-list-item-content>
              <v-icon >{{item.icon}}</v-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
  
  
      </v-navigation-drawer>
      <v-app-bar app fixed height="75px">
        <v-app-bar-nav-icon color = "green" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <VSpacer />
        <v-toolbar-items>
          <v-btn text router color = "blue" @click = "btnProfile"><v-icon>mdi-account</v-icon></v-btn>
          <v-btn text router color = "red" @click = "btnLogout"><v-icon>mdi-power</v-icon></v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <div class="fullheigh pa-5">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "DashboardInstruktur",
    data() {
      return {
        drawer: true,
         kasir: [
          { title: "Member", to: "/kasir/member",icon: "mdi-account-group"},
          { title: "ResetPassword", to: "/kasir/resetPassword",icon: "mdi-key"},

        ],
      };
    },
    methods: {
      btnProfile() {
        this.$router.push('/profile');
      },
      btnLogout() {
        this.$router.push('/login');
        localStorage.clear();
        // location.reload();
      },
    },
    mounted(){
      if(localStorage.getItem('token') == null ){
        this.$router.push('/login');
      }
    },
    computed: {
      loggedIn(){
        return localStorage.getItem("token") != null;
      },
      loggedInKasir(){
        return localStorage.getItem("role") == "kasir";
      }
    }
  };
  </script>
  <style scoped>
  .fullheight {
    min-height: 100vh !important;
  }
  .router{
    text-decoration: none;
    color: black;
  }
  </style>