<template>
  <div>
  <form @submit.prevent="submitForm">

    <v-select
      v-model="formData.id_member"
      :items="member"
      item-text="id_member"
      item-value="id_member"
      label="ID Member"
      required
    ></v-select>

    <v-text-field
      @input = 'updateNominalPromo'
      v-model="formData.nominal_deposit_uang"
      label="Nominal"
      required
    ></v-text-field>

    <v-select
      v-model="formData.id_promo"
      :items="promo"
      item-text="nama_promo"
      item-value="id"
      label = "Promo"
      required
      disabled
    ></v-select>

    

    <v-text-field
      v-model="formData.bonus_deposit_uang"
      label="Bonus"
      required
      disabled
    ></v-text-field>

    <v-text-field
      v-model="formData.total_deposit_uang"
      label="Total"
      required
      disabled
    ></v-text-field>

    <!-- @click="submit" -->
    <!-- @click="clear"> -->

    <v-btn
      class="mr-4"
      type="submit"
      >
      submit
    </v-btn>
  <v-dialog
    v-model="dialogConfirm2"
      persistent 
      max-width="420px"
    >
    <v-card
      color="white"
    >
    <v-card-title>
      <span class="headline">Konfirmasi Transaksi Anda ?</span>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green" text @click="dialogConfirm2 = false"> Batal </v-btn>
      <v-btn color="red darken-1" text @click="confirmTransaction"> Lanjutkan </v-btn>
    </v-card-actions>
      </v-card>
    </v-dialog>
  </form>

    
  

  <!-- Dialog Konfirmasi Transaksi -->
  <div class="bg light" >
        <!-- <button @click="generateStrukDepositUang">Cetak Struk</button> -->
        <!-- PDFFF -->
        <div  width="600px" id="printtarget" style=" display: none; margin:500px;" class=" text-dark">
            <div width="600px" class="p-1 ">
              
              <table class="border">
                <tr>
                  <td style="width: 50%;">
                    <strong>Gofit</strong>  
                  </td>
                  <td>
                    No Struk : {{ transaksiDepo.no_struk}}
                  </td>
                </tr>
                <td>
                  <p>Jl Centralpark No 10 Yogyakarta</p>
                </td>
                <td>
                  Tanggal : {{ transaksiDepo.transaksi_deposit_uang.tanggal_deposit_uang }}
                </td>
                
                <tr></tr>
                <tr>
                  <td>
                    <table>
                      <tr style="width: 80%;">
                        <td><strong>Member</strong></td>
                        <td>:</td>
                        <td>{{ transaksiDepo.transaksi_deposit_uang.id_member }} / {{ transaksiDepo.siganteng }}</td>
                      </tr>
                      <tr>
                        <td >Nominal Deposit</td>
                        <td>:</td>
                        <td>Rp.{{transaksiDepo.transaksi_deposit_uang.nominal_deposit_uang}}</td>
                      </tr>
                      <tr>
                        <td>Bonus Deposit</td>
                        <td>:</td>
                        <td>Rp. {{  (transaksiDepo.transaksi_deposit_uang.bonus_deposit_uang)}}</td>
                      </tr>
                      <tr>
                        <td>Sisa Deposit</td>
                        <td>:</td>
                        <td>Rp. {{ transaksiDepo.sisa_deposit }}</td>
                      </tr>
                      <tr>
                        <td>Total Deposit</td>
                        <td>:</td>
                        <td>{{ parseInt(transaksiDepo.sisa_deposit) + parseInt(transaksiDepo.transaksi_deposit_uang.total_deposit_uang) }}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td></td>
                    <td>Kasir : {{formData.id_pegawai}}/{{ formData.nama_pegawai }} </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import jsPDF from 'jspdf';
