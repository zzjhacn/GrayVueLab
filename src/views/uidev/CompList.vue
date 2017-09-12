<template lang="html">
<scroll-pane>
  <action-header slot="header">
    <button-group v-model="grp" :justified="true" class="w-full" type="success" :buttons="true">
      <radio v-for="(v, k, idx) in compGroup" :key="'r_'+idx" :selected-value="k">{{k}}</radio>
    </button-group>
    <div class="search">
      <div class="input-group input-group-sm">
        <span class="input-group-addon"><i class="fa fa-search "></i></span>
        <input placeholder="Filter components" v-model="filter">
      </div>
    </div>
  </action-header>
  <div slot="scroll" style="max-height: 570px; overflow-x: hidden; overflow-y: auto">
    <ul class="list-group" ref="compListArea">
      <draggable :list="currList" class="dragArea" :clone="copy" :options="{group: {name: 'devArea', pull:'clone', put:false}}">
        <transition-group>
          <li class="list-group-item" v-for="(v, idx) in currList" :key="'comp' + idx">{{v.name || v.__file}}</li>
        </transition-group>
      </draggable>
    </ul>
  </div>
</scroll-pane>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'

import Draggable from 'vuedraggable'
import ActionHeader from '@/containers/ActionHeader'
import ScrollPane from '@/containers/ScrollPane'
import { buttonGroup, radio, tabs, tab} from 'vue-strap'

import { Actionsheet, Alert, Badge, Blur, ButtonTab, Calendar, Card, CellBox, CellFormPreview, Cell, CheckIcon, Checker, Checklist, Clocker, ColorPicker, Confirm, Countdown, Countup, DatetimeRange, DatetimeView, Datetime, Divider, Drawer, Flexbox, Flow, FormPreview, Grid, Group, Icon, InlineCalendar, InlineLoading, InlineXNumber, LoadMore, Loading, Marquee, Masker, Msg, Panel, Picker, Popover, PopupHeader, PopupPicker, PopupRadio, Popup, Previewer, Qrcode, Radio, Range, Rater, Scroller, Search, Selector, Spinner, Step, Sticky, Swipeout, Swiper, Tab, Tabbar, Timeline, Toast, ViewBox, WechatEmotion, XAddress, XButton, XCircle, XDialog, XHeader, XImg, XInput, XNumber, XProgress, XSwitch, XTable, XTextarea } from 'vux'
import CompDropdown from '@/comps/CompDropdown'
import CompDiv from '@/comps/CompDiv'

let nullFunc = function(){

}

let dftVal = function(v){
  if(!!v.type && _.toLower(v.type.name) === 'function'){
    return v.default || nullFunc
  }
  if (v.default){
    if(_.isFunction(v.default)){
      return v.default()
    }
    return v.default
  }
  if(v.type){
    let t
    if(_.isArray(v.type)){
      t = v.type[0]
    }else{
      t = v.type
    }
    switch (_.toLower(t.name)) {
      case 'string':
        return 'dft'
      case 'number':
        return 1
      case 'boolean':
        return true
      case 'object':
        return {}
      case 'function':
        return nullFunc
      default:
    }
  }
  return 'as'
}

export default {
  name: 'CompList',
  data() {
    return {
      grp: 'all',
      filter: ''
    }
  },
  computed: {
    compGroup () {
      return {
        all: [Actionsheet, Alert, Badge, Blur, ButtonTab, Calendar, Card, CellBox, CellFormPreview, Cell, CheckIcon, Checker, Checklist, Clocker, ColorPicker, Confirm, Countdown, Countup, DatetimeRange, DatetimeView, Datetime, Divider, Drawer, Flexbox, Flow, FormPreview, Grid, Group, Icon, InlineCalendar, InlineLoading, InlineXNumber, LoadMore, Loading, Marquee, Masker, Msg, Panel, Picker, Popover, PopupHeader, PopupPicker, PopupRadio, Popup, Previewer, Qrcode, Radio, Range, Rater, Scroller, Search, Selector, Spinner, Step, Sticky, Swipeout, Swiper, Tab, Tabbar, Timeline, Toast, ViewBox, WechatEmotion, XAddress, XButton, XCircle, XDialog, XHeader, XImg, XInput, XNumber, XProgress, XSwitch, XTable, XTextarea],
        布: [ Divider, Grid, Scroller, Sticky, ViewBox, XHeader],
        窗: [ Actionsheet, Alert, Confirm, Loading, Popup, Toast, XDialog ],
        表: [ CellFormPreview, Cell, Checker, Checklist, DatetimeRange, Datetime, FormPreview, Group, InlineCalendar, Picker, PopupPicker, PopupRadio, Radio, Range, Rater, Search, Selector, XAddress, XButton, XInput, XNumber, XSwitch, XTextarea ]
      }
    },
    currList () {
      if (!this.filter || this.filter === '') {
        return this.compGroup[this.grp]
      }
      return _.filter(this.compGroup[this.grp], o => {
        return o.name && o.name.indexOf(this.filter) > -1
      })
    }
  },
  components: {
    ActionHeader, ScrollPane, Draggable, tabs, tab, buttonGroup, radio,
  },
  created () {
    console.log(this.$refs.compListArea)
  },
  methods: {
    copy(o) {
      let cs = {
        o: o
      }
      let d = {}
      let m = {}
      let temp = '<o'
      _.forEach(o.props, (v, k) => {
        let iKey = 'i_' + k
        let dft = dftVal(v)
        if(_.isFunction(dft)){
          temp += (' @' + k + '="' + iKey +'"')
          m[iKey] = dft
        } else {
          temp += (' :' + k + '="' + iKey +'"')
          d[iKey] = dft
        }
      })
      if(o.name === 'ViewBox'){
        temp += '>'
        temp += `
        <div>
          <draggable v-model="subComps" class="dragArea" :options="{group: 'devArea'}">
            <component v-bind:is="r" v-for="(r, idx) in subComps" :key="this._uid"></component>
            <slot v-if="subComps.length === 0">empty div</slot>
          </draggable>
        </div>
        `
        temp += '</o>'
        d.subComps = []
        cs.Draggable = require('vuedraggable')
      } else {
        temp += '/>'
      }

      let c = {
        // extends: o,
        name: 'Inner' + o.name,
        template: temp,
        components: cs,
        data () {
          return d
        },
        methods: m
      }
      console.log(c)
      return c
    }
  }
}
</script>

<style lang="css">
</style>
