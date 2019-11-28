<template>
  <st-modal
    title="更换上课范围"
    size="default"
    v-model="show"
    :wrapClassName="b()"
  >
    <st-form :form="form" labelWidth="75px">
      <st-form-item
        label="选择"
        required
        :help="helpText"
        :validateStatus="helpShow ? 'error' : ''"
      >
        <st-batch-select-radio
          :ids="this.ids"
          v-model="batch_type"
          :total="list_num"
        ></st-batch-select-radio>
      </st-form-item>
      <st-form-item label="团体课程" required>
        <div :class="(add('team-course-table'), add('course'))">
          <table :class="add('scope-table')">
            <colgroup>
              <col style="width:5%;" />
              <col style="width:81%;" />
              <col style="width:14%;" />
            </colgroup>
            <tr class="bg-thead th">
              <th></th>
              <th>课程名称</th>
              <th>操作</th>
            </tr>
            <tbody>
              <tr class="checkbox border-bottom">
                <td colspan="3" class="team-course-add-buton">
                  <a-popover
                    trigger="click"
                    :getPopupContainer="getPopupContainer"
                  >
                    <template slot="content">
                      <div :class="b('popup-scroll')">
                        <st-input-search
                          @change="filterCourseList"
                          placeholder="请输入查询内容"
                          round="round"
                        ></st-input-search>
                        <a-tree
                          checkable
                          @check="onTeamTree"
                          @expand="onExpandCourse"
                          v-model="teamCourseIds"
                          :expandedKeys.sync="expandedKeysCourse"
                          :autoExpandParent="autoExpandParentCourse"
                          :treeData="teamCourseTreeList"
                        >
                          <template slot="title" slot-scope="{ title }">
                            <span v-if="title.indexOf(searchCourseValue) > -1">
                              {{
                                title.substr(
                                  0,
                                  title.indexOf(searchCourseValue)
                                )
                              }}
                              <span style="color: #f50">
                                {{ searchCourseValue }}
                              </span>
                              {{
                                title.substr(
                                  title.indexOf(searchCourseValue) +
                                    searchCourseValue.length
                                )
                              }}
                            </span>
                            <span v-else>{{ title }}</span>
                          </template>
                        </a-tree>
                      </div>
                    </template>
                    <st-button block type="dashed" icon="add">
                      添加团体课程
                    </st-button>
                  </a-popover>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <p
                    v-if="!teamCourseShowList.length"
                    class="bg-row-even"
                    style="margin: 0;text-align:center;padding: 8px 0;"
                  >
                    无数据
                  </p>
                  <ul
                    :class="b('team-table')"
                    v-else
                    v-scrollBar="{ stopPropagation: true }"
                    v-decorator="['teamCourseList2']"
                  >
                    <li
                      class="checkbox border-bottom"
                      :class="[
                        index % 2 !== 0 ? 'bg-row-odd' : 'bg-row-even',
                        b('course-item')
                      ]"
                      v-for="(i, index) in teamCourseShowList"
                      :key="i.id"
                    >
                      <div class="tg-c" :class="b('checked')">
                        <a-checkbox :checked="i.checked" />
                      </div>
                      <div :class="b('name')">{{ i.name }}</div>
                      <div :class="b('delete')">
                        <a @click="onClickDeleteTeam(i, index)">
                          删除
                        </a>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr class="bg-thead checkbox topline">
                <td class="tg-c">
                  <a-checkbox
                    @change="checkAllChange('team')"
                    :checked="teamCheckAll"
                  />
                </td>
                <td>批量操作</td>
                <td>
                  <a @click="removeCourseItems('team')">
                    删除
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </st-form-item>
      <st-form-item label="私教课程" class="mg-b0" required>
        <div :class="(add('personal-course-table'), add('course'))">
          <table>
            <colgroup>
              <col style="width:5%;" />
              <col style="width:29%;" />
              <col style="width:34%;" />
              <col style="width:16%;" />
              <col style="width:16%;" />
            </colgroup>
            <tr class="bg-thead th">
              <th></th>
              <th>课程名称</th>
              <th>支持预约的{{ $c('coach') }}等级</th>
              <th>授课{{ $c('coach') }}数</th>
              <th>操作</th>
            </tr>
            <tbody>
              <tr class="checkbox border-bottom">
                <td colspan="5" class="personal-course-add-buton">
                  <a-popover trigger="click">
                    <template slot="content">
                      <div :class="b('popup-scroll')">
                        <st-input-search
                          @change="filterPersonalList"
                          placeholder="请输入查询内容"
                          round="round"
                        ></st-input-search>
                        <a-tree
                          checkable
                          @expand="onExpandPersonal"
                          @check="onPersonalTree"
                          v-model="personalCourseIds"
                          :expandedKeys.sync="expandedKeysPersonal"
                          :autoExpandParent="autoExpandParentPersonal"
                          :treeData="personalCourseTreeList"
                        >
                          <template slot="title" slot-scope="{ title }">
                            <span
                              v-if="title.indexOf(searchPersonalValue) > -1"
                            >
                              {{
                                title.substr(
                                  0,
                                  title.indexOf(searchPersonalValue)
                                )
                              }}
                              <span style="color: #f50">
                                {{ searchPersonalValue }}
                              </span>
                              {{
                                title.substr(
                                  title.indexOf(searchPersonalValue) +
                                    searchPersonalValue.length
                                )
                              }}
                            </span>
                            <span v-else>{{ title }}</span>
                          </template>
                        </a-tree>
                      </div>
                    </template>
                    <st-button block type="dashed" icon="add">
                      添加私教课程
                    </st-button>
                  </a-popover>
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <p
                    v-if="!personalCourseShowList.length"
                    class="bg-row-even"
                    style="margin: 0;text-align:center;padding: 8px 0;"
                  >
                    无数据
                  </p>
                  <ul
                    :class="b('team-table')"
                    v-else
                    v-scrollBar="{ stopPropagation: true }"
                    v-decorator="['personalCourseList1']"
                  >
                    <li
                      class="checkbox border-bottom"
                      :class="[
                        index % 2 !== 0 ? 'bg-row-odd' : 'bg-row-even',
                        b('personal-item')
                      ]"
                      v-for="(item, index) in personalCourseShowList"
                      :key="item.id"
                    >
                      <div class="tg-c">
                        <a-checkbox :checked="item.checked" />
                      </div>
                      <div>{{ item.name }}</div>
                      <div>
                        <a-dropdown
                          placement="bottomRight"
                          :trigger="['click']"
                        >
                          <a>
                            {{
                              item.coachGradeList.length === coachList.length
                                ? '全部'
                                : `${item.coachGradeList.length}个`
                            }}等级&nbsp;&nbsp;
                            <st-icon class="icon-12" type="down-small" />
                          </a>
                          <a-checkbox-group
                            :class="basic(`personal-dropdown`)"
                            v-model="item.coachGradeList"
                            @change="coachItemChange(item, index)"
                            slot="overlay"
                          >
                            <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                            <ul
                              class="personal-course-coach-grade-dropdown"
                              v-scrollBar="{
                                stopPropagation: true
                              }"
                              v-decorator="[
                                `personalCourseListCoachGrade${index}`
                              ]"
                            >
                              <li
                                v-for="(coachItem, coachIndex) in coachList"
                                :key="coachIndex"
                              >
                                <a-checkbox :value="coachItem.id">
                                  {{ coachItem.setting_name }}
                                </a-checkbox>
                              </li>
                            </ul>
                          </a-checkbox-group>
                        </a-dropdown>
                      </div>
                      <div>{{ item.coach }}</div>
                      <div>
                        <a @click="onClickDeletePersonal(item, index)">
                          删除
                        </a>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr class="bg-thead checkbox topline">
                <td class="tg-c">
                  <a-checkbox
                    @change="checkAllChange('personal')"
                    :checked="personalCheckAll"
                  />
                </td>
                <td>批量操作</td>
                <td>
                  <a-dropdown
                    placement="bottomRight"
                    :trigger="['click']"
                    v-model="coachAllOperationDropdownIsShow"
                  >
                    <a href="javascript:void(0)">
                      批量设置等级&nbsp;&nbsp;
                      <st-icon class="icon-12" type="down-small" />
                    </a>
                    <a-checkbox-group
                      :class="basic(`personal-dropdown`)"
                      v-model="personalAllOperationCoachList"
                      @change="coachAllChange"
                      class="all"
                      slot="overlay"
                    >
                      <ul
                        class="personal-course-coach-grade-dropdown"
                        v-scrollBar="{ stopPropagation: true }"
                        v-decorator="['personalCourseListCoachGradeAll']"
                      >
                        <li
                          v-for="(coachItem, coachIndex) in coachList"
                          :key="coachIndex"
                        >
                          <a-checkbox :value="coachItem.id">
                            {{ coachItem.setting_name }}
                          </a-checkbox>
                        </li>
                      </ul>
                      <div class="personal-course-coach-grade-dropdown-button">
                        <a
                          :disabled="!personalAllOperationCoachList.length"
                          @click="coachAllOperationOk"
                        >
                          确定
                        </a>
                      </div>
                    </a-checkbox-group>
                  </a-dropdown>
                </td>
                <td>{{ personalAllOperationCoachTotal }}</td>
                <td>
                  <a @click="removeCourseItems('personal')">
                    删除
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </st-form-item>
    </st-form>
    <template slot="footer">
      <st-button @click="show = false">
        取消
      </st-button>
      <st-popconfirm class="mg-l8" @confirm="onSubmit">
        <div slot="title" class="sold-popup-tip">
          <div class="sold-popup-tip__title">
            本次共选择{{ operateDataNum }}条记录，请再次确认是否提交！
          </div>
          <div class="sold-popup-tip__content">
            此操作将
            <span class="color-danger">覆盖</span>
            当前选择项已有数据，将会有2-5s无法正常使用。
          </div>
        </div>
        <st-button type="primary" :loading="loading.changePackageRange">
          确认提交
        </st-button>
      </st-popconfirm>
    </template>
  </st-modal>
