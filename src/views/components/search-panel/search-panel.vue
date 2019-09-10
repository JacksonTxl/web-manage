<template>
  <div :class="panel()">
    <slot name="default"></slot>
    <div class="st-search-panel__more" v-if="showMore">
      <slot name="more"></slot>
    </div>
    <st-hr marginTop="24px" marginBottom="0"></st-hr>
    <div :class="panel('button')">
      <div :class="panel('more-button')">
        <a
          v-if="$slots.more"
          @click="showMore = !showMore"
          href="javascript:void(0)"
          class="more"
        >
          {{ showMore ? '收起' : '展开' }}&nbsp;&nbsp;
          <st-icon
            class="icon-12"
            :class="{ close: showMore }"
            type="down-small"
          />
        </a>
      </div>
      <div :class="panel('search-button')">
        <slot name="button">
          <st-button type="primary" @click="onSearch">查询</st-button>
          <st-button class="mg-l8" @click="onReset">重置</st-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StSearchPanel',
  bem: {
    panel: 'st-search-panel'
  },
  data() {
    return {
      showMore: false
    }
  },
  methods: {
    onSearch() {
      this.$emit('search')
    },
    onReset() {
      this.$emit('reset')
    }
  }
}
</script>
