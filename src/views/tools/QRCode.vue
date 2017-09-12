<template>
<div class="animated fadeIn">
  <div class="row">
    <div class="col-md-12">
      <div class="input-group">
        <span class="input-group-addon hand" @click="batch">批量生成</span>
        <input type="text" v-model="b" class="form-control" placeholder="Enter text">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3" v-for="(qr, idx) in qrs" :key="idx">
      <div class="card">
        <div class="card-header">
          <div class="input-group">
            <span class="input-group-addon">{{idx + 1}}</span>
            <input type="text" v-model="qrs[idx]" class="form-control" placeholder="Enter text">
            <span class="input-group-addon hand" @click="addBlk"><i class="icon-plus icons"></i></span>
          </div>
        </div>
        <div class="card-block text-center">
          <QR :text="qr" :size="200" color="blue" style="align:center" />
          <!-- <Bar :value="qr">Can't generate the barcode</Bar> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import QR from 'vue-qrcode-component'
// import Bar from 'vue-barcode'
import _ from 'lodash'

export default {
  name: 'QRCode',
  components: {
    // Bar,
    QR
  },
  data() {
    return {
      qrs: ['15618684998', '123456', ''],
      b: ''
    }
  },
  methods: {
    addBlk() {
      this.qrs.push('')
    },
    batch() {
      this.qrs = _.concat(this.qrs, _.split(this.b, ','))
      this.b = ''
    }
  }
}
</script>

<style lang="css">
  .hand {
    cursor:pointer;
  }
</style>
