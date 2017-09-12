<template>
<section v-if="!hasTarget" class="notice">
  <div>Select a component instance to inspect.</div>
</section>
<div v-else-if="!target.state || !target.state.length" class="notice">
  <div>This instance has no reactive state.</div>
</div>
<section v-else class="data">
  <state-inspector :state="filteredState" />
</section>
</template>

<script>
import StateInspector from './StateInspector'
const isChrome = typeof chrome !== 'undefined' && chrome.devtools
import { searchDeepInObject, sortByKey } from './util'
import _ from 'lodash'

export default {
  components: {
    StateInspector
  },
  props: {
    target: Object
  },
  data() {
    return {
      filter: ''
    }
  },
  computed: {
    hasTarget() {
      return this.target.id != null
    },
    filteredState() {
      return _.groupBy(sortByKey(this.target.state.filter(el => {
        return searchDeepInObject({
          [el.key]: el.value
        }, this.filter)
      })), 'type')
    }
  },
  methods: {
    inspectDOM() {
      if (!this.hasTarget) return
      if (isChrome) {
        chrome.devtools.inspectedWindow.eval(
          `inspect(window.__VUE_DEVTOOLS_INSTANCE_MAP__.get("${this.target.id}").$el)`
        )
      } else {
        window.alert('DOM inspection is not supported in this shell.')
      }
    }
  }
}
</script>
