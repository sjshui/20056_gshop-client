<template>
  <div class="pagination">
    <button :class="{disable:myCurrentPage===1}" 
    @click="setCurrentPage(myCurrentPage-1)"
    :disabled="myCurrentPage===1">上一页</button>
    <button v-if="startEnd.start != 1" @click="setCurrentPage(1)">1</button>
    <button class="disable" v-if="startEnd.start>2">...</button>

    <!-- 
     // 多执行了从1到star-1的v-for遍历和v-if的判断
     <button v-for="(item,index) in startEnd.end" :key="index"
     v-if="item>=startEnd.start"
     :class="{active: item === myCurrentPage }"
     @click="setCurrentPage(item)">{{item}}</button> -->
     <button v-for="(item,index) in startEndArr" :key="index"
     :class="{active: item === myCurrentPage }"
     @click="setCurrentPage(item)">{{item}}</button>

     <!-- <div v-if="isShow">
        <button v-for="(item,index) in startEnd.end" :key="index"
        :class="{active: item === myCurrentPage }"
        @click="setCurrentPage(item)">{{item}}</button>
     </div> -->
     
    <!-- <button>4</button>
    <button class="active">5</button>
    <button>6</button>
    <button>7</button> -->

    <button class="disable" v-if="startEnd.end<totalPages-1">...</button>
    <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
    <button :class="{disable:myCurrentPage===totalPages}" 
    @click="setCurrentPage(myCurrentPage+1)"
    :disabled="myCurrentPage===totalPages">下一页</button>
    <button class="disable">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    currentPage: {
      // 当前页码
      type: Number,
      default: 1,
    },
    total: {
      // 所有数据的数量
      type: Number,
      default: 0,
    },
    pageSize: {
      // 每页的最大数量
      type: Number,
      default: 10,
    },
    showPageNo: {
      //最大连续页码数
      type: Number,
      default: 5,
      // 要求传的值是奇数
      validator: function (value) {
        return value % 2 === 1;
      },
    },
  },

  data() {
    return {
      myCurrentPage: this.currentPage, // 初始值由父组件来指定
      isShow:true
    };
  },

  computed: {
    /* 
        总页数
    */
    totalPages() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },

    /* 
        包含从start到end的数组
    */
    startEndArr(){
        const arr = []
        const {start, end} = this.startEnd
        for(let page = start; page <=end ; page++){
            arr.push(page)
        }
        return arr
    },

    /* 
        start/end: 连续页码数的开始页码与结束页码 {start: 3, end: 7}
    */
    startEnd() {
      let start, end;
      const { myCurrentPage, showPageNo, totalPages } = this;

      // 计算start
      /* 
        myCurrentPage  showPageNo  totalPages
        4               5            8         23[4]56
        start = 4 - 2
      */
      // start = myCurrentPage - (showPageNo - 1 )/2
      start = myCurrentPage - Math.floor(showPageNo / 2);
      // 如果myCurrentPage比较小，计算的结果有可能小于1 start>=1
      /* 
        myCurrentPage  showPageNo  totalPages
        1               5            8         [1]2345
        上面的计算的结果为  1-2 
      */
      if (start < 1) {
        start = 1;
      }

      // 计算
      /* 
        myCurrentPage  showPageNo  totalPages
        4               5            8         23[4]56
        start = 2
        end = 2 + 5 -1
      */
      end = start + showPageNo - 1;
      // end的最大值为totalPages
      /* 
        myCurrentPage  showPageNo  totalPages
        8               5            8         4567[8]
        上面算出的
        start = 6   ==> 4
        end = 10 ==> 超过了totalPages 8
      */
      if(end > totalPages){
          // 修改end为totalPages
          end = totalPages
          // 修正start
          start = end - showPageNo + 1
          // 一旦总页数小于最大连续页码数 ==> start<1
          /* 
            myCurrentPage  showPageNo  totalPages
            3               5            4        12[3]4
            上面算出的 
            end = 4
            start = 0 ===> 应该为1
          */
         if(start < 1){
             start = 1
         }
      }

      return { start, end };
    },
  },

  watch:{
      currentPage(value){
          this.myCurrentPage = value
      }
  },

  methods:{
      /* 设置新的当前页码 */
      setCurrentPage(page){
        // 如果页码没有变化，直接结束
        if(this.myCurrentPage === page) return
        //更新当前页码
        this.myCurrentPage = page

        // 分发自定义事件通知父组件
        this.$emit('currentChange',page)
      }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &.active {
      background: rgb(99, 141, 105);
      color: rgb(255, 255, 255);
      cursor: no-drop;
    }

    &.disable {
      background: rgb(233, 233, 233);
      cursor: no-drop;
    }
  }
}
</style>