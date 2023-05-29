import VueRouter from 'vue-router';
import Vue from 'vue';
// import { component } from "vue/types/umd";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homeview',
      component: () => import('@/views/HomeView.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {title: 'Login'},
    },
    {
      path: '/mainmenu',
      name: 'mainmenu',
      component: () => import('@/components/MainMenuDashboard.vue'),
      // meta: {title: "MainMenu"},
    },

    {
      path: '/kasir',
      name: 'dashboardMember',
      component: () => import('@/views/kasir/dashboardMember.vue'),

      children: [
        {
          path: '/kasir/member',
          component: () => import('@/views/kasir/indexMember.vue'),
          name: 'MemberView',
        },
        {
          path: '/kasir/member/create',
          component: () => import('@/views/kasir/createMember.vue'),
          name: 'CreateMember',
        },
        {
          path: '/kasir/member/edit',
          component: () => import('@/views/kasir/editMember.vue'),
          name: 'EditMember',
        },

        {
          path: '/kasir/member/transaksi-deposit-uang',
          component: () => import('@/views/kasir/transaksi-deposit-uang.vue'),
          name: 'transaksi-deposit-uang',
        },
        {
          path: '/kasir/member/transaksi-aktivasi',
          component: () => import('@/views/kasir/transaksi-aktivasi.vue'),
          name: 'transaksi-aktivasi',
        },
        {
          path: '/kasir/member/sistem',
          component: () => import('@/views/kasir/sistemKasir.vue'),
          name: 'Sistem-Kasir',
        },
        {
          path: '/kasir/member/depositreset',
          component: () => import('@/views/kasir/meresetDepositKasir.vue'),
          name: 'Reset-Paket',
        },
        {
          path: '/kasir/member/presensi-gym-index',
          component: () => import('@/views/kasir/presensi-gym-index'),
          name: 'Presensi-GYM',
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
      ],
    },

    {
      path: '/admin',
      name: 'adminDashboardInstruktur',
      component: () => import('@/views/admin/adminDashboardInstruktur.vue'),

      children: [
        //Admin
        {
          path: '/admin/instruktur',
          component: () => import('@/views/admin/indexInstruktur.vue'),
          name: 'InstrukturView',
        },
        {
          path: '/admin/instruktur/edit',
          component: () => import('@/views/admin/editInstruktur.vue'),
          name: 'EditInstruktur',
        },
        {
          path: '/instruktur/create',
          component: () => import('@/views/admin/createInstruktur.vue'),
          name: 'CreateInstruktur',
        },
        //Kasir
      ],
    },

    {
      path: '/mo',
      name: 'Mo-JadwalUmum',
      component: () => import('@/views/mo/dashboardJadwalUmum.vue'),

      children: [
        {
          path: '/mo/jadwal-umum',
          component: () => import('@/views/mo/indexJadwalUmum.vue'),
          name: 'Mo-Jadwal-UmumView',
        },
        {
          path: '/mo/jadwal-umum/create',
          component: () => import('@/views/mo/createJadwalUmum.vue'),
          name: 'Mo-Jadwal-UmumViewCreate',
        },
        {
          path: '/mo/jadwal-umum/edit',
          component: () => import('@/views/mo/editJadwalUmum.vue'),
          name: 'Mo-Jadwal-UmumViewEdit',
        },
        {
          path: '/mo/jadwal-harian/index',
          component: () => import('@/views/mo/indexJadwalHarian.vue'),
          name: 'Mo-Jadwal-Harian',
        },
        {
          path: '/mo/ijin-instruktur/index',
          component: () => import('@/views/mo/ijinInstrukturIndex.vue'),
          name: 'Mo-Ijin-Instruktur',
        },
        {
          path: '/mo/laporan-instruktur-bulanan/index',
          component: () => import('@/views/mo/laporan-instruktur-bulanan.vue'),
          name: 'Mo-laporan-instruktur-bulanan',
        },
      ],
    },
  ],
});

export default router;
