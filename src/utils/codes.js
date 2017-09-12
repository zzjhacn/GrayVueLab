require('../../static/prism.css')
import Prism from 'prismjs'
import './prism'

export default {
  props: {
    language: {type: String, default: 'html'},
    txt: {type: String, default: ''}
  },
  updated() {
    Prism.highlightAll(false)
  },
  render: function (createElement) {
    if (this.txt === '') {
      return createElement('p', 'empty')
    }
    let content = this.txt
    if (~['html', 'markup'].indexOf(this.language)) content = content.replace(/(\w+)=""/g, '$1')
    let matches = content.match(/(\n|\r)[ ]*\S/g)
    if (matches) {
      let values = matches.map(el => (el.length - 2))
      let min = Math.min.apply(Math, values)
      content = content.replace(/(\n|\r)([^\n\S]*)/g, (str, nr, s) => {
        return nr + s.substr(min)
      })
    }
    let d = createElement('pre', {
      attrs: {
        class: 'line-numbers'
      }
    }, [
      createElement('code', {
        class: this.language ? 'language-' + this.language : null,
        domProps: {
          innerHTML: !this.language ? content : content.replace(/^([ \t]*[\r\n]+)+|([\r\n]+[ \t]*)+$/g, '')
        }
      })
    ])
    return d
  }
}
