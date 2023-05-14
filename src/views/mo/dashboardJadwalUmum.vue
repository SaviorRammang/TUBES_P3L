<template>
    <div class="dashboard">
      <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>
  
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> GO-FIT </v-list-item-title>
            <v-list-item-subtitle class="subtitle"> SEHAT BERSAMA GOFIT </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider>
        <v-list dense nav v-if="loggedIn && loggedInMO" >
          <v-list-item 
            v-for="item in itemMO"
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
  
        <v-list dense nav v-if="loggedIn && !loggedInMO" >
          <v-list-item 
            v-for="item in itemMO"
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
          <v-btn text router color = "red" @click = "dialogConfirm = true"><v-icon>mdi-power</v-icon></v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <v-dialog
            v-model="dialogConfirm"
            persistent 
            max-width="420px"
          >
          <v-card
            color="white"
          >
          <v-card-title>
            <span class="headline">Apakah Anda Ingin Logout ?</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="dialogConfirm = false"> Cancel </v-btn>
            <v-btn color="red darken-1" text @click="btnLogout"> Logout </v-btn>
          </v-card-actions>
            </v-card>
          </v-dialog>

      <div class="fullheigh pa-5">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "DashboardJadwal",
    data() {
      return {
        dialogConfirm: false,
        drawer: true,
        itemMO: [
          { title: "Jadwal Umum", to:"/mo/jadwal-umum", icon:"mdi-calendar"},
          { title: "Jadwal Harian", to:"/mo/jadwal-harian/index", icon:"mdi-calendar-multiselect"},
          { title: "Izin Instruktur", to: "/mo/ijin-instruktur/index", icon: "mdi-account-check-outline"}
        ]
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
      loggedInMO(){
        return localStorage.getItem("role") == "MO";
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