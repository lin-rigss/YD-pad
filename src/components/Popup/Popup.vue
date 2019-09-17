<template>
  <div class="mask">
    <ul class="maskContent">
      <li>
        <span class="field-l">添加备注：</span>
        <textarea v-model="msg" class="field-r" type="text" placeholder="备注信息"></textarea>
      </li>
      <li>
        <button @click="ok" class="btn maskBtn">提交</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ""
    };
  },
  props: ["title", "content"],
  methods: {
    ok() {
      this.$emit("sure", this.msg);
    }
  }
};
</script>


<style scoped lang='less'>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5;
}
.maskContent {
  // margin: 0 auto;
  width: 70%;
  height: 2.4rem;
  background: #fff;
  border-radius: 0.02rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  /* 使用元素居中显示 */
  padding: 0.3rem;
  z-index: 10;
  font-size: 0.25rem;
  li {
    line-height: 0.33rem;
    // margin-left: 0.2rem;
    width: 100%;
    display: flex;
    margin-bottom: -.2rem;
    .field-l {
      width: 20%;
    }
    .field-r {
      width: 80%;
      height: 1.5rem;
      border: 0.01rem solid #e4e4e4;
      font-size: 0.25rem;
      line-height: 0.33rem;
    }
  }
}
.maskBtn {
  width: 2.5rem;
  height: 0.55rem;
  line-height: 0.4rem;
  background-color: #0390f4;
  color: #fff;
  font-size: 0.3rem;
  border: none;
  border-radius: 0.1rem;
}
</style>