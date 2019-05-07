<template>
  <st-panel app :class="basic()" class="page-shop-add-range-package">
    <st-form :form='form' labelWidth="96px">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="课程包名称" required>
            <a-input v-decorator="[
              'course_name',
              {rules: [{ required: true, message: '请输入课程包名称' },{ min: 2, message: '最少2个字符' },{ max: 30, message: '最多30个字符' }]}
            ]" placeholder="请输入课程包名称"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="23" :xs="22" :offset="1">
          <st-form-item label="上课范围" required>
            <div :class="add('course')">
              <table>
                <colgroup>
                  <col style="width:5%;">
                  <col style="width:10%;">
                  <col style="width:21%;">
                  <col style="width:27%;">
                  <col style="width:20%;">
                  <col style="width:17%;">
                </colgroup>
                <tr class="bg-thead">
                  <th></th>
                  <th class="rightline">课程类型</th>
                  <th class="pl-56">节数</th>
                  <th>课时费</th>
                  <th colspan="2">小计</th>
                </tr>
                <tbody>
                  <tr class="bg-row-odd checkbox">
                    <td class="tg-c"><a-checkbox @change="teamCheckboxChange"/></td>
                    <td class="rightline">团体课程</td>
                    <td class="pr-32 pl-56">
                      <st-input-number v-model="packageData.team_times" :disabled="packageData.is_team===0">
                        <template slot="addonAfter">节</template>
                      </st-input-number>
                    </td>
                    <td class="pr-148">
                      <st-input-number v-model="packageData.team_unit_price" :float="true" :disabled="packageData.is_team===0">
                        <template slot="addonAfter">元</template>
                      </st-input-number>
                    </td>
                    <td>{{team_total}}</td>
                    <td class="overflow-hidden" @click="teamCourseListShow">
                      <a class="set-course-button" :class="{'hide':!teamCourseListIsShow}" href="javascript:void(0)">配置上课范围&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                    </td>
                  </tr>
                  <tr class="bg-row-odd team-course-list-content" v-if="teamCourseListIsShow">
                    <td class="rightline" colspan="2"></td>
                    <td class="team-course-table" colspan="4">
                      <div :class="add('team-course-table')">
                        <table>
                          <colgroup>
                            <col style="width:5%;">
                            <col style="width:81%;">
                            <col style="width:14%;">
                          </colgroup>
                          <tr class="bg-thead th">
                            <th></th>
                            <th>课程类型</th>
                            <th>
                              <a href="javascript:void(0)" v-if="!teamCourseListIsEdit" @click="teamCourseListIsEdit=true">编辑</a>
                              <a href="javascript:void(0)" class="mr-8" v-if="teamCourseListIsEdit" @click="teamCourseListIsEdit=false">保存</a>
                              <a href="javascript:void(0)" v-if="teamCourseListIsEdit" @click="teamCourseListIsEdit=false">取消</a>
                            </th>
                          </tr>
                          <tbody>
                            <tr class="checkbox border-bottom" v-if="teamCourseListIsEdit">
                              <td colspan="3" class="team-course-add-buton">
                                <a-button block type="dashed">
                                  <st-icon class="icon-12 mr-8" type="add"></st-icon>
                                  添加团体课程
                                </a-button>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="3">
                                <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                <ul class="team-course-content-table" v-if="!teamCourseListIsEdit" v-scrollBar='false' v-decorator="['teamCourseList1']">
                                    <li class="checkbox border-bottom" :class="{'bg-row-odd':i%2!==0,'bg-row-even':i%2===0}" v-for="(i,index) in teamCourseList" :key="index">
                                      <div></div>
                                      <div>Produce</div>
                                      <div></div>
                                    </li>
                                </ul>
                                <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                <ul class="team-course-content-table" v-if="teamCourseListIsEdit" v-scrollBar='false' v-decorator="['teamCourseList2']">
                                    <li class="checkbox border-bottom" :class="{'bg-row-odd':i%2!==0,'bg-row-even':i%2===0}" v-for="(i,index) in teamCourseList" :key="index">
                                      <div class="tg-c"><a-checkbox /></div>
                                      <div>Produce</div>
                                      <div>删除</div>
                                    </li>
                                </ul>
                              </td>
                            </tr>
                            <tr class="bg-thead checkbox topline" v-if="teamCourseListIsEdit">
                              <td class="tg-c"><a-checkbox /></td>
                              <td>批量操作</td>
                              <td>删除</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr class="bg-row-even checkbox topline">
                    <td class="tg-c"><a-checkbox @change="personalCheckboxChange" /></td>
                    <td class="rightline">私教课程</td>
                    <td class="pr-32 pl-56">
                      <st-input-number v-model="packageData.personal_times" :disabled="packageData.is_personal===0">
                        <template slot="addonAfter">节</template>
                      </st-input-number>
                    </td>
                    <td class="pr-148">
                      <st-input-number v-model="packageData.personal_unit_price" :float="true" :disabled="packageData.is_personal===0">
                        <template slot="addonAfter">元</template>
                      </st-input-number>
                    </td>
                    <td>{{personal_total}}</td>
                    <td class="overflow-hidden" @click="personalCourseListShow">
                      <a class="set-course-button" :class="{'hide':!personalCourseListIsShow}" href="javascript:void(0)">配置上课范围&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                    </td>
                  </tr>
                  <tr class="bg-row-even personal-course-list-content" v-if="personalCourseListIsShow">
                    <td class="rightline" colspan="2"></td>
                    <td class="personal-course-table" colspan="4">
                      <div :class="add('personal-course-table')">
                        <table>
                          <colgroup>
                            <col style="width:5%;">
                            <col style="width:29%;">
                            <col style="width:34%;">
                            <col style="width:16%;">
                            <col style="width:16%;">
                          </colgroup>
                          <tr class="bg-thead th">
                            <th></th>
                            <th>课程类型</th>
                            <th>支持预约的教练等级</th>
                            <th>授课教练数</th>
                            <th>
                              <a href="javascript:void(0)" v-if="!personalCourseListIsEdit" @click="personalCourseListIsEdit=true">编辑</a>
                              <a href="javascript:void(0)" class="mr-8" v-if="personalCourseListIsEdit" @click="personalCourseListIsEdit=false">保存</a>
                              <a href="javascript:void(0)" v-if="personalCourseListIsEdit" @click="personalCourseListIsEdit=false">取消</a>
                            </th>
                          </tr>
                          <tbody>
                            <tr class="checkbox border-bottom" v-if="personalCourseListIsEdit">
                              <td colspan="5" class="personal-course-add-buton">
                                <a-button block type="dashed">
                                  <st-icon class="icon-12 mr-8" type="add"></st-icon>
                                  添加私教课程
                                </a-button>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="5">
                                <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                <ul class="personal-course-content-table" v-if="personalCourseListIsEdit" v-scrollBar='false' v-decorator="['personalCourseList1']">
                                    <li class="checkbox border-bottom" :class="{'bg-row-odd':index%2!==0,'bg-row-even':index%2===0}" v-for="(item,index) in personalCourseList" :key="index">
                                      <div class="tg-c"><a-checkbox /></div>
                                      <div>Produce</div>
                                      <div>
                                        <a-dropdown placement="bottomRight" :trigger="['click']">
                                          <a href="javascript:void(0)">3个等级{{index==2?'还有还有还有还有':''}}&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                                          <a-checkbox-group slot="overlay">
                                            <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                            <ul class="personal-course-coach-grade-dropdown" v-scrollBar='false' v-decorator="[`personalCourseListCoachGrade${index}`]">
                                              <li><a-checkbox value="A">A</a-checkbox></li>
                                              <li><a-checkbox value="B">B</a-checkbox></li>
                                              <li><a-checkbox value="C">C</a-checkbox></li>
                                              <li><a-checkbox value="D">D</a-checkbox></li>
                                              <li><a-checkbox value="E">E</a-checkbox></li>
                                              <li><a-checkbox value="F">F</a-checkbox></li>
                                              <li><a-checkbox value="G">G</a-checkbox></li>
                                              <li><a-checkbox value="H">H</a-checkbox></li>
                                              <li><a-checkbox value="J">J</a-checkbox></li>
                                            </ul>
                                          </a-checkbox-group>
                                        </a-dropdown>
                                      </div>
                                      <div>0</div>
                                      <div>删除</div>
                                    </li>
                                </ul>
                                <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                <ul class="personal-course-content-table" v-if="!personalCourseListIsEdit" v-scrollBar='false' v-decorator="['personalCourseList2']">
                                    <li class="checkbox border-bottom" :class="{'bg-row-odd':i%2!==0,'bg-row-even':i%2===0}" v-for="(i,index) in personalCourseList" :key="index">
                                      <div class="tg-c"></div>
                                      <div>Produce</div>
                                      <div>等级1/等级2</div>
                                      <div>0</div>
                                      <div></div>
                                    </li>
                                </ul>
                              </td>
                            </tr>
                            <tr class="bg-thead checkbox" v-if="personalCourseListIsEdit">
                              <td class="tg-c"><a-checkbox /></td>
                              <td>批量操作</td>
                              <td>
                                <a-dropdown placement="bottomRight" :trigger="['click']">
                                  <a href="javascript:void(0)">批量设置等级&nbsp;&nbsp;<st-icon class="icon-12" type="down-small" /></a>
                                  <a-checkbox-group slot="overlay">
                                    <!-- 在AForm组件里用自定义指令时，需要加上v-decorator,值不能重复 -->
                                    <ul class="personal-course-coach-grade-dropdown" v-scrollBar='false' v-decorator="['personalCourseListCoachGradeAll']">
                                      <li><a-checkbox value="A">A</a-checkbox></li>
                                      <li><a-checkbox value="B">B</a-checkbox></li>
                                      <li><a-checkbox value="C">C</a-checkbox></li>
                                      <li><a-checkbox value="D">D</a-checkbox></li>
                                      <li><a-checkbox value="E">E</a-checkbox></li>
                                      <li><a-checkbox value="F">F</a-checkbox></li>
                                      <li><a-checkbox value="G">G</a-checkbox></li>
                                      <li><a-checkbox value="H">H</a-checkbox></li>
                                      <li><a-checkbox value="J">J</a-checkbox></li>
                                    </ul>
                                  </a-checkbox-group>
                                </a-dropdown>
                              </td>
                              <td>0</td>
                              <td>删除</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item :max="99999.9" label="总价">{{team_total+personal_total}}元</st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="售卖价格" required>
            <st-input-number
             :max="99999.9"
              v-decorator="[
                'price',
                 {rules: [{ required: true, message: '请输入售卖价格' }]}
              ]"
              :float="true">
              <template slot="addonAfter">元</template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item class="mg-b0" label="支持售卖时间" required>
            <div :class="basic('saletime')">
              <a-form-item class="page-a-form">
                <a-date-picker
                  style="width: 100%;"
                  :disabledDate="disabledStartDate"
                  v-decorator="['start_time',{rules:[{validator:start_time_validator}]}]"
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  :showToday="false"
                  @openChange="handleStartOpenChange"
                  @change="start_time_change"
                />
              </a-form-item>
              <span>~</span>
              <a-form-item class="page-a-form">
                <a-date-picker
                  :disabledDate="disabledEndDate"
                  v-decorator="['end_time',{rules:[{validator:end_time_validator}]}]"
                  format="YYYY-MM-DD"
                  placeholder="结束时间"
                  :showToday="false"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                  @change="end_time_change"
                />
              </a-form-item>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="有效时间" required>
            <st-input-number
              :min="1"
              :max="99999"
              v-decorator="[
                'valid_time',
                 {initialValue: null,rules: [{ required: true, message: '请输入有效时间' }]}
              ]">
              <a-select v-model="packageData.valid_time_unit" slot="addonAfter" style="width: 60px">
                <a-select-option
                v-for="(item,index) in unit_list"
                :value="item.value"
                :key="index" >{{item.label}}</a-select-option>
              </a-select>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="允许冻结天数" required>
            <st-input-number
              :min="1"
              :max="99999"
              v-decorator="[
                'frozen_days',
                 {initialValue: null,rules: [{ required: true, message: '请输入允许冻结天数' }]}
              ]">
              <template slot="addonAfter">天</template>
            </st-input-number>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="转让设置">
            <div :class="basic('transfer')">
              <a-checkbox :class="basic('transfer-checkbox')" @change="transfer">支持转让</a-checkbox>
              <st-input-number
              :max="packageData.transfer_unit===1?100:99999.9"
              v-decorator="[
                'transfer_rate',
                 {rules: [{initialValue: null,required: packageData.is_allow_transfer!==0, message: '请输入转让值数值'}]}
              ]" :disabled="packageData.is_allow_transfer===0" :float="packageData.transfer_unit===2" :class="basic('transfer-input')" style="padding-right:0;">
                <a-select :disabled="packageData.is_allow_transfer===0" slot="addonAfter" @change="transferUnitChange" v-model="packageData.transfer_unit" style="width: 60px">
                  <a-select-option v-for="item in Object.entries(package_course.transfer_unit.value)" :key="+item[0]" :value="+item[0]">{{item[1]}}</a-select-option>
                </a-select>
              </st-input-number>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="售卖方式" required>
            <a-checkbox-group v-model="packageData.sale_mode">
              <a-checkbox
              v-for="item in sell_type_list"
              :key="item.value"
              :disabled="item.value===2"
              :value="item.value">{{item.label}}</a-checkbox>
            </a-checkbox-group>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item
          validate-status="error"
          :help="imageErrorText"
          label="封面" required>
            <div :class="basic('upload')">
              <st-image-upload
              :class="basic('st-upload')"
              :cropperModal="cropperModal"
              :sizeLimit="5"
              :list="fileList"
              @change="fileChange">
                <i :class="basic('st-upload-icon')"></i>
                <div :class="basic('st-upload-text')">上传店招</div>
              </st-image-upload>
              <div :class="basic('upload-describe')">
                <p>图片格式必须为:png,bmp,jpeg,jpg,gif,建议使用png格式图片,以保存最佳效果</p>
                <p>建议尺寸为xx像素Xxx像素,不可大于2m</p>
              </div>
            </div>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="课程包介绍">
             <a-textarea
                v-model="packageData.description"
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入课程包介绍"
                :rows="4"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="备注">
             <a-textarea
                v-model="packageData.remark"
                maxlength="500"
                class="page-content-card-textarea"
                placeholder="请输入备注"
                :rows="4"/>
          </st-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label=" ">
          <st-button type="primary" class="mr-8" @click="save" :loading="addLoading.addPackage">保存</st-button>
          <st-button>保存并上架</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import moment from 'moment'
