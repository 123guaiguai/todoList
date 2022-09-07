<template>
  <div id="Menu">
    <div id="selec-menu" @click="showMenu">MENU</div>
    <div class="option-menu">
      <div class="option-item" @click="changeMode(0)">非时间排列(拖拽启用)--默认</div>
      <div class="option-item" @click="changeMode(1)">时间排列(拖拽禁用)</div>
      <div class="option-item" @click="changeMode(2)">展示未完成(只读)</div>
      <div class="option-item" @click="changeMode(3)">展示已完成(只读)</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
#Menu {
  position: absolute;
  right: 100px;
  top: 200px;
  width: 250px;
  cursor: pointer;
  box-sizing: border-box;
  #selec-menu {
    background-color: #333740;
    padding:10px  20px ;
    border-radius: 8px;
    color: #b1b8ca;
    border-radius: 8px;
    border: 1px solid #494d59;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  #selec-menu:hover{
    color:#fff;
    border: 1px solid #2c62f6;
    box-shadow: 0 0 0 1px rgba(44,98,246,0.4);
  }
  .option-menu{
    width:250px;
    margin-top:2px;
    border-radius: 8px;
    background-color: #fff;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    height:0px;
    overflow: hidden;
    .option-item{
        padding:10px 0;
        padding-left:5px;
        color:rgb(59, 2, 2);
        font-weight:500;
        font-size:17px;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position:relative;
    }
    .option-item:hover{
        color:red;
    }
  }
  .option-menu.active{
    height:160px;
  }
}
</style>
<script>
import { computed } from '@vue/runtime-core';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
    data(){
        return{

        }
    },
    methods:{
        showMenu:function(){
            let selecMenu=document.querySelector('#selec-menu');
            let optionMenu=document.querySelector('.option-menu')
            optionMenu.classList.toggle('active');
        },
        changeMode:function(option){
            this.updataMode(option);
            if(option===0||option===1){
              this.updataPassMode(option);
            }
        },
        ...mapMutations(['updataMode',"updataPassMode"])
    },
    computed:{
        ...mapGetters(['sortList',]),
        ...mapState(['mode']),
    }
};
</script>