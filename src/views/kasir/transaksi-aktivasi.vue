<template>
  <div>
    <v-card>
      <v-card-title>
        <p style="font-family: serif; color: red; font-size: 1cm">GO FIT</p>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table :headers="headers" :items="dataMember" :search="search">
        <template v-slot:[`item.actions`]="{item}">
          <v-btn
            @click="openDialog(item)"
            outlined
            :disabled="isExpired(item.tanggal_aktivasi_member)"
          >
            Aktivasi
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persitent max-width="650px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Member Card</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="member.id_member"
                  label="ID Member"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="member.nama_member"
                  label="Nama Member"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="member.email_member"
                  label="Email Member"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="member.username_member"
                  label="Username Member"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="member.tanggal_lahir_member"
                  label="Tanggal Lahir"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="member.no_telp_member"
                  label="No Telp Member*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="member.alamat_member"
                  label="Alamat Member"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="member.tanggal_aktivasi_member"
                  label="Tanggal Aktivasi"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="member.saldo_deposit_member"
                  label="Saldo Deposit"
                  required
                ></v-text-field>
              </v-col>

              <v-btn color="red" outlined @click="transaksiHandler(member)"
                >Cetak Card Member</v-btn
              >

              <v-btn color="blue" outlined @click="cancelCetak">Cancel</v-btn>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
      >{{ error_message }}
    </v-snackbar>

    <!-- Awal dari struk -->
    <div
      width="600px"
      id="printtarget"
      style="display: none; margin: 500px"
      class="text-dark"
    >
      <div width="600px" class="p-1">
        <table class="border">
          <tr>
            <td style="width: 70%">
              <strong>Gofit</strong>
              <p>Jl Centralpark No 10 Yogyakarta</p>
            </td>
            <td>No Struk : {{ hasilTransaksi.no_struk }}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              Tanggal :
              {{ hasilTransaksi.transaksi_member.tanggal_transaksi_aktivasi }}
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td>
              <table>
                <tr style="width: 80%">
                  <td><strong>Member</strong></td>
                  <td>:</td>
                  <td>{{ member.id_member }}</td>
                </tr>
                <tr>
                  <td>Aktivasi Tahunan</td>
                  <td>:</td>
                  <td>Rp.3.000.0000,-</td>
                </tr>
                <tr>
                  <td>Masa Aktif Member</td>
                  <td>:</td>
                  <td>{{ hasilTransaksi.member.tanggal_aktivasi_member }}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Kasir :{{ id_pegawai }}/ {{ nama_pegawai }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import {jsPDF} from 'jspdf';

export default {
  data() {
    return {
      // isDisabled: true,
      dialogConfirm3: false,
      dialogConfirm2: false,
      dialogConfirm: false,
      dialog: false,
      snackbar: false,
      color: '',
      search: '',
      headers: [
        {
          text: 'ID Member',
          align: 'start',
          sortable: false,
          value: 'id_member',
        },
        // { text: 'Nomor Member', value: 'nomor_member' },
        {text: 'Nama Member', value: 'nama_member'},
        {text: 'Email Member', value: 'email_member'},
        {text: 'Username Member', value: 'username_member'},
        {text: 'Tanggal Lahir', value: 'tanggal_lahir_member'},
        {text: 'No Telp Member', value: 'no_telp_member'},
        {text: 'Alamat Member', value: 'alamat_member'},
        {text: 'Tanggal Kadeluarsa', value: 'tanggal_aktivasi_member'},
        {text: 'Saldo Deposit', value: 'saldo_deposit_member'},
        {text: 'Aksi', value: 'actions'},
      ],
      id_pegawai: null,
      nama_pegawai: null,
      resetId: '',
      deletId: '',
      dataMember: ref([]),
      member: {},
      hasilTransaksi: ref({
        transaksi_member: {},
        member: {},
        no_struk: null,
      }),
      // router: useRouter(),
    };
  },
  methods: {
    isExpired(date) {
      const today = new Date();
      const activationDate = new Date(date);
      return activationDate < today;
    },

    openDialog(item) {
      console.log(item);
      this.member = {...item};
      this.dialog = true;
    },

    async getDataMember() {
      const url = 'http://127.0.0.1:8000/api/member';
      const request = await axios.get(url);
      console.log(request.data.data);
      this.dataMember = request.data.data;
    },

    resetHandler(id_member) {
      console.log(id_member);
      this.resetId = id_member;
      this.dialogConfirm2 = true;
    },

    resetPassword(id_member) {
      console.log(id_member);
      axios
        .put(`http://127.0.0.1:8000/api/reset/${id_member}`)
        .then((response) => {
          this.error_message = response.data.message;
          this.color = 'green';
          this.snackbar = true;
          this.dialogConfirm2 = false;
          // this.load = false;
          // this.close();
          this.getDataMember();
          // this.type = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = 'red';
          this.snackbar = true;
          // this.snackbar = true;
          // this.load = false;
        });
    },

    getPegawai() {
      let pegawaiData = localStorage.getItem('dataPegawai');
      this.id_pegawai = JSON.parse(pegawaiData)[0].id_pegawai;
      this.nama_pegawai = JSON.parse(pegawaiData)[0].nama_pegawai;
    },

    transaksiHandler(item) {
      axios
        .post('http://127.0.0.1:8000/api/transaksi_aktivasi', {
          id_member: item.id_member,
          id_pegawai: this.id_pegawai,
        })
        .then((response) => {
          this.member = item;
          this.hasilTransaksi = response.data.data;
          this.cetakStrukAktivasi();
          this.getDataMember();
        })
        .catch();
    },

    deleteHandler(id_member) {
      this.deleteId = id_member;
      this.dialogConfirm = true;
    },

    dialogMember(item) {
      console.log(item);
      this.member = {...item};
      this.dialog = true;
    },

    cetakStrukAktivasi() {
      console.log('cetak struk');
      // window.jsPDF = window.jspdf.jsPDF;
      let elementPrint = document.querySelector('#printtarget');
      elementPrint.style.display = 'block';
      elementPrint.style.fontSize = '5px';

      //Spasi
      elementPrint.style.lineHeight = '1.2';
      elementPrint.style.margin = '0';
      elementPrint.style.padding = '0';

      let doc = new jsPDF({
        orientation: 'l', // orientasi landscape
        unit: 'mm', // satuan millimeter
        format: ['400', '100'], // ukuran kertas A4
      });

      doc.html(elementPrint, {
        callback: function (doc) {
          doc.save('struk.pdf');
          elementPrint.style.display = 'none';
        },
        x: 10,
        y: 10,
      });
      console.log('akhir dari cetak pdf');
    },

    cancelCetak(item) {
      console.log(item);
      console.log('Error');
      this.dialog = false;
    },
  },
  mounted() {
    this.getDataMember();
    this.getPegawai();
  },
};
</script>

<style>
.border {
  border: 1px solid;
  border-color: black;
}
</style>
