<template>

<div>
      <v-card max>
      <v-card-title>
          Jadwal Umum 
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>
        
        <v-btn color="red" outlined @click="createJadwal(item)">Create Jadwal</v-btn>
    
      </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dataJadwal"
      :search="search"
      >
      <template v-slot:[`item.actions`]="{item}">
        
        <v-btn 
          color = "green" 
          outlined 
          @click="editHandler(item)"
          > EDIT
        </v-btn>

        <v-btn 
          color="red" 
          outlined 
          @click="deleteHandler(item.id)"
          > DELETE
        </v-btn>
        
        <!-- Button Cetak Member Card-->
        <!-- <v-btn color="red" outlined @click="dialogMember(item)">Cetak Card Member</v-btn> -->

      <v-dialog
        v-model="dialogConfirm"
        persistent 
        max-width="420px"
    >
          <v-card
            color="white"
          >
          <v-card-title>
            <span class="headline">Ingin Menghapus Jadwal ?</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="dialogConfirm = false"> Cancel </v-btn>
            <v-btn color="red darken-1" text @click="deleteData(item.id)"> Delete </v-btn>
          </v-card-actions>
            </v-card>
          </v-dialog>
          </template>
        </v-data-table>
      </v-card>
  </div>

</template>
  
<style>
</style>

<script>


  export default {
    name: "ViewJadwalUmum",
    data() {
      return {
        error_message: '',
        load: false,
        color: '',
        search: '',
        dialog: '',
        dialogConfirm: '',
        headers: [
        {
          text: 'ID Jadwal',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nama Instruktur', value: 'instruktur.nama_instruktur' },
        { text: 'Nama Kelas', value: 'kelas.nama_kelas' },
        { text: 'Hari', value: 'hari_jadwal_umum' },
        { text: 'Jam', value: 'jam_jadwal_umum' },
        { text: 'Aksi', value: 'actions' },
        ],
        jadwal_umum: new FormData,
        JadwalUmum: [],
        form: {
          id_instruktur: '',
          id_kelas: '',
          hari_jadwal_umum: '',
          jam_jadwal_umum: '',

        },
        deleteId: '',
        editId: ''
      };
    },
    methods: {
        readData(){
          var url = this.$api + '/jadwal_umum';
          this.$http.get(url, {
            headers: {
            'Authorization': 'API TOKEN' + localStorage.getItem('token')
            }
          }).then(response => {
            this.JadwalUmum = response.data.data;
          })
        },
        save(){
          this.jadwal_umum.append('id_instruktur', this.form.id_instruktur);
          this.jadwal_umum.append('id_kelas', this.form.id_kelas);
          this.jadwal_umum.append('hari_jadwal_umum', this.form.hari_jadwal_umum);
          this.jadwal_umum.append('jam_jadwal_umum', this.form.jam_jadwal_umum);
          var url = this.$api + '/jadwal_umum'
          this.load = true;
          this.$http.post(url, this.jadwal_umum, {
            headers: {
              'Authorization' : 'TOKEN API' + localStorage.getItem('token'),
            }
          }).then(response => {
            this.error_message = response.data.message;
            this.color = "red";
            this.load = false;
            this.readData();
            this.resetForm();
          });
        },
        update(){
          let update = {
            id_instruktur : this.form.id_instruktur,
            id_kelas : this.form.id_kelas,
            hari_jadwal_umum: this.form.hari_jadwal_umum,
            jam_jadwal_umum: this.form.jam_jadwal_umum,
          };
          var url = this.$api + '/jadwal_umum' + this.editId;
          this.load = true;
          this.$http.put(url, update, {
            headers: {
              'Authorization' : 'API TOKEN' + localStorage.getItem('token')
            }
          }).then(response => {
            this.error_message = response.data.message;
            this.color = 'green';
            this.load = false;
            this.readData();
            this.resetForm();
          }).catch(error => {
            this.error_message = error.response.data.message;
            this.color = 'red';
            this.load = false;
            
          });
        },
        deleteData() {
          var url = this.$api + '/jadwal_umum/' + this.deleteId;
          this.$http.delete(url, {
            headers: {
              'Authorization': 'API TOKEN' + localStorage.getItem('token'),
            },
          }).then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.load = false;
            this.readData();
            this.resetForm();
          }).catch((error)=>{
            this.error_message = error.response.data.message;
            this.color = "red";
            this.load = false;
          });
        },
        editHandler(item){
          this.editId = item.id;
          this.form.id_instruktur = item.id_instruktur;
          this.form.id_kelas = item.id_kelas;
          this.form.hari_jadwal_umum = item.hari_jadwal_umum;
          this.form.jam_jadwal_umum = item.jam_jadwal_umum;
          this.dialog = true;
        },
        deleteHandler(id){
          this.deleteId = id;
          this.dialogConfirm = true;
        },
        cancel(){
          this.resetForm();
          this.readData();
          this.dialog = false;
          this.dialogConfirm = false;
        },
        resetForm(){
          this.form = {
            id_instruktur: null,
            id_kelas: null,
            hari_jadwal_umum: null,
            jam_jadwal_umum: null
          };
        },
        rute(){
          this.$router.push({name:"Mo-Jadwal-UmumViewCreate"})
        }
    },
    mounted(){
      this.readData();
    }
  }
</script>