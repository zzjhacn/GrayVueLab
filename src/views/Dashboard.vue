<template>
<div class="animated fadeIn">
  {{cont}}
  <slot> Tool box </slot>
</div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      cont: 'initing...'
    }
  },
  created() {
  }
}
</script>
