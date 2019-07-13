<template>
  <ul :class="b()">
    <li
      v-for="(item, index) in entries"
      :key="index"
      :class="b('item')"
    >
      <div>
        <img :src="item.icon" :alt="item.text" :class="b('item-icon')">
      </div>
      <div :class="b('item-text')">{{item.text}}</div>
    </li>
  </ul>
</template>

<script>
import { entries } from './fast-entry.config'
export default {
  name: 'FastEntry',
  bem: {
    b: 'layout-fast-entry'
  },
  data() {
    return {
      entries
    }
  }
}
</script>
