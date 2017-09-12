<template>
<div class="sidebar">
  <nav class="sidebar-nav">
    <ul class="nav">
      <router-link v-for="menu in menus" :key="menu.lnk" tag="li" :class="{'nav-item':true, 'nav-dropdown':menu.children}" :to="{ path: menu.lnk}" disabled="menu.children">
        <div v-if="menu.children" class="nav-link nav-dropdown-toggle" @click="handleClick">
          <i :class="menu.icon"></i> {{menu.label}}
          <span class="badge badge-pill badge-info" v-if="menu.bdgText">{{menu.bdgText}}</span>
        </div>
        <ul class="nav-dropdown-items light" style="padding-left:10px" v-if="menu.children">
          <li class="nav-item" v-for="sub in menu.children" :key="menu.lnk+sub.lnk">
            <router-link :to="menu.lnk+sub.lnk" class="nav-link" exact>
              <i :class="sub.icon"></i> {{sub.label}}
              <span class="badge badge-pill badge-info" v-if="sub.bdgText">{{sub.bdgText}}</span>
            </router-link>
          </li>
        </ul>
        <router-link v-if="!menu.children" :to="menu.lnk" class="nav-link" exact>
          <i :class="menu.icon"></i> {{menu.label}}
          <span class="badge badge-pill badge-info" v-if="menu.bdgText">{{menu.bdgText}}</span>
        </router-link>
      </router-link>
    </ul>
  </nav>
</div>
</template>
<script>
export default {
  name: 'sidebar',
  data() {
    return {
      menus: require('./menus.json')
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
