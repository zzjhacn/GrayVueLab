<template>
<div class="scroll-pane">
  <div class="header">
    <slot name="header"></slot>
  </div>
  <div ref="scrollContainer" class="scroll">
    <slot name="scroll"></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    scrollEvent: String
  },
  mounted() {},
  destroyed() {},
  methods: {
    scroll() {
      this.$nextTick(() => {
        const container = this.$refs.scrollContainer
        if (container.children.length) {
          container.scrollTop = container.children[0].offsetHeight
        }
      })
    }
  }
}
</script>
<style lang="css">
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 4px;
    height: 4px;
    background-color: #F5F5F5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 5px;
    background-color: #F5F5F5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}
</style>
