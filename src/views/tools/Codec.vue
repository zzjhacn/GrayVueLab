<template>
<div class="animated fadeIn">
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <button-group v-model="type" :justified="true" type="success" :buttons="true">
            <radio v-for="(r, idx) in types" :key="'r_'+idx" :selected-value="r.v">{{r.l}}</radio>
          </button-group>
        </div>
        <div class="card-block">
          <div class="card-group">
            <div class="card">
              <div class="card-header">
                <div class="input-group">
                  <span class="input-group-addon">Key = </span>
                  <input type="text" :disabled="!hasKey" class="form-control" :placeholder="hasKey ? 'input key' : '无需KEY'" v-model="key">
                </div>
              </div>
              <div class="card-block">
                <textarea @input="update" style="height: 300px;"></textarea>
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                <dropdown size="md" class="nav-item">
                  <span slot="button">
                      <span class="d-md-down-none">{{alg}}</span>
                  </span>
                  <ul slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
                    <li>
                      <a class="dropdown-item text-center hand" v-for="m in algs" @click="alg = m">{{m}}</a>
                    </li>
                  </ul>
                </dropdown>
                <label :class="'switch switch-text switch-pill ' + (reversible ? 'switch-primary' : '') + ' float-right'">
                    <input type="checkbox" class="switch-input" :disabled="!reversible" v-model="encode" checked>
                    <span class="switch-label" data-on="ENC" data-off="DEC"></span>
                    <span class="switch-handle"></span>
                  </label>
              </div>
              <div class="card-block">
                <prism :language="lan" :txt="disp"></prism>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { buttonGroup, dropdown, radio } from 'vue-strap'
import marked from 'marked'
import fmt from 'vkbeautify'
import _ from 'lodash'
import crypto from 'crypto'

import Prism from '@/utils/codes'

export default {
  name: 'Codec',
  data() {
    return {
      types: [
        { l: '格式化', v: 'fmt' },
        { l: '编/解码', v: 'codec' },
        { l: 'Hash', v: 'hash' },
        { l: 'Hmac', v: 'hmac' },
        { l: '加/解密', v: 'cipher' }
      ],
      type: 'fmt',
      alg: 'JSON',
      encode: true,
      key: '',
      lan: 'json',
      txt: ''
    }
  },
  components: {
    radio,
    dropdown,
    buttonGroup,
    Prism,
  },
  mounted() {
    // console.log(Prism.props)
  },
  computed: {
    algs() {
      switch (this.type) {
        case 'fmt':
          return ['JSON', 'XML', 'MD']
        case 'codec':
          return ['Base64', 'Hex', 'URI', 'URI-C']
        case 'hash':
        case 'hmac':
          return crypto.getHashes()
        case 'cipher':
          return crypto.getCiphers()
        default:
      }
    },
    reversible() { //是否可逆
      return this.type === 'codec' || this.type === 'cipher'
    },
    hasKey() { //是否需要KEY
      return this.type === 'hmac' || this.type === 'cipher'
    },
    disp() {
      switch (this.type) {
        case 'fmt':
          return _.escape(this.result)
        default:
          this.lan = 'json'
          return JSON.stringify({
            type: this.type,
            alg: this.alg,
            key: this.key,
            text: this.txt,
            result: this.result
          }, null, 4)
      }
    },
    result() {
      if (this.alg === '' || this.txt === '' || _.indexOf(this.algs, this.alg) < 0) {
        return this.txt
      }
      switch (this.type) {
        case 'fmt':
          switch (this.alg) {
            case 'JSON':
              try {
                return JSON.stringify(JSON.parse(this.txt), null, 4)
              } catch (e) {
                return 'format error' + e
              }
            case 'XML':
              try {
                this.lan = 'xml'
                return fmt.xml(this.txt)
              } catch (e) {
                return 'format error' + e
              }
            case 'MD':
              this.lan = 'markdown'
              return marked(this.txt, {
                sanitize: true
              })
            default:
              return this.txt
          }
        case 'codec':
          switch (this.alg) {
            case 'URI':
              return this.encode ? encodeURI(this.txt) : decodeURI(this.txt)
            case 'URI-C':
              return this.encode ? encodeURIComponent(this.txt) : decodeURIComponent(this.txt)
            default:
              return this.encode ? new Buffer(this.txt).toString(this.alg) : new Buffer(this.txt, this.alg).toString()
          }
        case 'hash':
          return crypto.createHash(this.alg).update(this.txt).digest('hex')
        case 'hmac':
          // var buf = crypto.randomBytes(16)
          // var token1 = buf.toString('hex')
          var signture = crypto.createHmac(this.alg, this.key)
          signture.update(this.txt)
          return signture.digest().toString('base64')
        case 'cipher':
          if (this.encode) {
            let cipher = crypto.createCipher(this.alg, this.key)
            let enc = cipher.update(this.txt, 'utf8', 'hex')
            return enc + cipher.final('hex')
          }
          let decipher = crypto.createDecipher(this.alg, this.key)
          let dec = decipher.update(this.txt, 'hex', 'utf8')
          return dec + decipher.final('utf8')
        default:
          return this.txt
      }
    }
  },
  watch: {
    type(nv) {
      if (nv === '') {
        this.type = 'fmt'
        return
      }
      this.txt = ''
      this.alg = this.algs[0]
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.txt = e.target.value
      let h = _.split(e.target.value, '\n').length * 20 + 60
      if (h > _.toNumber(_.replace(e.target.style.height, 'px', ''))) {
        e.target.style.height = h + 200 + 'px'
      }
    }, 300)
  },
  updated() {
    // Prism.highlightAll()
  }
}
</script>

<style lang="css">
  textarea {
    display: inline-block;
    width: 100%;
    height: 300px;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
    border: none;
    resize: auto;
    outline: none;
    background-color: #f6f6f6;
    font-size: 12px;
    font-family: 'Monaco', courier, monospace;
  }
  .hand {
    cursor:pointer;
  }
</style>
