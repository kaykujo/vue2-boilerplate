<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      defaultLayout: "default",
    };
  },
  computed: {
    layout() {
      let layout = `${this.$route.meta.layout || this.defaultLayout}-layout`;
      return layout;
    },
  },
};
</script>