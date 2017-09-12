<template>
<div class="app">
  <AppHeader ref="header" />
  <div class="app-body">
    <Sidebar/>
    <main class="main">
      <breadcrumb :list="list" />
      <div class="container-fluid p-0">
        <router-view></router-view>
      </div>
    </main>
    <AsideMenu />
  </div>
  <AppFooter/>
</div>
</template>
<script>
import AppHeader from './frame/Header'
import Sidebar from './frame/Sidebar'
import AsideMenu from './frame/Aside'
import AppFooter from './frame/Footer'
import Breadcrumb from './frame/Breadcrumb'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb,
    AsideMenu,
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched
    }
  }
}
</script>
