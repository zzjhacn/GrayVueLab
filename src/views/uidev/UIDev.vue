<template lang="html">
  <split-panes>
    <CompList slot="left" class="left" />
    <div slot="right" class="row m-n w-full h-full">
      <div class="col-md-4 h-full">
        <ScreenEmaulator />
      </div>
      <div class="col-md-4">
        <Inspector :target="inspectedInstance" />
      </div>
      <div class="col-md-4">
        <InstancesTree :instances="instances"/>
      </div>
    </div>
  </split-panes>
</template>

<script>
import SplitPanes from '@/containers/SplitPanes'

import CompList from './CompList'
import ScreenEmaulator from './ScreenEmaulator'
import InstancesTree from './InstancesTree'
import Inspector from './Inspector'

import {
  mapState
} from 'vuex'

export default {
  name: 'UIDev',
  computed: mapState('components', {
    instances: state => state.instances,
    inspectedInstance: state => state.inspectedInstance
  }),
  watch: {
    instances(nv) {}
  },
  components: {
    SplitPanes,
    CompList,
    ScreenEmaulator,
    InstancesTree,
    Inspector,
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  updated() {}
}
</script>

<style lang="stylus">
.left
  height 100%
  overflow-x hidden
  overflow-y hidden
  max-height 640px

.dragArea
  min-height 100px
  background-color #ccc

</style>