import { ref } from 'vue';
// import { response } from 'express'
// import { validationMixin } from 'vuelidate'
//   import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {

    data: () => ({
      dialogConfirm2 : false,
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      formData: {
        id_pegawai: null,
        nama_pegawai: null,
        id_member: null,
        id_promo: null,
        tanggal_deposit_uang: null,
        nominal_deposit_uang: null,
        bonus_deposit_uang: null,
        total_deposit_uang: null,
      },
      transaksiDepo : ref({
        transaksi_deposit_uang : {},
        sisa_deposit : null,
        no_struk : null,
      }),
      member: null,
      pegawai: null,
      promo: null,
    }),


    methods: {

    submitForm(){
        this.dialogConfirm2 = true;
    },

    confirmTransaction(){
      //Tutup Modal 
      this.dialogConfirm2 = false;
      console.log(this.formData);
      // Request Transaksi
      axios.post('http://127.0.0.1:8000/api/transaksi_deposit_uang',{...this.formData})
        .then((response) => {
          // console.log(response);
          alert(response.data.message);
          this.transaksiDepo = response.data.data;
          // console.log(this.transaksiDepo);
          //Generate Struk Deposit Uang
          this.cetakStrukDepositUang();
        })
    },
    cetakStrukDepositUang() {
            console.log('cetak struk')
            // window.jsPDF = window.jspdf.jsPDF;
            var elementHTML = document.querySelector('#printtarget');
            elementHTML.style.display = "block";
            elementHTML.style.fontSize = '5px';

            //Spasi
            elementHTML.style.lineHeight = '1.2'; 
            elementHTML.style.margin = '0';
            elementHTML.style.padding = '0';
            
            
            let doc = new jsPDF({
                orientation: 'l', // orientasi landscape
                unit: 'mm', // satuan millimeter
                format: ['300','100'], // ukuran kertas A4
            });

            doc.html(elementHTML, {
            callback: function (doc) {
                doc.save('struk.pdf');
                elementHTML.style.display = "none";
            },
            x: 10,
            y: 10
            });
            console.log('akhir dari cetak pdf')
        },
      getAllMember(){
          axios
            .get("http://127.0.0.1:8000/api/member", {
          }).then(response => {
            this.member = response.data.data
            console.log(this.member)
          }).catch(error => {
            console.log(error.response.data)
          })
      },
      getAllPromo(){
        axios
            .get("http://127.0.0.1:8000/api/promo", {
          }).then(response => {
            this.promo = response.data.data
            console.log(this.promo)
          }).catch(error => {
            console.log(error.message);
          })
      },
      getPegawai(){
          let pegawaiData = localStorage.getItem('dataPegawai');
          this.formData.id_pegawai =  JSON.parse(pegawaiData)[0].id_pegawai
          this.formData.nama_pegawai =  JSON.parse(pegawaiData)[0].nama_pegawai
      },
      updateNominalPromo(){
        let localPromo = this.updatePromo();
        // console.log(localPromo.id);
        // if(localPromo && localPromo.id != null){
          try{
            console.log('masil if')
            this.formData.id_promo = localPromo.id;
            this.formData.bonus_deposit_uang = localPromo.bonus_promo;
            this.formData.total_deposit_uang=  parseInt(this.formData.nominal_deposit_uang) + parseInt(localPromo.bonus_promo) ;
          }catch{
            this.formData.id_promo = 0;
            this.formData.bonus_deposit_uang = 0;
            this.formData.total_deposit_uang=  0 ;
          }
        // }else{
          console.log('masil else')
        // }
      },
      updatePromo(){
        let data = this.promo;
        let pm = null;
        data = data.filter((dt) => dt.jenis_promo === 'Promo Reguler');
        console.log(data);
        data.forEach((value) =>{  
          if(value.minimal_deposit <= this.formData.nominal_deposit_uang && (pm === null || value.minimal_deposit > pm.minimal_deposit)){
            pm = value;
            console.log(pm.minimal_deposit , pm.nama_promo)
          }
        })
        // console.log(pm)  
        return pm;
      },
    },
    mounted(){
      this.getAllMember()
      // this.getPegawai()
      this.getPegawai()
      this.getAllPromo()
    }
  }
</script>
<style>
.border{
  border: 1px solid;
  border-color: black;
}
</style>
