<template>
  <div class="basic">
    <div v-if="data.detailFrom" class="user">
      <el-form
        ref="refruleForm"
        :model="data.detailFrom"
        label-position="top"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <div class="title">基本信息</div>
        <div class="userName flex">
          <div class="list">
            <div>{{ data.detailFrom.name ? data.detailFrom.name.substr(0, 1) : '' }}</div>
            <div class="flex flex-column flex-around">
              <div>
                <h6>{{ data.detailFrom.name }}</h6>
                <span @click="data.companyNameShow = true">
                  <img src="@/assets/img/Icon-editor.png" />
                </span>
              </div>
              <div>
                <span
                  :class="
                    data.detailFrom.certType === 1
                      ? 'cor flex flex-center flex-only-center'
                      : 'flex flex-center flex-only-center'
                  "
                  >{{ data.detailFrom.certType === 1 ? '已认证' : '未认证' }}</span
                >
                <span v-if="data.detailFrom.certType == 2">完成灰鲸·禹迹认证后，将获得更多权限</span>
              </div>
            </div>
          </div>
          <div
            v-show="data.detailFrom.certType == 2"
            @click="router.push('/identity/authentication?type=' + data.detailFrom.certType)"
          >
            申请认证
          </div>
        </div>
        <br />
        <el-row :gutter="30" style="border-bottom: 1px solid #f3f8ff">
          <el-col :span="6" :offset="0">
            <el-form-item label="企业域名" prop="website">
              <el-input v-model="data.detailFrom.website" clearable placeholder="请输入企业域名" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="行业">
              <el-cascader
                v-model="data.detailFrom.industry"
                style="width: 100%"
                placeholder="请选择行业类型"
                :options="data.industryList"
                :props="data.props"
                @change="handleChangeIndustry"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="规模">
              <el-select v-model="data.detailFrom.scale" placeholder="请选择规模" filterable>
                <el-option
                  v-for="item in data.scaleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <br />
        <div class="title">联系信息</div>
        <br />
        <el-row :gutter="30">
          <el-col :span="6" :offset="0">
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input v-model="data.detailFrom.contactName" placeholder="请输入联系人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="联系人邮箱" prop="email">
              <el-input v-model="data.detailFrom.email" placeholder="请输入联系人邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="联系人手机" prop="phone">
              <el-input
                v-model="data.detailFrom.phone"
                maxlength="11"
                type="number"
                placeholder="请输入联系人手机"
                oninput="if(value.length > 11) value=value.slice(0, 11)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" prop="landline">
            <el-form-item label="座机">
              <el-input v-model="data.detailFrom.landline" type="number" placeholder="请输入座机号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6" :offset="0">
            <el-form-item label="地区">
              <el-cascader
                v-model="data.detailFrom.country"
                style="width: 100%"
                placeholder="请选择地区"
                :options="data.regionList"
                :props="data.props"
                @change="handleChangeRegion"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="邮编" prop="postalCode">
              <el-input v-model="data.detailFrom.postalCode" type="text" placeholder="请输入邮编号码" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="企业地址" prop="address1">
              <el-input v-model="data.detailFrom.address1" placeholder="请输入企业地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" style="width: 132px" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="logOut">
      <div>
        <div class="title">解散企业</div>
      </div>
      <br />
      <div>
        <div v-if="data.dropShow" @click="data.dropShow = false">
          <svg-icon class-name="icon" icon-class="drop-down"></svg-icon>
          查看更多
        </div>
        <div v-if="!data.dropShow" @click="data.dropShow = true">
          <svg-icon class-name="icon" icon-class="pull-up"></svg-icon>
          收起内容
        </div>
        <div v-if="!data.dropShow">
          一旦你解散了企业，企业内所有项目、部门、成员，项目中所有内容等都将会被永久删除。这是一个不可恢复的操作，请谨慎对待！
        </div>
        <div v-if="!data.dropShow" @click="dissolution">解散企业</div>
      </div>
    </div>

    <!-- 解散企业 -->
    <el-dialog v-model="data.removalShow" width="40%">
      <div class="removalShow">
        <h3 style="text-align: center">解散企业</h3>
        <br />
        <el-alert
          :title="`[ ${data.detailFrom.name} ] 将解散，请谨慎操作`"
          type="warning"
          show-icon
          :closable="false"
        ></el-alert>

        <br />
        <el-row align="middle">
          <el-col :span="8" :offset="0" class="item">手机号码：</el-col>
          <el-col :span="12" :offset="0" class="key">{{ data.mobile }}</el-col>
        </el-row>
        <br />
        <el-row align="middle">
          <el-col :span="8" :offset="0" class="item">验证码：</el-col>
          <el-col :span="16" :offset="0" class="flex">
            <el-input v-model="data.pinCode" placeholder="请输入短信验证码" type="number" maxlength="6"></el-input>
            <el-button class="code" type="primary" :disabled="data.codeBtnDisabled" @click="sendCode">
              {{ data.codeBtnText }}
            </el-button>
          </el-col>
        </el-row>
        <br />
        <br />
        <el-button type="primary" @click="removalBtn">确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改公司名称 -->
    <el-dialog v-model="data.companyNameShow" width="40%">
      <div class="removalShow">
        <h3 style="text-align: center">修改公司名称</h3>
        <br />
        <el-row align="middle">
          <el-col :span="24" :offset="0" class="flex flex-more-center">
            <span class="cor-d51">*</span>请重新输入企业名称
          </el-col>
        </el-row>
        <br />
        <el-row align="middle">
          <el-col :span="24" :offset="0" class="item">
            <el-input v-model="data.newName" placeholder="请输入企业名称"></el-input>
          </el-col>
        </el-row>
        <br />
        <br />
        <el-button type="primary" @click="companyNameBtn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from '@/api/basic'
