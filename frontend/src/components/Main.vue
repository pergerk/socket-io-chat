<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">Открытые чаты</v-subheader>
        <v-list>
          <v-list-tile v-for="chat in chats" :key="chat.id" avatar @click="$router.push({name: 'chat', params:{id: chat.id}})">
            <v-list-tile-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${chat.id}.jpg`" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="chat.theme"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile class="mt-3">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Новый чат</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Chat example</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
      drawer: true,
      
    }),
    props: {
      source: String
    },
    computed:{
      ...mapState(['chats'])
    },
    mounted() {
      this.$store.dispatch('authorize');
    }
}
</script>
