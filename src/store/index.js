import { createStore } from 'vuex'
import {sortedList,doneList,doingList,sliceList,flatList} from '../../Function/packageList'
export default createStore({
  state: {
    list: [[]],//记录事件的数组（二维数组）
    count: 0,//记录事件的个数
    index: {//修改时应该替换list数组中的索引
      page: 0,
      item: 0,
    },
    mode:0,//菜单展示的模式(按时间展示，不按时间展示，显示已完成，显示未完成)
    passMode:0,//为了防止切换到只读状态而不知道当前展示的列表是按时间排序还是不是而设置
  },
  getters: {
    sortList(state) {
      return sortedList(state.list);
    },
    doneList(state){//完成事件的数组
      return doneList(state.list);
    },
    doingList(state){//未完成事件的数组
      return doingList(state.list);
    }
  },

  mutations: {
    updataList(state, value) {
      if (value[1] === 'next') {
        state.list[state.index.page][state.index.item] = value[0];
      }
      else {
        var len1 = state.list.length - 1;
        //console.log(state.list,len1);
        if (state.list[len1].length === 4) {
          state.list.push([]);
          state.list[len1 + 1].push(value[0]);
        }
        else {
          state.list[len1].push(value[0]);
        }
        state.count++;
      }
    },
    deleteList(state,value){
      state.list[value.page].splice(value.item,1);
      if(state.list[value.page].length===0){
        state.list.slice(value.page,1);
      }
      state.list=sliceList(flatList(state.list));
      //console.log(this.sortList);
    },
    updataCount(state, value) {
      if (value.option === 'add') {
        state.count++;
      }
      else if (value.option === 'delete') {
        state.count--;
      }
      else if(value.option==='assign'){
        state.count=value.data;
      }
    },
    updataIndex(state, value) {
      state.index.page = value.page;
      state.index.item = value.item;
    },
    updataAllList(state, value) {
      if (value !== null) {
        state.list = value;
      }
    },
    updataMode(state,value){//更新菜单模式
      state.mode=value;
    },
    updataPassMode(state,value){
      state.passMode=value;
    }
  },
  actions: {
  },
  modules: {
  } 
})
