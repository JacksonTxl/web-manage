<template>
  <div :class="b()">
    <div :class="b('hd')">
      <div :class="b('h-1')"></div>
    </div>
    <div :class="b('bd')">
      <ul :class="b('list')">
        <li :class="b('item')" v-for="n in 3" :key="n">
          <div :class="b('item-hd')">
            <div :class="b('h-2')"></div>
          </div>
          <div :class="b('item-bd')">
            <div :class="b('h-3')"></div>
            <div :class="b('h-4')"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  bem: {
    b: 'skeleton-brand-tile-sider-2'
  }
}
</script>
