<template>
    <div class="text">
        <textarea placeholder="Input text" v-model="message" @keyup="onKeyup"></textarea>
        <v-btn fab dark large color="cyan" @click="onSend">
            <v-icon dark>edit</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    data(){return {message:""}},
    methods:{
        onKeyup(){
            this.$emit('typing');
        }, 
        onSend(){
            this.$emit("send", this.message);
            this.message = "";
        }
    }
}
</script>


<style lang="less" scoped>
.text {
  height: 100px;
  border-top: solid 1px #ddd;
  textarea {
    padding: 10px;
    height: 100%;
    width: 90%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
  .v-btn {
    float: right;
  }
}
</style>
