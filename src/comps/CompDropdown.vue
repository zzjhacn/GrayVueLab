<template lang="html">
  <dropdown :disabled="disabled" :size="size" :type="type" :text="text">
    <li v-for="li in lis" :key="this._uid">{{li}}</li>
  </dropdown>
</template>

<script>
import { dropdown } from 'vue-strap'

export default {
  name: 'CompDropdown',
  components: {
    dropdown
  },
  // props: {
  //   disabled: {type: Boolean, default: false},
  //   size: {type: String, default: null},
  //   text: {type: String, default: null},
  //   type: {type: String, default: 'default'},
  //   value: {type: Boolean, default: false}
  // },
  methods: {
    props () {
      return {
        name: {type: String, default: this.name},
        disabled: {type: Boolean, default: this.disabled},
        size: {type: String, default: this.size, opts: ['lg', 'xs', 'sm']},
        text: {type: String, default: this.text},
        type: {type: String, default: this.type},
        lis: {type: Array, default: this.lis}
      }
    }
  },
  data () {
    return {
      name: 'CompDropdown',
      disabled: false,
      size: 'md',
      type: 'info',
      text: 'dropdown',
      lis: []
    }
  }
}
</script>

<style lang="css">
</style>