import baseApi from '@/api/base'
import Cookies from 'js-cookie'
import industryList from '@/options/industry-cascade-list-inquiry'
import regionList from '@/options/region-list-inquiry'
import config from '@/config'

interface ValRef {
  value: any
}

const router = useRouter()
const refruleForm: ValRef = ref(null)

// 表单验证
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮件'))
  } else {
    const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('邮箱格式错误'))
    }
  }
}

// 邮编验证
const validatePostCode = (rule: any, value: any, callback: any) => {
  if (value !== '' && value !== null) {
    const reg = /^[1-9][0-9]{5}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮编'))
    }
  } else {
    callback()
  }
}

// 手机号验证
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    const reg = /^1[3456789]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('手机号码格式错误'))
    }
  }
}

const rules = {
  contactName: [
    { required: true, message: '请输入联系姓名', trigger: 'blur' },
    { min: 0, max: 20, message: '最大字数不得超过20字', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  postalCode: [
    { required: false, message: '请输入邮编', trigger: 'blur' },
    { validator: validatePostCode, trigger: 'blur' }
  ],
  website: [
    { required: false, message: '请输入企业域名', trigger: 'blur' },
    { min: 0, max: 50, message: '最大字数不得超过50字', trigger: 'blur' }
  ],
  address1: [
    { required: false, message: '请输入企业地址', trigger: 'blur' },
    { min: 0, max: 50, message: '最大字数不得超过100字', trigger: 'blur' }
  ]
}

const data = reactive({
  dropShow: false,
  removalShow: false,
  companyNameShow: false,
  newName: '',
  industryList: industryList, // 行业列表
  props: {
    // hover 行业多级联选
    expandTrigger: 'hover'
  },
  regionList: regionList, // 地区列表
  mobile: '',
  scaleList: [
    {
      value: 'L1',
      label: '1-9人'
    },
    {
      value: 'L2',
      label: '10-99人'
    },
    {
      value: 'L3',
      label: '100-999人'
    },
    {
      value: 'L4',
      label: '1000-9999人'
    },
    {
      value: 'L5',
      label: '10000-99999人'
    },
    {
      value: 'L6',
      label: '100000人以上'
    }
  ],
  detailFrom: <any>{},
  pinCode: '',
  codeBtnText: '获取验证码',
  codeBtnDisabled: false
})

onMounted(async () => {
  // 获取基本信息
  getDetail()
})

// 解散企业
const dissolution = async () => {
  const res = await baseApi.UserBasicInfoInquiry({
    userId: Cookies.get('userId')
  })
  if (res.status.success) {
    data.removalShow = true
    data.mobile = res.body.mobile
  }
}

/**
 * 获取 行业列表 所选中的值
 */
const handleChangeIndustry = (value: any) => {
  data.detailFrom.industry = value[1]
}

/**
 * 获取 地区列表 所选中的值
 */
const handleChangeRegion = (value: any) => {
  data.detailFrom.country = value
}

// 修改企业名称
const companyNameBtn = async () => {
  if (!data.newName || data.newName.length < 2 || data.newName.length > 50) {
    ElMessage.error('请输入企业名称，最小2个字符，最大50个字符')
    return
  }
  if (data.newName.indexOf(' ') !== -1) {
    ElMessage.error('当前团队名称中不能包含空格，请重新输入')
    return
  }

  data.detailFrom.userId = Cookies.get('userId')
  const res = await api.SubjectBasicInfoMaintenance({ name: data.newName, subjectId: data.detailFrom.id })
  if (res.body) {
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    getDetail()
    data.companyNameShow = false
  }
}

// 验证码倒计时
const codeBtn = () => {
  let time = 60
  const timer = setInterval(() => {
    time--
    if (time <= 0) {
      clearInterval(timer)
      data.codeBtnText = '获取验证码'
      data.codeBtnDisabled = false
    } else {
      data.codeBtnText = `${time}s后重发`
      data.codeBtnDisabled = true
    }
  }, 1000)
}

// 发送验证码
const sendCode = async () => {
  if (!/^[1]([3-9])[0-9]{9}$/.test(data.mobile)) {
    ElMessage.error('请输入正确的联系电话（11位手机号）')
    return
  }
  const res = await baseApi.AccountPinCodeApply({ phone: data.mobile, type: 3 })
  if (res.status.success) {
    ElMessage.success('验证码发送成功')
    codeBtn()
  } else {
    ElMessage.error('验证码发送失败')
  }
}

// 解散
const removalBtn = async () => {
  if (!data.pinCode) {
    ElMessage.error('请输入验证码')
    return
  }
  const res = await api.SubjectDissolutionMaintenance({
    pinCode: data.pinCode,
    userId: Cookies.get('userId'),
    subjectId: Cookies.get('entityId')
  })
  if (res.status.success) {
    ElMessage({
      message: '解散成功',
      type: 'success'
    })
    Cookies.remove('entityId')
    setTimeout(() => {
      location.href = config.GWIN_URL_TENANT
    }, 2000)
  }
}

// 修改确定
const onSubmit = async () => {
  refruleForm.value.validate(async (valid: any) => {
    if (valid) {
      data.detailFrom.userId = Cookies.get('userId')
      data.detailFrom.subjectId = data.detailFrom.id
      // 省市区
      if (data.detailFrom.country) {
        data.detailFrom.province = data.detailFrom.country[0]
        data.detailFrom.city = data.detailFrom.country[1]
        data.detailFrom.district = data.detailFrom.country[2]
      }
      data.detailFrom.country = '中国'
      const res = await api.SubjectBasicInfoMaintenance(data.detailFrom)
      if (res.status.success) {
        ElMessage({
          message: '修改成功',
          type: 'success'
        })
        getDetail()
      }
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

// 获取基本信息
const getDetail = async () => {
  const res = await api.SubjectBasicInfoInquiry({ subjectId: Cookies.get('entityId'), userId: Cookies.get('userId') })
  if (res.status.success) data.detailFrom = res.body
  data.detailFrom.country = [data.detailFrom.province, data.detailFrom.city, data.detailFrom.district]
}
</script>

<style lang="scss">
.basic {
  .user {
    background: #fff;
    padding: 20px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
    border-radius: 3px;
  }
  .removalShow {
    display: flex;
    width: 80%;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    font-size: 14px;
    font-weight: 400;
    .code {
      position: relative;
      left: -5px;
      border-radius: 0 5px 5px 0 !important;
    }
    .item {
      color: #999999;
    }
    .key {
      color: #121212;
    }
  }
  > div {
    .title {
      color: #121212;
      font-size: 16px;
      font-weight: 500;
      &::before {
        content: '';
        width: 4px;
        height: 18px;
        margin-right: 6px;
        display: inline-block;
        vertical-align: text-bottom;
        background-color: #3c7dff;
      }
    }
  }

  .userName {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;

      > div:first-child {
        width: 60px;
        height: 60px;
        background: #3c7dff;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: 600;
        color: #ffffff;
        margin-right: 10px;
      }
      > div {
        > div:first-child {
          display: flex;
          align-items: center;
          h6 {
            font-size: 14px;
            font-weight: 700;
            color: #121212;
          }
          > span {
            font-size: 14px;
            font-weight: 400;
            color: #3c7dff;
            margin-left: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 20px;
              margin-left: 5px;
            }
          }
        }
        > div:last-child {
          display: flex;
          align-items: center;
          > span:nth-child(1) {
            font-size: 12px;
            font-weight: 400;
            color: #3c7dff;
            width: 48px;
            height: 26px;
            border-radius: 4px;
            border: 1px solid #3c7dff;

            border-radius: 4px;
            margin-right: 10px;
          }
          > span:nth-child(2) {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
          }
          .cor {
            border: 1px solid #cdcdcd !important;
            color: #cdcdcd !important;
          }
        }
      }
    }
    > div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 104px;
      height: 38px;
      background: #3c7dff;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .logOut {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    display: flex;
    > div:first-child {
      position: relative;
      top: 9px;
      margin-right: 20px;
    }
    > div:last-child {
      flex: 1;
      > div:nth-child(1) {
        height: 40px;
        background: rgba(246, 247, 251, 0.5);
        font-size: 14px;
        font-weight: 400;
        color: #121212;
        display: flex;
        align-items: center;
        padding-left: 10px;
      }
      > div:nth-child(2) {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
      > div:nth-child(3) {
        margin: 20px 0 10px;
        width: 132px;
        height: 38px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #f5222d;
        cursor: pointer;
        font-size: 16px;
        font-weight: 400;
        color: #f5222d;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    svg {
      margin-right: 5px;
    }
  }
}
</style>
