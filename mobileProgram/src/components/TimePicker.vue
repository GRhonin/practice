<template>
  <div class="picker-container" @click.prevent="closePicker(false)">
    <div class="picker-content" @click.stop="doNothing">
      <div class="date-container">
        <div class="select-content">
          <div class="select-item">
            <div class="add-btn" @click="reduceYear">
              <i class="iconfont">&#xe703;</i>
            </div>
            <div class="center">{{changeDate.year}}</div>
            <div class="add-btn" @click="releaseYear">
              <i class="iconfont">&#xe72d;</i>
            </div>
          </div>
          <div class="select-item">
            <div class="add-btn" @click="reduceMonth">
              <i class="iconfont">&#xe703;</i>
            </div>
            <div class="center">{{changeDate.month}}</div>
            <div class="add-btn" @click="releaseMonth">
              <i class="iconfont">&#xe72d;</i>
            </div>
          </div>
        </div>
        <div class="week-content">
          <div class="item">周日</div>
          <div class="item">周一</div>
          <div class="item">周二</div>
          <div class="item">周三</div>
          <div class="item">周四</div>
          <div class="item">周五</div>
          <div class="item">周六</div>
        </div>
        <div class="day-content">
          <div class="day-row" v-for="(week,index) in dates" :key="index">
            <div
              :class="dateClass(item.date,item.index,$index)"
              @click="selectDays(item.date,item.index,$index)"
              v-for="(item,$index) in week"
              :key="item.index"
              v-text="setDate(item.date)"
            ></div>
          </div>
        </div>
      </div>
      <!-- 底部提示及按钮 -->
      <div class="footer">
        <!-- <div class="tip">温馨提示: 具体上门时间与服务商与您沟通约定为准，敬请留意</div> -->
        <div class="btn-content">
          <div class="picker-btn cancel" @click="closePicker(false)">取消</div>
          <div class="picker-btn submit" @click="closePicker(true)">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pDate: {
      default: undefined
    }
  },
  data() {
    return {
      time: "xx",
      dateIndex: null, // 选中哪个日期天数
      changeDate: {
        year: "",
        month: ""
      },
      // 今天 固定
      curDate: {
        year: "",
        month: "",
        day: "",
        week: ""
      },
      // 点击变化日期
      date: {
        year: "",
        month: "",
        day: "",
        week: ""
      },
      monthDays: [], // 本月天数加前面空白的数组
      dates: []
    };
  },
  mounted() {
    // 初始化日期
    this.initDate();
    // for (let i = 0; i < 7; i++) {
    //   this.dates.push(i + 1);
    // }
  },
  methods: {
    initDate() {
      let date = new Date();
      let year = date.getFullYear();
      let iMonth = date.getMonth() + 1;
      let month = iMonth > 9 ? iMonth : `0${iMonth}`;
      this.curDate.year = year;
      this.curDate.month = month;
      this.curDate.week = date.getDay();
      this.curDate.day = date.getDate();
      // 父组件给了数据
      if (this.pDate != "请选择") {
        let dateArr = this.pDate.split("-");
        this.date.year = dateArr[0];
        this.date.month = dateArr[1];
        this.date.day = dateArr[2];
        this.changeDate.year = dateArr[0];
        this.changeDate.month = dateArr[1];
      } else if (this.pDate == "请选择") {
        // 父组件没给数据
        this.date.year = year;
        this.date.month = month;
        this.date.week = date.getDay();
        this.date.day = date.getDate();
        this.changeDate.year = year;
        this.changeDate.month = month;
      }
      this.setMonthDays();
    },
    // 点击日历上某一天时触发
    selectDays(date, index, week) {
      // 如果是今天或者今天之前则不能选择
      // if (date <= this.date.day) {
      //   alert("必须从明天开始选择");
      //   return;
      // }
      this.dateIndex = index;
      this.date.day = date;
      this.date.year = this.changeDate.year;
      this.date.month = this.changeDate.month;
    },
    // 返回不同的日期样式
    dateClass(date, index, week) {
      // 今天之前的天数
      if (
        this.date.day == date &&
        this.curDate.day == date &&
        this.date.month == this.changeDate.month &&
        this.date.year == this.changeDate.year
      ) {
        // 被选中的是今天
        return "item selected today";
      }
      if (
        this.date.day == date &&
        this.date.month == this.changeDate.month &&
        this.date.year == this.changeDate.year
      ) {
        // 代表被选中的这一天
        return "item selected";
      } else if (
        this.curDate.day == date &&
        this.curDate.year == this.changeDate.year &&
        this.curDate.month == this.changeDate.month
      ) {
        // 今天
        return "item today";
      }
      return "item";
    },
    // 根据年月及月天数补全本月数组
    doNothing() {},
    setMonthDays() {
      // 当月天数
      this.dates = [];
      this.monthDays = [];
      let days = this.getMonthDays(this.changeDate.year, this.changeDate.month);
      let firstDay = new Date( // 本月第一天是周几
        this.changeDate.year,
        Number(this.changeDate.month) - 1
      ).getDay();
      // 数组总数量
      let count = days + firstDay;
      for (let i = 0; i < count; i++) {
        let d = i - firstDay + 1;
        let item = {
          index: i,
          date: d > 0 ? d : 0
        };
        this.monthDays.push(item);
      }
      let temps = [];
      for (let i = 0; i < this.monthDays.length; i++) {
        temps.push(this.monthDays[i]);
        if (temps.length == 7) {
          this.dates.push(temps);
          temps = [];
        } else if (i == this.monthDays.length - 1) {
          for (let j = 0; j < 7; j++) {
            if (temps.length < 7) {
              temps.push({ date: 0, index: 40 + j });
            }
          }
          this.dates.push(temps);
        }
      }
    },
    setDate(day) {
      if (day == 0) {
        return "";
      } else if (
        day == this.curDate.day &&
        this.curDate.year == this.changeDate.year &&
        this.curDate.month == this.changeDate.month
      ) {
        return "今天";
      }
      return day;
    },
    // 关闭picker
    closePicker(hasDate) {
      if (hasDate) {
        this.date.year = this.changeDate.year;
        this.date.month = this.changeDate.month;
        this.$emit("closePicker", this.date);
      } else {
        this.$emit("closePicker");
      }
    },
    // 年增加
    releaseYear() {
      this.changeDate.year = Number(this.changeDate.year) + 1;
      this.setMonthDays();
    },
    // 年减少
    reduceYear() {
      this.changeDate.year = Number(this.changeDate.year) - 1;
      this.setMonthDays();
    },
    // 月增加
    releaseMonth() {
      let iMonth = Number(this.changeDate.month) + 1;
      let month = iMonth;
      if (iMonth == 13) {
        month = 1;
        this.releaseYear();
      }
      this.changeDate.month = month > 9 ? month : `0${month}`;
      this.setMonthDays();
    },
    // 月减少
    reduceMonth() {
      let iMonth = Number(this.changeDate.month) - 1;
      let month = iMonth;
      if (iMonth == 0) {
        month = 12;
        this.reduceYear();
      }
      this.changeDate.month = month > 9 ? month : `0${month}`;
      this.setMonthDays();
    },
    // 根据年月返回当月天数
    getMonthDays(year, month) {
      if (Number(year) < 1 || Number(year) > 10000 || year === null) {
        throw "Not a valid year";
      } else if (Number(month) < 1 || Number(month) > 12) {
        throw "Not a valid month";
      } else {
        var d = new Date(year, month, 0);
        return d.getDate();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./../assets/px2rem.scss";

.picker-container {
  position: fixed;
  z-index: 20000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .picker-content {
    background-color: #eeeeee;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    max-height: px2rem(1800);
    // padding-bottom: px2rem(130);
    overflow-y: auto;
    // 周标题
    .week-content {
      height: px2rem(103);
      background-color: #f7f7f7;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        font-size: px2rem(36);
        color: #000000;
        font-weight: bold;
      }
    }
    // 日期选择
    .day-content {
      background-color: #ffffff;
      .day-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        padding: px2rem(37) 0;
        .item {
          width: px2rem(76);
          height: px2rem(76);
          line-height: px2rem(76);
          text-align: center;
          font-size: px2rem(36);
        }
        .selected {
          color: #ffffff;
          background-color: $globalColor;
          border-radius: px2rem(38);
        }
        .today {
          color: $globalColor;
          font-size: px2rem(32);
          font-weight: bold;
        }
        .selected.today {
          font-size: px2rem(32);
          color: #ffffff;
        }
      }
    }
    .date-container {
      // 头部选择年月部分
      margin-bottom: px2rem(20);
      .select-content {
        height: px2rem(144);
        background-color: #ffffff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .select-item {
          width: px2rem(440);
          height: px2rem(90);
          display: flex;
          border-radius: px2rem(6);
          background-color: #eeeeee;
          justify-content: space-between;
          .add-btn {
            height: px2rem(90);
            width: px2rem(90);
            background-color: #e1e3e9;
            border-radius: px2rem(6);
            text-align: center;
            flex-shrink: 0;
            .iconfont {
              color: $globalColor;
            }
          }
          .center {
            flex-grow: 1;
            font-size: px2rem(42);
            font-weight: bold;
            text-align: center;
            line-height: px2rem(90);
          }
        }
      }
    }
    .tip {
      background-color: #f7f7f7;
      padding: px2rem(15) px2rem(75) 0 px2rem(69);
      color: #ff3333;
      font-size: px2rem(36);
      height: px2rem(180);
      margin: px2rem(20) 0;
      padding-top: px2rem(34);
      letter-spacing: px2rem(2);
      line-height: px2rem(45);
    }
    .btn-content {
      height: px2rem(130);
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: #ffffff;
      // position: absolute;
      // bottom: 0;
      // left: 0;
      // right: 0;
      .picker-btn {
        width: px2rem(440);
        height: px2rem(90);
        font-size: px2rem(36);
        border-radius: px2rem(6);
        text-align: center;
        line-height: px2rem(90);
      }
      .picker-btn.cancel {
        border: thin solid #dddddd;
        color: #333333;
      }
      .picker-btn.submit {
        border: thin solid $globalColor;
        color: $globalColor;
      }
    }
  }
}
</style>