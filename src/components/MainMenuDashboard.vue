<template>
    <v-main>
        <h1 class="text font-weight-medium mb-5 text-center">MENU GO-FIT</h1>
        <v-item-group>
            <v-container>
                <v-row>
                    <v-col v-for="n in 1" :key="n" cols="6" md="4">
                        <v-card :loading="loading" class="mx-auto my-12" max-width="340">
                            <v-img
                            height="300"
                            src="https://i.pinimg.com/564x/17/27/03/172703653b954d48e361e7d089373b27.jpg"
                            ></v-img>

                            <v-card-title class="d-flex justify-content-center"><strong>Data Member </strong></v-card-title>

                            <v-card-text>
                                <div class="my-4 text-subtitle-1">
                                    Melihat Seluruh Informasi Data Member
                                    Yang Terdaftar Dalam GO-FIT.
                                </div>
                            </v-card-text>
                            

                            <v-divider class="mx-4"></v-divider>
                            <v-card-actions>
                                <v-btn color="deep-purple lighten-2" text @click="reserve">
                                    MEMBER
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col v-for="n in 1" :key="n" cols="12" md="4">
                        <v-card :loading="loading" class="mx-auto my-12" max-width="340">
                            <v-img
                            height="300"
                            src="https://i.pinimg.com/564x/48/79/18/4879180bf6db66e44a279116a889392b.jpg"
                            ></v-img>

                            <v-card-title class="d-flex justify-content-center"><strong>Instruktur </strong></v-card-title>

                            <v-card-text>
                                <div class="my-4 text-subtitle-1">
                                    Melihat Seluruh Informasi Data Instruktur
                                    Yang Bekerja Di GO-FIT.
                                </div>
                            </v-card-text>
                            

                            <v-divider class="mx-4"></v-divider>
                            <v-card-actions>
                                <v-btn color="deep-purple lighten-2" text @click="reserve">
                                    INSRUKTUR
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col v-for="n in 1" :key="n" cols="12" md="4">
                        <v-card :loading="loading" class="mx-auto my-12" max-width="340">
                            <v-img
                            height="300"
                            src="https://i.pinimg.com/736x/d2/2f/51/d22f519e4718833626353ae7831319a2.jpg"
                            ></v-img>

                            <v-card-title class="d-flex justify-content-center"><strong>Jadwal Umum </strong></v-card-title>

                            <v-card-text>
                                <div class="my-4 text-subtitle-1">
                                    Melihat Seluruh Informasi Jadwal Umum
                                    Yang Berada Di GO-FIT.
                                </div>
                            </v-card-text>
                            

                            <v-divider class="mx-4"></v-divider>
                            <v-card-actions>
                                <v-btn color="deep-purple lighten-2" text @click="reserve">
                                    Jadwal Umum
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                </v-row>
            </v-container>
        </v-item-group>
    </v-main>
</template>
<style>
.text {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
<script>
export default {
    data: () => ({
        loading: false,
        selection: 1,
    }),
    methods: {
        reserve(){
            this.$router.push('/member')
        }
    }
};
</script>