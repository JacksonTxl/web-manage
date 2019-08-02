<template>
  <div>
    <a-tree-select
      showSearch
      :value="value"
      :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
      :placeholder="placeholder"
      :style="{ width: size }"
      allowClear
      :treeCheckable="treeCheckable"
      treeDefaultExpandAll
      @change="onChange"
    >
      <a-tree-select-node
        v-for="item in departmentOptions"
        :value="item.id"
        :title="item.name"
        :key="item.id"
      >
        <a-tree-select-node
          v-for="item1 in item.children"
          :value="item1.id"
          :title="item1.name"
          :key="item1.id"
        >
          <a-tree-select-node
            v-for="item2 in item1.children"
            :value="item2.id"
            :title="item2.name"
            :key="item2.id"
          >
            <a-tree-select-node
              v-for="item3 in item2.children"
              :value="item3.id"
              :title="item3.name"
              :key="item3.id"
            >
              <a-tree-select-node
                v-for="item4 in item3.children"
                :value="item4.id"
                :title="item4.name"
                :key="item4.id"
              />
              >
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
    },
    size: {
      type: String
    },
    treeCheckable: {
      type: Boolean
    }
  },
  data() {
    return {
      departmentOptions: []
    }
  },
  computed: {
    modelValue() {
      if (!this.value) return
      return this.value + ''
    }
  },
  methods: {
    // 传出去转化为Number类型接口需要
    onChange(value, lable, extra) {
      this.$emit('changeLabel', { value, lable })
      this.$emit('change', value)
    },
    traverseTree(tree) {
      // 将ID转化为String UI组件需要
      return tree.map(item => {
        return item.children
          ? {
              name: item.name,
              children: this.traverseTree(item.children),
              id: item.id + '',
              count: item.count
            }
          : item
      })
    },
    getDepartmentList() {
      this.staffApi.getDepartmentList().subscribe(res => {
        this.departmentOptions = this.traverseTree(res.department)
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