import { UserService } from '@/services/user.service'
import { cloneDeep, remove } from 'lodash-es'
import { AddPackageService } from './add-unlimit-package.service'
export default {
  name: 'ShopRangePackageAdd',
  serviceInject() {
    return {
      userService: UserService,
      addPackageService: AddPackageService
    }
  },
  rxState() {
    return {
      addLoading: this.addPackageService.loading$,
      package_course: this.userService.packageCourseEnums$
    }
  },
  bem: {
    add: 'page-shop-add-range-package',
    basic: 'page-shop-add-basic-package'
  },
  data() {
    return {
      packageData: {
        // 课程包名称
        course_name: '',
        // 是否支持团体课 0为不支持 1为支持
        is_team: 0,
        // 团体课总节数
        team_times: null,
        // 团体课单价
        team_unit_price: null,
        // 是否支持私教课 0为不支持 1为支持
        is_personal: 0,
        // 私教课总节数
        personal_times: null,
        // 私教课单价
        personal_unit_price: null,
        // 售价
        price: null,
        // 售卖开始时间
        start_time: '',
        // 售卖截止时间
        end_time: '',
        // 有效时间值
        valid_time: null,
        // 有效时间单位 1:天 2:月 3:年
        valid_time_unit: 1,
        // 允许冻结天数
        frozen_days: null,
        // 是否可以转让: 0 不可以 1 可以
        is_allow_transfer: 0,
        // 转让费率
        transfer_rate: null,
        // 转让单位 1:百分比 2:元
        transfer_unit: 1,
        // 售卖方式
        sale_mode: [2],
        // 封面对象
        image: {
          image_id: null,
          image_key: ''
        },
        // 课程包介绍
        description: '',
        // 备注
        remark: ''
      },
      form: this.$form.createForm(this),
      start_time: null,
      end_time: null,
      endOpen: false,
      // 课程范围是否未输入过
      courseIsFirstInput: true,
      // 课程范围是否未配置
      courseIsNone: false,
      courseErrorText: '',
      // 是否配置了用户端
      appConfig: false,
      // 是否未传了封面
      imageIsNone: false,
      imageErrorText: '',
      fileList: [],
      cropperModal: {},
      unit_list: [
        {
          value: 1,
          label: '天'
        },
        {
          value: 2,
          label: '月'
        },
        {
          value: 3,
          label: '年'
        }
      ],

      // team course
      teamCourseList: [1, 2, 3, 4, 5, 6],
      teamCourseListIsEdit: false,
      teamCourseListIsShow: false,
      // personal course
      personalCourseList: [{
        value: 1,
        coachGradeIsShow: false
      }, {
        value: 1,
        coachGradeIsShow: false
      }, {
        value: 1,
        coachGradeIsShow: false
      }, {
        value: 1,
        coachGradeIsShow: false
      }, {
        value: 1,
        coachGradeIsShow: false
      }, {
        value: 1,
        coachGradeIsShow: false
      }],
      personalCourseListIsEdit: false,
      personalCourseListIsShow: false

    }
  },
  methods: {
    // team
    teamCourseListShow() {
      this.teamCourseListIsShow = !this.teamCourseListIsShow
    },
    // personal
    personalCourseListShow() {
      this.personalCourseListIsShow = !this.personalCourseListIsShow
    },
    // 保存
    save() {
      this.course_validator()
      this.image_validator()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err && !this.courseIsNone && !this.imageIsNone) {
          this.packageData.course_name = values.course_name
          this.packageData.price = values.price
          this.packageData.valid_time = values.valid_time
          this.packageData.frozen_days = values.frozen_days
          this.packageData.transfer_rate = values.transfer_rate
          this.packageData.start_time = `${this.start_time.format('YYYY-MM-DD')} 00:00:00`
          this.packageData.end_time = `${this.end_time.format('YYYY-MM-DD')} 00:00:00`
          this.addPackageService.addPackage(this.packageData).subscribe(res => {
            console.log(res)
          })
        }
      })
    },
    // course validatorFn
    course_validator() {
      this.courseIsFirstInput = false
      if (this.team_total || this.personal_total) {
        // 校验通过
        this.courseIsNone = false
        this.courseErrorText = ''
      } else {
        // 校验未通过
        this.courseIsNone = true
        this.courseErrorText = '请输入上课范围'
      }
    },
    // image validatorFn
    image_validator() {
      if (this.packageData.image.image_key !== '') {
        // 校验通过
        this.imageIsNone = false
        this.imageErrorText = ''
      } else {
        // 校验未通过
        this.imageIsNone = true
        this.imageErrorText = '请上传封面'
      }
    },
    // checkboxChange
    teamCheckboxChange(e) {
      this.packageData.is_team = +e.target.checked
      this.courseIsFirstInput = false
    },
    personalCheckboxChange(e) {
      this.packageData.is_personal = +e.target.checked
      this.courseIsFirstInput = false
    },
    // 转让
    transfer(e) {
      this.packageData.is_allow_transfer = +e.target.checked
      // 重置转让费用的校验
      this.packageData.transfer_rate = null
      this.form.resetFields(['transfer_rate'])
    },
    fileChange(data) {
      if (data.length) {
        // 上传
        this.packageData.image.image_id = data[0].image_id
        this.packageData.image.image_key = data[0].image_key
        this.imageIsNone = false
        this.imageErrorText = ''
      } else {
        // 删除
        this.packageData.image.image_id = null
        this.packageData.image.image_key = ''
        this.imageIsNone = true
        this.imageErrorText = '请上传封面'
      }
    },
    transferUnitChange() {
      this.packageData.transfer_rate = null
      this.form.setFieldsValue({
        'transfer_rate': null
      })
    },
    // start_time validatorFn
    start_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择开始售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // end_time validatorFn
    end_time_validator(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请选择结束售卖时间')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    // 售卖时间-start
    start_time_change(data) {
      this.start_time = cloneDeep(data)
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    disabledStartDate(startValue) {
      const endValue = this.end_time
      if (!endValue) {
        // 结束时间未选择
        return (
          startValue.valueOf() <
          moment()
            .subtract(1, 'd')
            .valueOf()
        )
      }
      let start =
        endValue.valueOf() >
        moment()
          .add(30, 'y')
          .valueOf()
          ? moment(endValue)
            .subtract(30, 'y')
            .valueOf()
          : moment()
            .subtract(1, 'd')
            .add(1, 'ms')
            .valueOf()
      return (
        startValue.valueOf() < start ||
        startValue.valueOf() >
          moment(endValue)
            .subtract(1, 'd')
            .valueOf()
      )
    },
    // 售卖时间-end
    end_time_change(data) {
      this.end_time = cloneDeep(data)
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    disabledEndDate(endValue) {
      const startValue = this.start_time
      if (!startValue) {
        // 开始时间未选择
        return (
          endValue.valueOf() >=
            moment()
              .add(30, 'y')
              .valueOf() || endValue.valueOf() <= moment().valueOf()
        )
      }
      return (
        endValue.valueOf() >=
          moment(startValue)
            .add(30, 'y')
            .valueOf() ||
        endValue.valueOf() <
          moment(startValue)
            .add(1, 'd')
            .valueOf()
      )
    },
    // moment
    moment
  },
  computed: {
    // 团课小计
    team_total() {
      if (+this.packageData.team_times && +this.packageData.team_unit_price) {
        return this.packageData.team_times * (this.packageData.team_unit_price * 10) / 10
      } else {
        return 0
      }
    },
    // 私教小计
    personal_total() {
      if (+this.packageData.personal_times && +this.packageData.personal_unit_price) {
        return this.packageData.personal_times * (this.packageData.personal_unit_price * 10) / 10
      } else {
        return 0
      }
    },
    // 售卖渠道
    sell_type_list() {
      let sell_type = cloneDeep(Object.entries(this.package_course.sale_mode.value))
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: +i[0],
          label: i[1]
        })
      })
      if (!this.appConfig) {
        remove(arr, i => i.value === 1)
      }
      return arr
    }
  }
}
</script>
