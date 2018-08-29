<template>
    <div id="chat" ref="chat" v-resize="onResize">
        <chat-messages :style="{'max-height': maxHeight + 'px'}" :messages="messages"></chat-messages>
        <div id="input-container" ref="input">
            <chat-input @typing="onTyping" @send="onSend"></chat-input>
        </div>
    </div>
</template>
<script>
import ChatMessages from './Messages';
import ChatInput from './Input';
export default {
    props: ['id'],
    data(){
        return {
        maxHeight: 200
        }
    },
    computed:{
        messages(){
            return this.$store.state.chats[this.id].messages;
        }
    },
    methods:{
        onResize() {
            this.maxHeight = this.$refs.chat.clientHeight -  this.$refs.input.clientHeight;
        },
        onSend(message){
            if(message){
                this.$store.dispatch('sendMessage', {id: null, ident:Math.random().toString(36).replace(/[^A-z0-9]+/g, '').substr(0, 10) , date: (new Date()).toISOString(), message: message, chatId: this.id});
            }
        },
        onTyping(){
        }
    },
    mounted(){
        this.maxHeight = this.$refs.chat.clientHeight - this.$refs.input.clientHeight;
    },
    components: {ChatMessages,ChatInput}
}
</script>
<style lang="less" scoped>
#chat {
  width: 100%;
  height: 100%;
}
#input-container {
  bottom: 0px;
  left: 0px;
  width: 100%;
  position: absolute;
}
</style>


