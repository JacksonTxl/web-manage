<template>
  <st-panel app :title="`共${list.length}个场地`" :class="bPage()">
    <draggable tag="a-row" :component-data="{props:{gutter:24}}" v-model="list"  :animation="200">
      <a-col
        :xl="8"
        :xxl="6"
        :xs="12"
        v-for="item in list"
        :key="item.id"
      >
        <div :class="bItem()">
          <div :class="bItem('del')" @click="onDel(item.id)">
            <a-popconfirm title="Are you sure？">
              <st-icon type="delete" :class="bItem('del-icon')"/>
            </a-popconfirm>
          </div>
          <div :class="bItem('body')">
            <div :class="bItem('body-lt')">
              <st-initials-tag :value="item.area_name[0]"/>
            </div>
            <div :class="bItem('body-rt')">
              <div :class="bItem('title-box')">
                <st-t3 :class="bItem('title')">{{item.area_name}}</st-t3>
                <img v-if="item.is_vip" :class="bItem('level-img')" src="~@/assets/img/icon_vip.png" alt="icon_vip">
              </div>
              <div :class="bItem('content-box')">
                <div :class="bItem('content-item')">
                  <label :class="bItem('label')">容纳人数</label>
                  <p :class="bItem('text')">
                    {{item.contain_number}}
                    <span :class="bItem('sub-text')">人</span>
                  </p>
                </div>
                <div :class="bItem('content-item')">
                  <label :class="bItem('label')">座位模板</label>
                  <p :class="bItem('text')">
                    {{item.seat_num}}
                    <span :class="bItem('sub-text')">个</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div :class="bItem('footer')">
            <router-link :class="bItem('action')" :to="`./site?id=${item.id}`" class="st-link-secondary">设置座位</router-link>
            <div :class="bItem('divider')"></div>
            <a :class="bItem('action')" class="st-link-secondary" @click="onUpdateCourt(item.id)">编辑</a>
          </div>
        </div>
      </a-col>
      <a-col :xl="8" :xxl="6" :xs="12">
        <div @click="onAddCourt" class="court-add">
          <a-icon type="plus"></a-icon>
          <span class="mg-l8">添加场地</span>
        </div>
      </a-col>
    </draggable>
  </st-panel>
</template>

<script>
import draggable from 'vuedraggable'
import { MessageService } from '@/services/message.service'
import { ListService } from './list.service'
export default {
  serviceInject() {
    return {
      listService: ListService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      list: this.listService.list$
    }
  },
  components: {
    draggable
  },
  bem: {
    bPage: 'page-shop-setting-court-list',
    bItem: 'court-item',
    bAdd: 'court-add'
  },
  methods: {
    onAddCourt() {
      const that = this
      this.$modalRouter.push({
        name: 'court-add',
        on: {
          change() {
            that.onListChange()
          }
        }
      })
    },
    onUpdateCourt(id) {
      const that = this
      this.$modalRouter.push({
        name: 'court-edit',
        props: {
          id
        },
        on: {
          change() {
            that.onListChange()
          }
        }
      })
    },
    onListChange() {
      this.$router.push({
        query: {},
        force: true
      })
    },
    onDel(id) {
      this.listService.del(id).subscribe(this.onDelSuccessed)
    },
    onDelSuccessed() {
      this.messageService.success({
        content: '删除成功'
      })
      this.onListChange()
    }
  }
}
</script>
