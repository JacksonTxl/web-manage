<template>
  <div :class="b()">
    <template v-for="(btn, index) in outer">
      <st-button
        @click="btn.click"
        :type="index === 0 ? 'primary' : 'default'"
        v-if="shouldShow(btn)"
        :key="btn.text"
      >
        {{ btn.text }}
      </st-button>
    </template>

    <a-dropdown v-if="hasMore">
      <st-button>
        更多操作
        <a-icon type="down" />
      </st-button>
      <a-menu slot="overlay">
        <template v-for="menu in inner">
          <a-menu-item
            @click="menu.click"
            :key="menu.text"
            v-if="shouldShow(menu)"
          >
            {{ menu.text }}
          </a-menu-item>
        </template>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
export default {
  name: 'StBtnActions',
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  bem: {
    b: 'st-btn-actions'
  },
  computed: {
    computedUseableOptions() {
      return this.options.filter(item => {
        if (!('if' in item)) {
          return true
        }
        return !!item.if
      })
    },
    hasMore() {
      return this.computedUseableOptions.length > 2
    },
    outer() {
      return this.computedUseableOptions.slice(0, 2)
    },
    inner() {
      return this.computedUseableOptions.slice(2)
    }
  },
  methods: {
    shouldShow(item) {
      if (!('if' in item)) {
        return true
      }
      return !!item.if
    }
  }
}
</script>
