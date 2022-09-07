<template>
  <div id="container">
    <Menu></Menu>
    <div id="bg-plate">
      <button id="add-btn" @click="addEvent">ADD</button>
      <div id="swiper">
        <el-carousel :autoplay="false">
          <transition-group
            v-for="(Item, Index) in showList"
            :key="Index"
            class="el-carousel__item"
            tag="div"
            name="transitionPage"
          >
            <div
              class="tip"
              v-for="(item, index) in Item"
              :key="item.id"
              draggable="true"
              @dragstart="dragStart($event, index)"
              @dragover="allowDrop"
              @drop="drop($event, Index, index)"
            >
              <div class="tip-needle"></div>
              <span class="tip-event">{{ item.event }}</span>
              <span class="tip-time"
                >截至:{{ item.time.slice(0, 4) }}:{{ item.time.slice(5, 7) }}:{{
                  item.time.slice(8, 10)
                }}</span
              >
              <a href="javascript:;" @click="detail(Index, index)">详情</a>
              <a href="javascript:;" @click="cut(Index, index)">删除</a>
              <el-switch
                v-model="item.done"
                size="small"
                active-text="已完成"
                inactive-text="未完成"
                @click="hasdone(Index, index, item.done)"
              />
            </div>
          </transition-group>
        </el-carousel>
      </div>
    </div>
    <div id="mask"></div>
    <div id="window-container">
      <div id="pop-window">
        <button id="close-btn" @click="closeEvent">关闭</button>
        <h3>EVENT</h3>
        <div id="textarea-plate">
          <el-input
            v-model="textarea2.content"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="Please input event"
          />
        </div>
        <h3>DEADLINE</h3>
        <div id="time-input">
          <input type="text" v-model="year" />
          <span>年</span>
          <input type="text" v-model="month" />
          <span>月</span>
          <input type="text" v-model="day" />
          <span>日</span>
        </div>
        <button id="save-btn" @click="saveEvent('first')" v-if="updataed">
          SAVE
        </button>
        <button id="save-btn" class="updata-btn" @click="updata('next')" v-else>
          UPDATA
        </button>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<style lang="less" >