</template>

<script>
import { ScopeService } from './scope.service'
import { ruleOptions } from './scope.config'
import { BATCH_TYPE, BATCH_INFO } from '@/constants/common/batch-operation'
import {
  cloneDeep,
  remove,
  every,
  filter,
  reduce,
  forEach,
  find,
  intersection
} from 'lodash-es'
export default {
  name: 'ModalSoldCourseScope',
  bem: {
    add: 'page-shop-add-range-package',
    basic: 'page-shop-add-basic-package',
    b: 'modal-sold-course-scope'
  },
  serviceProviders() {
    return [ScopeService]
  },
  serviceInject() {
    return {
      scopeService: ScopeService
    }
  },
  rxState() {
    return {
      list_num: this.scopeService.list_num$,
      loading: this.scopeService.loading$,
      coachList: this.scopeService.coachList$,
      teamCourseList: this.scopeService.teamCourseList$,
      teamCourseTreeList: this.scopeService.teamCourseTreeList$,
      personalCourseList: this.scopeService.personalCourseList$,
      personalCourseTreeList: this.scopeService.personalCourseTreeList$
    }
  },
  props: {
    ids: {
      type: Array,
      required: true
    },
    searchQuery: {
      type: Object
    }
  },
  mounted() {
    this.scopeService.init(this.searchQuery).subscribe()
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      expandedKeys: [],
      autoExpandParent: true,
      teamCourseIds: [],
      expandedKeysCourse: [],
      autoExpandParentCourse: true,
      teamCourseList: [],
      searchCourseValue: '',
      teamChildrenIds: [],

      personalCourseIds: [],
      expandedKeysPersonal: [],
      autoExpandParentPersonal: true,
      searchPersonalValue: '',
      personalChildrenIds: [],

      BATCH_TYPE,
      BATCH_INFO,
      form,
      decorators,
      show: false,
      batch_type: BATCH_TYPE.SELECTED,
      teamCheckAll: false,
      personalCheckAll: false,
      coachAllOperationDropdownIsShow: false,
      personalAllOperationCoachList: [],
      personalAllOperationCoachTotal: 0
    }
  },
  computed: {
    teamCourseShowList() {
      return this.teamCourseList.filter(item =>
        this.teamChildrenIds.includes(item.id)
      )
    },
    personalCourseShowList() {
      const cocahes = []
      let total = 0
      this.coachList.forEach(item => {
        cocahes.push(item.id)
        total += item.coach_number
      })
      return this.personalCourseList.filter(item => {
        // if (this.personalCourseIds.includes(item.id)) {
        if (this.personalChildrenIds.includes(item.id)) {
          item.coachGradeList = cocahes
          item.coach = total
          return item
        }
      })
    },
    helpText() {
      return this.list_num > this.BATCH_INFO.LIMIT_NUM
        ? this.BATCH_INFO.ERROR_TIP
        : ''
    },
    helpShow() {
      return this.list_num > this.BATCH_INFO.LIMIT_NUM
    },
    operateDataNum() {
      return this.batch_type === this.BATCH_TYPE.SELECTED
        ? this.ids.length
        : this.list_num
    }
  },
  methods: {
    getPopupContainer() {
      return document.getElementsByClassName('modal-sold-course-scope')[0]
    },
    onTeamTree() {
      this.teamChildrenIds = this.teamCourseIds.filter(
        i => !find(this.teamCourseTreeList, { id: i })
      )
      this.teamCourseIds.forEach((i, index) => {
        const item = find(this.teamCourseTreeList, { id: i })
        if (item) {
          const isExist = item.children.some(childrenItem =>
            this.teamCourseIds.includes(childrenItem.id)
          )
          if (!isExist) {
            this.teamCourseIds.splice(index, 1)
          }
        }
      })
    },
    onPersonalTree() {
      this.personalChildrenIds = this.personalCourseIds.filter(
        i => !find(this.personalCourseTreeList, { id: i })
      )
      this.personalCourseIds.forEach((i, index) => {
        const item = find(this.personalCourseTreeList, { id: i })
        if (item) {
          const isExist = item.children.some(childrenItem =>
            this.personalCourseIds.includes(childrenItem.id)
          )
          if (!isExist) {
            this.personalCourseIds.splice(index, 1)
          }
        }
      })
    },
    coachItemChange(item, index) {
      const arr = this.coachList.filter(i => item.coachGradeList.includes(i.id))
      let total = 0
      arr.forEach(i => {
        total += i.coach_number
      })
      item.coach = total
    },
    onClickDeleteTeam(i, index) {
      this.teamCourseIds = this.teamCourseIds.filter(item => item !== i.id)
      this.onTeamTree()
    },
    onClickDeletePersonal(i, index) {
      this.personalCourseIds = this.personalCourseIds.filter(
        item => item !== i.id
      )
      this.onPersonalTree()
    },
    checkAllChange(type) {
      if (type === 'team') {
        this.teamCheckAll = !this.teamCheckAll
        this.teamCourseShowList.forEach(item => {
          item.checked = this.teamCheckAll
        })
      }
      if (type === 'personal') {
        this.personalCheckAll = !this.personalCheckAll
        this.personalCourseShowList.forEach(item => {
          item.checked = this.personalCheckAll
        })
      }
    },
    removeCourseItems(type) {
      if (type === 'team') {
        if (this.teamCheckAll) {
          this.teamCourseIds = []
          this.teamCheckAll = false
          this.onTeamTree()
        }
      }
      if (type === 'personal') {
        if (this.personalCheckAll) {
          this.personalCourseIds = []
          this.personalCheckAll = false
          this.onPersonalTree()
        }
      }
    },
    filterCourseList(e) {
      const value = e.target.value
      const expandedKeysCourse = this.teamCourseList
        .map(item => {
          if (item.name.indexOf(value) > -1) {
            return this.getParentKey(
              item.name,
              cloneDeep(this.teamCourseTreeList)
            )
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeysCourse,
        searchCourseValue: value,
        autoExpandParentCourse: true
      })
    },
    filterPersonalList(e) {
      const value = e.target.value
      const expandedKeysPersonal = this.personalCourseList
        .map(item => {
          if (item.name.indexOf(value) > -1) {
            return this.getParentKey(
              item.name,
              cloneDeep(this.personalCourseTreeList)
            )
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeysPersonal,
        searchPersonalValue: value,
        autoExpandParentPersonal: true
      })
    },
    getParentKey(key, tree) {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some(item => item.name === key)) {
            parentKey = node.key
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    },
    onExpandCourse(expandedKeys) {
      this.expandedKeysCourse = expandedKeys
      this.autoExpandParentCourse = false
    },
    onExpandPersonal(expandedKeys) {
      this.expandedKeysPersonal = expandedKeys
      this.autoExpandParentPersonal = false
    },
    coachAllChange() {
      const arr = this.coachList.filter(i =>
        this.personalAllOperationCoachList.includes(i.id)
      )
      let total = 0
      arr.forEach(i => {
        total += i.coach_number
      })
      this.personalAllOperationCoachTotal = total
    },
    coachAllOperationOk() {
      const arr = this.coachList.filter(i =>
        this.personalAllOperationCoachList.includes(i.id)
      )
      let total = 0
      arr.forEach(i => {
        total += i.coach_number
      })
      this.personalCourseShowList.forEach(item => {
        item.coachGradeList = cloneDeep(this.personalAllOperationCoachList)
        item.coach = total
      })
      // 清空
      this.personalAllOperationCoachList = []
      this.personalAllOperationCoachTotal = 0
      // 收起
      this.coachAllOperationDropdownIsShow = false
    },
    onSubmit() {
      this.form.validate().then(values => {
        const arr = []
        this.personalCourseShowList.forEach(item => {
          arr.push({
            id: item.id,
            level_ids: item.coachGradeList
          })
        })
        this.scopeService
          .changePackageRange({
            batch_type: this.batch_type,
            sold_ids: this.ids,
            conditions: this.searchQuery,
            range_teams: this.teamChildrenIds,
            range_personals: arr
          })
          .subscribe(res => {
            this.$emit('success')
            this.show = false
          })
      })
    }
  }
}
</script>
