import VueRouter from "vue-router";
import Vue from "vue";
// import { component } from "vue/types/umd";


Vue.use(VueRouter);



const router = new VueRouter({
    mode: 'history',
    routes:[
      {
        path: "/",
        name: "Homeview",
        component: () => import("@/views/HomeView.vue"),
      },
        
          {
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue"),
            meta: {title: "Login"},
          },
          {
            path: "/mainmenu",
            name: "mainmenu",
            component: () => import("@/components/MainMenuDashboard.vue"),
            // meta: {title: "MainMenu"},
          },
      
      {
        path: "/kasir",
        name: "dashboardMember",
        component: ()=> import("@/views/kasir/dashboardMember.vue"),
        
        children: [
          {
            path: "/kasir/member",
            component: () => import("@/views/kasir/indexMember.vue"),
            name: "MemberView",
        },
        {
          path: "/kasir/member/create",
          component: () => import("@/views/kasir/createMember.vue"),
          name: "CreateMember",
        },
        {
            path: "/kasir/member/edit",
            component: () => import("@/views/kasir/editMember.vue"),
            name: "EditMember",
        },
      
        {
          path: "/kasir/member/transaksi-deposit-uang",
          component: () => import("@/views/kasir/transaksi-deposit-uang.vue"),
          name: "transaksi-deposit-uang",
      },
        // {
        //   path: "/kasir/member/mencetakMemberCard",
        //   component: ()=> import("@/views/kasir/mencetakMemberCard.vue"),
        //   name: "MencetakMemberCard",
        // },
        // {
        //   path: "/kasir/member/mencetakMemberCard",
        //   component: ()=> import("@/views/kasir/mencetakMemberCard.vue"),
        //   name: "MencetakMemberCard",
        // },
        // {
        //   path: "/kasir/resetPassword",
        //   component: ()=> import("@/views/kasir/resetPassword.vue"),
        //   name: "ResetPassword",
        // },
      ]
      
      },
      
      {
        path: "/admin",
        name: "adminDashboardInstruktur",
        component: () => import("@/views/admin/adminDashboardInstruktur.vue"),

        children: [
          //Admin
          {
            path: "/admin/instruktur",
            component: () => import("@/views/admin/indexInstruktur.vue"),
            name: "InstrukturView",
          },
          {
            path: "/admin/instruktur/edit",
            component: () => import("@/views/admin/editInstruktur.vue"),
            name: "EditInstruktur",
          },
          {
            path: "/instruktur/create",
            component: () => import("@/views/admin/createInstruktur.vue"),
            name: "CreateInstruktur",
          },
          //Kasir
        ]
      },

      {
        path: "/mo",
        name: "Mo-JadwalUmum",
        component: ()=> import("@/views/mo/dashboardJadwalUmum.vue"),

        children: [
          {
            path: "/mo/jadwal-umum",
            component: () => import("@/views/mo/indexJadwalUmum.vue"),
            name: "Mo-Jadwal-UmumView",
          },
          {
            path: "/mo/jadwal-umum/create",
            component: () => import("@/views/mo/createJadwalUmum.vue"),
            name: "Mo-Jadwal-UmumViewCreate",
          },
          {
            path: "/mo/jadwal-umum/edit",
            component: () => import("@/views/mo/editJadwalUmum.vue"),
            name: "Mo-Jadwal-UmumViewEdit",
          },
        ]
      }
      
    ],
});
export default router