//注意:style标签内不要加scoped不然element-plus样式会失效，比如el-carousel__container的高度无法修改
#container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  #bg-plate {
    width: 500px;
    height: 700px;
    border-radius: 30px;
    background-color: transparent;
    backdrop-filter: blur(3px);
    border-left: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    #add-btn {
      width: 60px;
      height: 40px;
      margin-top: 15px;
      border-radius: 10px;
      border-style: none;
      background-color: orange;
      font-size: 18px;
      letter-spacing: 3px;
      text-align: center;
      line-height: 40px;
      color: white;
    }
    .transitionPage-move {
      transition: all 0.8s ease;
    }
    #swiper {
      width: 400px;
      height: 600px;
      //border: 1px solid red;
      margin-top: 10px;
      .el-carousel--horizontal {
        height: 600px;
      }
      .el-carousel__container {
        position: relative;
        height: 600px;
      }
      .el-carousel__item {
        background: transparent;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        .tip {
          width: 350px;
          height: 120px;
          border-radius: 15px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: antiquewhite;
          position: relative;
          user-select: none;
          margin-top: 20px;
          margin-bottom: 20px;
          .tip-needle {
            position: absolute;
            width: 20px;
            height: 20px;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
            background-color: transparent;
            backdrop-filter: blur(3px);
            border-left: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid rgba(255, 255, 255, 0.3);
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
          }
          .tip-time {
            position: absolute;
            bottom: 10px;
            left: 30%;
            transform: translateX(-50%);
            font-family: "Courier New", Courier, monospace;
            color: rgb(156, 21, 21);
            font-size: 17px;
          }
          .el-switch {
            position: absolute;
            right: 20px;
            bottom: 10px;
          }
          .tip-event {
            width: 200px;
            text-align: start;
            color: rgb(80, 18, 151);
            letter-spacing: 1px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          a {
            text-decoration: none;
            color: rgb(222, 132, 28);
          }
          a:hover {
            color: red;
          }
        }
        .tip:first-child {
          margin-top: 0;
        }
        .tip:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  #mask {
    display: none;
    opacity: 0;
    transition: all 0.4s;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  #window-container {
    display: none;
    opacity: 0;
    transition: all 0.4s;
    width: 370px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
  #pop-window {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid #ebebeb;
    box-shadow: 0px 0px 20px #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    #close-btn {
      position: absolute;
      width: 40px;
      height: 40px;
      border-style: none;
      top: -20px;
      right: -20px;
      border-radius: 50%;
      background-color: white;
      font-size: 10px;
      color: #867b7b;
    }
    .el-textarea {
      width: 300px;
    }
    h3 {
      margin-top: 10px;
      margin-bottom: 10px;
      color: #949090;
    }
    #time-input {
      display: flex;
      margin-top: 10px;
      input {
        width: 60px;
        margin: 0 5px 0 5px;
        border: 0;
        border-bottom: 1px dashed #949090;
        outline: none;
        text-align: center;
      }
    }
    #save-btn {
      width: 100px;
      height: 50px;
      border-style: none;
      background-color: orange;
      backdrop-filter: blur(3px);
      border-left: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      color: #e4e4e4;
      font-size: 19px;
      letter-spacing: 3px;
      margin-top: 50px;
      transition: all 0.5s;
    }
    #save-btn:hover {
      color: rgb(161, 30, 30);
    }
  }
}
</style>
<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import { checkTime, pieceTime } from "../../Function/checkTime";
import { findRelIndex } from "../../Function/findRelIndex";
import { findMaxID } from "../../Function/findMaxID";
import Menu from "./Menu.vue";
export default {
  data() {
    return {
      textarea2: {
        content: "",
      },
      year: "",
      month: "",
      day: "",
      MaxID: 0, //根据最大id为每个对象添加id
      updataed: true, //展示save按键还是updata按键（在弹窗中）
      showList: null, //showList是展示标签的对象数组，按照菜单模式决定是sortList还是list
      forbidden: true, //forbidden是true代表进入的是add，如果进入detail(详情)，那么修改forbidden为false
    };
  },
  components: {
    Menu,
  },
  methods: {
    addEvent: function () {
      if (this.mode === 2 || this.mode === 3) {
        if (this.forbidden) {
          return alert("只读状态，添加功能已禁用！");
        }
      }
      var mask = document.getElementById("mask");
      var window_container = document.getElementById("window-container");
      this.updataed = true;
      //console.log(mask, window_container);
      mask.style.display = "block";
      window_container.style.display = "block";
      setTimeout(() => {
        mask.style.opacity = 1;
        window_container.style.opacity = 1;
      }, 200);
    },
    closeEvent: function () {
      var mask = document.getElementById("mask");
      var window_container = document.getElementById("window-container");
      mask.style.opacity = 0;
      window_container.style.opacity = 0;
      this.year = "";
      this.month = "";
      this.day = "";
      this.textarea2.content = "";
      this.forbidden = true;
      setTimeout(() => {
        mask.style.display = "none";
        window_container.style.display = "none";
      }, 200);
    },
    saveEvent: function (option) {
      if (this.mode === 2 || this.mode === 3) {
        this.closeEvent();
        return alert("只读状态，添加功能禁用！");
      }
      let submitObj = {};
      if (this.textarea2.content.trim().length > 0) {
        let result = checkTime(this.year, this.month, this.day);
        if (!result) {
          this.year = "";
          this.month = "";
          this.day = "";
          return;
        }
        var deadline = pieceTime(this.year, this.month, this.day);
        submitObj.event = this.textarea2.content.trim();
        submitObj.time = deadline;
        submitObj.done = false;
        submitObj.id = ++this.MaxID;
        //console.log(submitObj);
        this.updataList([submitObj, option]);
        if (this.forbidden) {
          //是添加事件而非修改事件时才增加count,forbidden本来是用来判断禁用增加按钮还是修改按钮（修改功能本身是在增加功能基础上改的,需要新增变量来区别），这里刚好用上了
          this.updataCount({ option: "add", data: 0 });
        }
        // console.log('sortList:');
        // console.log(this.sortList);
        // console.log('list:');
        // console.log(this.list);
        if (this.mode === 0) {
          this.showList = this.list;
        } else if (this.mode === 1) {
          this.showList = this.sortList;
        }
        localStorage.setItem("List", JSON.stringify(this.list));
        this.closeEvent();
      } else {
        return alert("请写入具体的事件！");
      }
    },
    detail: function (Index, index) {
      //console.log(Index,index);
      this.forbidden = false;
      let showObj = null;
      if (this.passMode === 0) {
        showObj = this.list[Index][index];
      } else if (this.passMode === 1) {
        showObj = this.sortList[Index][index];
      }
      this.textarea2.content = showObj.event;
      this.year = showObj.time.slice(0, 4);
      this.month = showObj.time.slice(5, 7);
      this.day = showObj.time.slice(8, 10);
      this.addEvent();
      this.updataed = false;
      let obj = null;
      if (this.mode === 0) {
        obj = findRelIndex(this.list, this.sortList[Index][index]);
      } else if (this.mode === 1) {
        obj = { page: Index, item: index };
      }
      this.updataIndex(obj);
    },
    updata: function () {
      if (this.mode === 3 || this.mode === 2) {
        if (!this.forbidden) {
          alert("只读状态，修改功能已禁用！");
          this.closeEvent();
          return;
        }
      }
      this.saveEvent("next");
      this.closeEvent();
    },
    cut: function (Index, index) {
      if (this.mode === 1) {
        let { page, item } = findRelIndex(
          this.list,
          this.sortList[Index][index]
        );
        this.deleteList({
          page: page,
          item: item,
        });
        this.updataCount({ option: "delete", data: 0 });
        this.showList = this.list;
      } else if (this.mode === 0) {
        this.deleteList({
          page: Index,
          item: index,
        });
        this.showList = this.sortList;
      }
      else{
        return alert("只读模式，删除功能已禁用！");
      }
      this.updataCount({ option: "delete", data: 0 });
      //console.log(this.list);
      localStorage.setItem("List", JSON.stringify(this.list));
    },
    hasdone: function (Index, index, done) {
      if (this.mode === 2 || this.mode === 3) {
        this.list[Index][index].done = !done;
        return alert("只读状态，标记功能已禁用！");
      }
      localStorage.setItem("List", JSON.stringify(this.list));
    },
    changeList: function () {
      this.showList = [];
    },
    //取消默认行为
    allowDrop(e) {
      e.preventDefault();
    },
    //开始拖动
    dragStart(e, index) {
      if (this.mode === 0) {
        e.dataTransfer.setData("Text", index);
      }
    },
    //放置
    drop(e, Index, index) {
      if (this.mode === 0) {
        this.allowDrop(e);
        // console.log('drop index: ' + index);
        //使用一个新数组重新排序后赋给原变量
        let arr = this.list[Index].concat([]);
        // console.log("arr:");
        // console.log(arr);
        let dragIndex = e.dataTransfer.getData("Text");
        let temp = arr.splice(dragIndex, 1);

        arr.splice(index, 0, temp[0]);
        // console.log('sort');
        this.list[Index] = arr;
        this.updataAllList(this.list);
        this.showList = this.list;
        localStorage.setItem("List", JSON.stringify(this.list));
      } else {
        return alert("若需拖拽，请选择相应模式！");
      }
    },
    ...mapMutations([
      "updataCount",
      "updataList",
      "updataIndex",
      "updataAllList",
      "deleteList",
    ]),
  },
  computed: {
    ...mapState(["list", "count", "mode","passMode"]),
    ...mapGetters(["sortList", "doneList", "doingList"]),
  },
  mounted() {
    let storedList = JSON.parse(localStorage.getItem("List"));
    let d = new Date();
    let year = d.getFullYear();
    year = year > 9 ? year : "0" + year;
    let month = d.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    let date = d.getDate();
    date = date > 9 ? date : "0" + date;
    //console.log(storedList);
    if (
      storedList[0].length === 0 ||
      !Array.isArray(storedList) ||
      !Array.isArray(storedList[0])
    ) {
      storedList = [
        [
          {
            event:
              "使用介绍：使用上方ADD按钮添加新的便签，注意设定的截止时间不能早于当天，点击便签上的详情可以查看全部的内容，注意当前菜单模式(菜单位于右侧)。",
            done: false,
            time: `${year}年${month}月${date}日`,
            id: 0,
          },
        ],
      ];
    }
    //console.log(storedList)
    this.updataAllList(storedList);
    let len = this.list.length;
    let count = (len - 1) * 4 + this.list[len - 1].length;
    //console.log(count);
    this.updataCount({
      option: "assign",
      count: count,
    });
    this.MaxID = findMaxID(this.list);
    console.log(this.MaxID);
    this.showList = this.list;
  },
  watch: {
    mode() {
      //console.log(this.mode);
      let arrow = document.querySelector(".el-carousel__arrow--right");
      switch (this.mode) {
        case 0:
          this.showList = this.list;
          break;
        case 1:
          this.showList = this.sortList;
          break;
        case 2:
          this.showList = this.doingList;
          arrow.click();
          //console.log(this.showList);
          break;
        case 3:
          this.showList = this.doneList;
          arrow.click();
          // console.log(this.showList);
          break;
      }
    },
  },
};
</script>
