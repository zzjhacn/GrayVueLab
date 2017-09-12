<template>
<navbar>
  <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
  <a class="navbar-brand" href="#"></a>
  <ul class="nav navbar-nav d-md-down-none mr-auto">
    <li class="nav-item">
      <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="sidebarToggle">&#9776;</a>
    </li>
    <li class="nav-item">
      <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="sidebarMinimize">&#9776;</a>
    </li>
    <li class="nav-item">
      <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="mobileSidebarToggle">&#9776;</a>
    </li>
  </ul>
  <ul class="nav navbar-nav d-md-down-none mr-auto float-right">
    <li class="nav-item float-right">
      <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="asideToggle">&#9776;</a>
    </li>
  </ul>
</navbar>
</template>
<script>
import navbar from './Navbar'
import { dropdown } from 'vue-strap'
import hub from '@/utils/eventhub'

export default {
  name: 'header',
  components: {
    navbar,
    dropdown
  },
  created() {
    hub.$on('aside', () => {
      this.asideToggle()
      this.sidebarMinimize()
    })
  },
  methods: {
    click() {
      // do nothing
    },
    sidebarToggle(e) {
      e && e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize(e) {
      e && e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle(e) {
      e && e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle(e) {
      e && e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
