<template>
  <div>
    <a-tree-select
      showSearch
      v-model="value"
      :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
      :placeholder="placeholder"
      allowClear
      treeDefaultExpandAll
      @change="onChange"
    >
    <a-tree-select-node v-for="item in departmentOptions" :value="item.id" :title="item.name" :key="item.id">
      <a-tree-select-node v-for="item1 in item.children" :value="item1.id" :title="item1.name" :key="item1.id">
        <a-tree-select-node v-for="item2 in item1.children" :value="item2.id" :title="item2.name" :key="item2.id">
          <a-tree-select-node v-for="item3 in item2.children" :value="item3.id" :title="item3.name" :key="item3.id">
            <a-tree-select-node v-for="item4 in item3.children" :value="item4.id" :title="item4.name" :key="item4.id" />>
        </a-tree-select-node>
        </a-tree-select-node>
      </a-tree-select-node>
    </a-tree-select-node>
    </a-tree-select>
  </div>
</template>

<script>

import { StaffApi } from '../../api/v1/staff'
export default {
  name: 'DepartmentSelect',
  serviceInject() {
    return {
      staffApi: StaffApi
    }
  },
  model: {
    prop: 'value',
    event: 'change'
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
    value: {
      type: [Number, String, Array]
    }
  },
  data() {
    return {
      departmentOptions: []
    }
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    },
    getDepartmentList() {
      this.staffApi.getDepartmentList().subscribe(res => {
        this.departmentOptions = [...res.department]
      })
    },
    init() {
      this.getDepartmentList()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
