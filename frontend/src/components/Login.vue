<template>
    <v-app id="login" dark>
        <v-content>
            <v-container fluid>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-tooltip bottom>
                                    <v-btn icon large target="_blank" slot="activator">
                                        <v-icon large>code</v-icon>
                                    </v-btn>
                                    <span>Source</span>
                                </v-tooltip>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" v-model="login" label="Login" type="text"></v-text-field>
                                    <v-text-field prepend-icon="lock" v-model="password" label="Password" id="password" type="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="authorize()">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {

    computed: {
        login: {
            get(){
                return this.$store.state.login
            },
            set(value){
                this.$store.commit('setLogin',value)
            }
        },
        password: {
            get(){
                return this.$store.state.password
            },
            set(value){
                this.$store.commit('setPassword',value)
            }
        },
        ...mapState(['authenticated'])
    },
    methods:{
        ...mapActions(["authorize"])
    },
    watch: {
        authenticated(val){
            if(val) this.$router.push('/');
        }
    },
    mounted() {
        if(this.authenticated){
            this.$router.push('/');
        }
    }
    
}
</script>

