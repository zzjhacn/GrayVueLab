<template lang="html">
<span>
  <li v-for="(v, k) in model">
    <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
      {{k}} {{isFolder(v) ? '' : '= ' + v}}
      <span v-if="isFolder(v)">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder(v)">
      <tree class="item" :model="v" />
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</span>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'tree',
  props: {
    model: [Array, Object]
  },
  data() {
    return {
      open: true
    }
  },
  computed: {},
  methods: {
    isFolder: function(v) {
      return typeof(v) === 'object' || typeof(v) === 'array'
    },
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function() {
      if (!this.isFolder) {
        this.$set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function() {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
}
</script>

<style lang="css">
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
