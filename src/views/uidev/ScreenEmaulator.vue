<template lang="html">
  <div class="b center-block" :style="{width: w + 'px', height: h + 'px'}">
    <div class="w-full bar b-n" style="height: 24px;">
      <div class="float-right">
        <img src="data:image/png;base64,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" ></img>
      </div>
    </div>
    <div :style="{width: w + 'px', height: (h-24-35) + 'px'}">
      <div class="h-full w-full" ref="screen">
        <draggable :list="items" class="dragArea h-full" @add="added" :options="{group:'devArea'}">
          <component v-bind:is="r" v-for="(r, idx) in items" :key="this._uid"></component>
        </draggable>
      </div>
    </div>
    <div class="w-full bar b-n" style="height: 35px;">
      <div class="text-center">
        <img src="data:image/png;base64,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"></img>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapState } from 'vuex'
import { scan } from './InstanceScanner'

export default {
  name: 'Drag',
  data () {
    return {
      w: 360,
      h: 640,
      items: []
    }
  },
  computed: mapState({
    instances: state => state.instances
  }),
  components: {
    Draggable
  },
  watch: {
    instances (nv) {
      this.items = nv
    }
  },
  methods: {
    added(e) {
      scan(this.$refs.screen)
    }
  }
}
</script>

<style lang="css">

.curr {
  border: 2px solid;
  border-color: red;
}

.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

.bar {
  background-color: #000000;
}

.titleBar {
  background-color: dimgray;
  border-bottom: 1px solid lightgray;
}

.title {
  color: white;
  font-size: 90%;
}

</style>
