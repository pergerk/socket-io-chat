<template>
    <v-container class="scroll-y" id="messages" ref="messages">
        <v-layout align-space-around justify-start column>
            <div class="message">
                <ul v-if="messages">
                    <li v-for="item in messages" :key="item.date">
                        <p class="time">
                            <span>{{ item.date | time }}</span>
                        </p>
                        <div class="main" :class="{ self: item.senderId == userId }">
                            <svg class="avatar" height="30" width="30">
                                <text class="av" x="6" y="24" fill="red" style="font-size: 25px;">V</text>
                            </svg>
                            <div class="text">
                                <div class="icon">
                                    <v-icon small v-if="item.id">done</v-icon>
                                    <v-icon small v-else>history</v-icon>
                                </div>{{ item.message }}</div>

                        </div>
                    </li>
                    <li ref="end"></li>
                </ul>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:['messages'],
    computed: {
        ...mapState(["userId"])
    },
    methods: {
        onKeyup() {
            
        }
    },
    mounted() {
        this.$refs.end.scrollIntoView(true);
    },
    watch: {
        messages: function(){ 
            this.$refs.end.scrollIntoView(true);
        }
    },
    filters: {
        time (date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            return date.getHours() + ':' + date.getMinutes();
        }
        
    },
}
</script>


<style lang="less" scoped>
.message {
  height: ~'calc(100% - 160px)';
  padding: 10px 15px;
  overflow-y: scroll;
  ul {
    list-style: none;
  }
  li {
    margin-bottom: 15px;
  }
  .time {
    margin: 7px 0;
    text-align: center;
    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }
  .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 15px;
    border: #fafafa 1px solid;
  }
  .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: ~'calc(100% - 40px)';
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    color: black;
    border-radius: 4px;
    &:before {
      content: ' ';
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
    > .icon {
      position: relative;
      float: right;
      margin-left: 25px;
    }
    > .icon i {
      color: black;
    }
  }
  .self {
    text-align: right;
    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      background-color: #b2e281;
      > .icon i {
        color: #fff;
      }
      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}
</style>