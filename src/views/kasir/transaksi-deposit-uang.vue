<template>
  <form>
    <v-text-field
      v-model="formData.id_member"
      :error-messages="nameErrors"
      :counter="10"
      label="ID MEMBER"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="formData.id_promo"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="formData.nominal_deposit_uang"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    

    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="Item"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import axios from 'axios'
// import { response } from 'express'
// import { validationMixin } from 'vuelidate'
//   import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    // mixins: [validationMixin],

    // validations: {
    //   name: { required, maxLength: maxLength(10) },
    //   email: { required, email },
    //   select: { required },
    //   checkbox: {
    //     checked (val) {
    //       return val
    //     },
    //   },
    // },

        // 'id_member',
        // 'id_pegawai',
        // 'id_promo',
        // 'tanggal_deposit_uang',
        // 'nominal_deposit_uang',
        // 'bonus_deposit_uang',
        // 'total_deposit_uang',

    data: () => ({
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
        id_member: null,
        id_promo: null,
        tanggal_deposit_uang: null,
        nominal_deposit_uang: null,
        bonus_deposit_uang: null,
        total_deposit_uang: null,
      },
      member: null,
      pegawai: null,
      promo: null,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
    submit () {
        this.$v.$touch()
    },
    clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
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
            console.log(error.response.data)
          })
      },
      getPegawai(){
        let pegawai = localStorage.getItem('dataPegawai');
        return JSON.parse(pegawai)
      },
    },
    mounted(){
      this.getAllMember()
      // this.getPegawai()
      console.log(this.getPegawai())
      this.getAllPromo()
    }
  }
</script>
