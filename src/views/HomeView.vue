<template>
  
    <v-carousel
      height="100vh"
      dark
      cycle
      show-arrows-on-hover
      draggable="true"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(carousel, carindex) in carouselsData"
        :key="carindex"
        :src="carousel.src"
        class="gradient-fill"
      >
        <v-container fill-height>
          <div style="max-width: 900px">
            
            <div class="text-md-h2 mb-3 text-sm-h3 text-h5 font-weight-black white--text">
              {{ carousel.heading.toUpperCase() }}
            </div>
            
            <p class="mb-5 white--text">{{ carousel.subHeading }}</p>
            
            <v-btn @click="login" :x-large="$vuetify.breakpoint.smAndUp" class="my-3 primary"
              >Login</v-btn
            >
            <span class="mx-2 my-4"></span>
            <!-- <v-btn @click="register" :x-large="$vuetify.breakpoint.smAndUp" class="my-3 orange white--text"
              >Register</v-btn
            > -->
          </div>
        </v-container>
      </v-carousel-item>
      
    </v-carousel>
    
 
</template>


<script>
export default {
  data() {
    return {
      carouselsData: [
        {
          src: 'https://i.pinimg.com/564x/19/07/73/1907734f1398a277a1a4e929dcaee3b0.jpg',
          heading: ' GO-FIT ',
          subHeading:
            'MEMBENTUK BADAN DAN MENJADI SEHAT BERSAMA GO-FIT!',
        },
        {
          src: 'https://i.pinimg.com/564x/5e/2f/9c/5e2f9c3cdeb9e8358a273997603bafa1.jpg',
          heading: ' GO-FIT ',
          subHeading:
            'MEMBENTUK BADAN DAN MENJADI SEHAT BERSAMA GO-FIT!',
        },
        {
          src: 'https://i.pinimg.com/564x/52/90/ee/5290eec8ead6e872146a6104ceca1f8c.jpg',
          heading: ' GO-FIT ',
          subHeading:
            'MEMBENTUK BADAN DAN MENJADI SEHAT BERSAMA GO-FIT!',
        },
      ],
    }
  },
  methods: {
    // register(){
    //   this.$router.push({
    //       name: "register",
    //   });
    // },
    login(){
      this.$router.push({
          name: "login",
      });
    },
    // contact(){
    //   this.$router.push({
    //     name: "AboutUs",
    //   })
    // }
  }
  }
</script>

<style>
.gradient-fill .v-responsive__content {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    to right,
    rgba(3, 12, 41, 0.75),
    rgba(5, 11, 31, 0.65)
  );
}
.carousel-item img {
        height:100vh!important ;
    }
</style>