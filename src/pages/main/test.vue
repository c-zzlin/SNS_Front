<template>
  <div id="slider">
    <!-- img-container -->
    <div
      class="slider-imgcontainer"
      ref="container"
    >
      <img v-for="(img) in imgs" :src="img.url" alt="img.index" class="img_group">
    </div>
    <!-- index -->
    <div class="slider-buttons">
      <span v-for="(img) in imgs"
            class="slider-imgindex"
            :class="{ 'slider-imgindex-active': currentIndex === img.index }"
            @mouseover="doTheAnimate(img.index)"
      ></span>
    </div>
    <!-- left right button -->
    <div class="slider-move">
      <span class="to-left" @click="doTheAnimate('left')"><i class="iconfont">&#xe637;</i></span>
      <span class="to-right" @click="doTheAnimate('right')"><i class="iconfont">&#xe70a;</i></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'test',
    data () {
      /**
       * @property {array} imgs 图片组
       * @property {number} currentIndex 当前图片的索引
       * @property {array} buttons 索引按钮
       * @property {number} timer 计时器
       */
      return {
        imgs: [
          {url: '/static/img/1.jpg', index: 0},
        {url: '/static/img/1.jpg', index: 1},
          {url: '/static/img/1.jpg', index: 2},
          {url: '/static/img/1.jpg', index: 3}],
        currentIndex: 0,
        buttons: [0,1,2,3]
      }
    },
    methods: {
      /**
       * @method
       * @param {string} left 图片容器的left值
       * @desc 移动图片容器
       */
      move () {
        let left = `-${this.currentIndex * 100}%`
        this.$refs.container.style.left = left;
      },
      /**
       * @method
       * @param {number,string} arg 由Dom传递过来的参数，
       * 鼠标悬停事件传递的是number类型；鼠标点击事件传递的是string类型：'left' or 'right'
       * @desc 调整currentIndex的值，鼠标点击或是悬停都清空计时器，避免发生冲突
       */
      doTheAnimate (arg) {
        if(this.imgs.length == 1){
          return ;
        }
        // 鼠标悬停
        if (typeof (arg) == 'number') {
          this.currentIndex = arg;
          // 鼠标点击
        } else if (typeof (arg) == 'string') {
          if (arg && arg === 'left' && this.currentIndex >= 1) {
            this.currentIndex--;
          } else if (arg && arg === 'right' && this.currentIndex <= 2) {
            this.currentIndex++;
          }
        }
        this.move();
      },
      mounted () {
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 847125 */
    src: url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.eot');
    src: url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.woff') format('woff'),
    url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family:"iconfont";
    font-size:16px;
    font-style:normal;
  }
  #slider{
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 300px;
  }
  .slider-imgcontainer {
    position: absolute;
    left: 0;
    width: 400%;
    height: 300px;
    transition: left .5s linear;
  }
  .img_group {
    width: 25%;
    height: 300px;
  }
  .slider-buttons {
    position: absolute;
    width: 30%;
    left: 35%;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .slider-imgindex {
    cursor: pointer;
    width: 14px;
    height: 14px;
    margin: 0 10px;
    background-color: rgba(255, 248, 248, 0.98);
    border-radius: 7px;
    transition: width .3s linear;
  }
  .slider-imgindex-active {
    width: 60px;
  }
  .slider-move {
    position: absolute;
    top: 40%;
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .slider-move span {
    cursor: pointer;
    text-align: center;
    color: #fff;
    line-height: 60px;
    width: 50px;
    background-color: rgba(8,1,1,0.62);
  }
  .slider-move span:hover{
    background-color: rgba(8,1,1,0.9);
  }
</style>
