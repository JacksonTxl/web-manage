<template>
  <a-select
    :mode="mode"
    allowClear
    :placeholder="placeholder || '请选择全部门店'"
    :value="cValue"
    :style="{ width }"
    :defaultValue="defaultValue"
    :disabled="disabled"
    @change="onChange"
    :options="shopOptions"
  />
</template>

<script>
import { UserService } from '@/services/user.service'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  name: 'ShopSelect',
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      shopList: this.userService.shopList$
    }
  },
  computed: {
    cValue: {
      set(newValue) {
        this.$emit('change', newValue)
      },
      get() {
        return this.value || this.defaultValue
      }
    },
    shopOptions() {
      const allShop =
        this.useType === 'form' ? [] : [{ label: '全部门店', value: -1 }]
      return [
        ...allShop,
        ...this.shopList.map(item => {
          return {
            label: item.shop_name,
            value: item.shop_id
          }
        })
      ]
    }
  },
  props: {
    mode: {
      type: String
    },
    placeholder: {
      type: String
    },
    useType: {
      type: String
    },
    width: {
      type: String,
      default: '150px'
    },
    value: {
      type: [Number, String, Array]
    },
    defaultValue: Number,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
