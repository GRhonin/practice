<template>
  <div class="page-content">
    <div class="page-form">
      <div class="form-item">
        <div class="left font65">日期</div>
        <div class="right color-gray" @click="openPicker()">
          {{buy_time}}
          <i class="iconfont arrow-down">&#xe605;</i>
        </div>
      </div>
      <TimePicker :pDate="buy_time" v-if="showPicker" @closePicker="closePicker"></TimePicker>
    </div>
  </div>
</template>
<script>
import TimePicker from "../components/TimePicker";
import { Toast } from "mint-ui";
export default {
  components: {
    TimePicker: TimePicker,
  },
  data() {
    return {
      buy_time: "请选择",
      address: "",
      showPicker: false
    };
  },
  methods: {
    openPicker() {
      this.showPicker = true;
    },
    closePicker(date) {
      if (date) {
        this.buy_time = `${date.year}-${date.month}-${date.day}`;
      } else {
        this.buy_time = "请选择";
      }
      this.showPicker = false;
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./../assets/px2rem.scss";
.page-content {
  height: 100%;
}
.page-form {
  width: px2rem(950);
  padding-left: px2rem(61);
  border-radius: px2rem(10) px2rem(10) px2rem(30) px2rem(30);
  background-color: #ffffff;
  margin: 0 auto;
  margin-top: px2rem(60);
  .form-item {
    height: px2rem(150);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: px2rem(57);
    width: px2rem(898);
    font-size: px2rem(32);
    border-bottom: thin solid #eeeeee;
    .left {
      position: relative;
      .iconfont {
        position: absolute;
        left: px2rem(-40);
        color: #ff0000;
        font-size: px2rem(32);
      }
    }
    .right {
      text-align: right;
      font-size: px2rem(42);
      .arrow-down {
        font-size: px2rem(30);
      }
    }
    input {
      width: px2rem(400);
      border: none;
      outline: none;
      text-align: right;
      font-size: px2rem(42);
    }
    input::placeholder {
      font-size: px2rem(42);
    }
  }
}
</style>