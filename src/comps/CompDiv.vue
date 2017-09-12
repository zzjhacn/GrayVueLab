<template lang="html">
  <div :class="className">
    <draggable v-model="subComps" class="dragArea" :options="{group:{ name:'comp' }}">
      <component v-bind:is="r" v-for="(r, idx) in subComps" :key="this._uid" @click="changeCurr(idx)"></component>
      <slot v-if="subComps.length === 0">empty div</slot>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Vue from 'vue'
export default {
  name: 'CompDiv',
  components: {
    Draggable
  },
  data () {
    return {
      className: 'row b',
      subComps: []
    }
  },
  methods: {
    props () {
      return {
        className: {type: String, default: "row b"}
      }
    }
  },
}
</script>

<style lang="css">
</style>
