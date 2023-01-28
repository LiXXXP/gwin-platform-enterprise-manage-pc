<template>
  <!-- 认证 -->
  <div class="prove">
    <el-row justify="center" align="middle" type="flex">
      <el-col :span="12" :offset="0" class="flex flex-center pad-20">
        <h2>灰鲸·禹迹认证</h2>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="24" :offset="0">
        <el-steps align-center process-status="finish" :active="data.active" finish-status="finish">
          <el-step title="填写资料"></el-step>
          <el-step title="提交审核"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row class="hint pad-20">
      <el-col :span="24" :offset="0" class="title font-14 cor-333 font-b">
        <img src="@/assets/img/Icon-Prompt.png" />提示
      </el-col>
      <el-col :span="24" :offset="0">请提交以下信息用于认证，预计 2 个工作日内完成审核。</el-col>
    </el-row>
    <el-form
      v-if="data.proveForm"
      ref="proveForm"
      class="pad-20"
      label-position="top"
      :model="data.proveForm"
      :rules="rules"
      label-width="100px"
      :inline="false"
    >
      <div class="step flex flex-only-end">
        <img src="../../assets/img/step1.png" />
        <span>组织信息</span>
      </div>
      <el-form-item label="公司名称" prop="corporateName">
        <el-input v-model="data.proveForm.corporateName" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="公司注册号（社会信用代码）" prop="licenseNo">
        <el-input v-model="data.proveForm.licenseNo" maxlength="18" placeholder="请输入公司注册号"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input v-model="data.proveForm.address" placeholder="请输入公司地址"></el-input>
      </el-form-item>
      <el-form-item label="所属行业" prop="industry">
        <el-cascader
          v-model="data.proveForm.industry"
          style="width: 100%"
          placeholder="请选择行业类型"
          :options="data.industryList"
          :props="data.props"
          clearable
          @change="handleChangeIndustry"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="上传营业执照" prop="licenseUri">
        <el-popover placement="right" :width="400" trigger="hover">
          <template #reference>
            <img class="doubt" src="@/assets/img/Icon-problem.png" alt="" />
          </template>
          <div>
            <h3>上传需知</h3>
            <br />
            1.上传：多证合一营业执照，照片或扫描件。<br />
            2.完成认证后不可更改主体，如需更改请联系灰鲸·禹迹客服<br />
            3.信息需清晰可见，内容真实有效，不得做任何修改。 <br />
            4.支持 JPG、JPEG、PNG、BMP 格式，大小不超过 5 MB。
          </div>
        </el-popover>
        <el-upload
          ref="licenseImg"
          class="avatar-uploader"
          action="/cos/v1/FileUpload"
          :data="{ channel: 'gwin-cloud', fileName: 'licenseUri' + Date.parse(new Date()) + '.jpeg' }"
          :on-change="handleLicense"
          :show-file-list="false"
          :limit="2"
          :auto-upload="false"
          thumbnail-mode
        >
          <div v-if="data.proveForm.licenseUri" class="lookImg">
            <div class="look" @click.stop="handlePictureCardPreview(data.proveForm.licenseUri)">
              <svg-icon class-name="icon" icon-class="icon-look"></svg-icon>
              查看
            </div>
            <img :src="data.proveForm.licenseUri" class="avatar" />
          </div>
          <el-icon v-else class="avatar-uploader-icon">
            <plus />
            上传营业执照
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="公司官网" prop="website">
        <el-input v-model="data.proveForm.website" placeholder="请输入公司官网"></el-input>
      </el-form-item>
      <el-form-item label="ICP备案信息" prop="icp">
        <el-input v-model="data.proveForm.icp" placeholder="请输入公司官网"></el-input>
      </el-form-item>
      <div class="step flex flex-only-end">
        <img src="../../assets/img/step2.png" />
        <span>管理员信息</span>
      </div>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="data.proveForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="icNo">
        <el-input v-model="data.proveForm.icNo" maxlength="18" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="上传身份证（头像面）" prop="icAvatarUri">
        <el-popover placement="right" :width="400" trigger="hover">
          <template #reference>
            <img class="doubt" style="left: 150px" src="@/assets/img/Icon-problem.png" alt="" />
          </template>
          <div>
            <h3>上传需知</h3>
            <br />
            1.上传身份证头像面，并保证身份证号码字段清晰、无遮挡、可识别。<br />
            2.信息需清晰可见，内容真实有效，不得做任何修改。 <br />
            3.支持 JPG、JPEG、PNG、BMP 格式，大小不超过 5 MB。
          </div>
        </el-popover>
        <el-upload
          ref="avatarImg"
          class="avatar-uploader"
          action="/cos/v1/FileUpload"
          :data="{ channel: 'gwin-cloud', fileName: 'icAvatarUri' + Date.parse(new Date()) + '.jpeg' }"
          :show-file-list="false"
          :limit="2"
          :on-change="handleAvatar"
          :auto-upload="false"
        >
          <div v-if="data.proveForm.icAvatarUri" class="lookImg">
            <div class="look" @click.stop="handlePictureCardPreview(data.proveForm.icAvatarUri)">
              <svg-icon class-name="icon" icon-class="icon-look"></svg-icon>
              查看
            </div>
            <img :src="data.proveForm.icAvatarUri" class="avatar" />
          </div>
          <el-icon v-else class="avatar-uploader-icon">
            <plus />
            上传身份证（头像面）
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传身份证（国徽面）" prop="icEmblemUri">
        <el-popover placement="right" :width="400" trigger="hover">
          <template #reference>
            <img class="doubt" style="left: 150px" src="@/assets/img/Icon-problem.png" alt="" />
          </template>
          <div>
            <h3>上传需知</h3>
            <br />
            1.上传身份证国徽面，并保证身份证号码字段清晰、无遮挡、可识别。<br />
            2.信息需清晰可见，内容真实有效，不得做任何修改。 <br />
            3.支持 JPG、JPEG、PNG、BMP 格式，大小不超过 5 MB。
          </div>
        </el-popover>
        <el-upload
          ref="emblemImg"
          class="avatar-uploader"
          action="/cos/v1/FileUpload"
          :data="{ channel: 'gwin-cloud', fileName: 'icEmblemUri' + Date.parse(new Date()) + '.jpeg' }"
          :show-file-list="false"
          :limit="2"
          :on-change="handleEmblem"
          :auto-upload="false"
        >
          <div v-if="data.proveForm.icEmblemUri" class="lookImg">
            <div class="look" @click.stop="handlePictureCardPreview(data.proveForm.icEmblemUri)">
              <svg-icon class-name="icon" icon-class="icon-look"></svg-icon>
              查看
            </div>
            <img :src="data.proveForm.icEmblemUri" class="avatar" />
          </div>
          <el-icon v-else class="avatar-uploader-icon">
            <plus />
            上传身份证（国徽面）
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPhone">
        <el-input
          v-model="data.proveForm.contactPhone"
          maxlength="11"
          type="number"
          placeholder="请输入联系电话"
          oninput="if(value.length > 11) value=value.slice(0, 11)"
        ></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="pinCode">
        <el-row>
          <div class="code">
            <el-input
              v-model="data.proveForm.pinCode"
              type="number"
              maxlength="6"
              oninput="if(value.length > 6) value=value.slice(0, 6)"
              placeholder="请输入短信验证码"
            ></el-input>
            <el-button class="codeBtn" type="primary" :disabled="data.codeBtnDisabled" @click="sendCode">
              {{ data.codeBtnText }}
            </el-button>
          </div>
        </el-row>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="contactEmail">
        <el-input v-model="data.proveForm.contactEmail" placeholder="请输入电子邮箱"></el-input>
      </el-form-item>
      <el-row>
        <el-button @click="cancelSubmit">　取消　</el-button>
        <el-button type="primary" @click="onSubmit">提交审核</el-button>
      </el-row>
    </el-form>
    <!-- 查看图片 -->
    <el-dialog v-model="data.dialogVisible">
      <img style="width: 100%" :src="data.dialogImageUrl" alt="" />
    </el-dialog>
    <br />
    <br />
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import basicApi from '@/api/basic'
import baseApi from '@/api/base'
import Cookies from 'js-cookie'
import SvgIcon from '@/components/SvgIcon/index.vue'
import ImageCompressor from 'image-compressor.js'
import industryList from '@/options/industry-cascade-list-inquiry'

interface ValRef {
  value: any
}

const emit = defineEmits(['subProve', 'cancelSubmit'])
const licenseImg: ValRef = ref(null)
const avatarImg: ValRef = ref(null)
const emblemImg: ValRef = ref(null)
const proveForm: ValRef = ref(null)

const props = defineProps({
  status: {
    type: String,
    default: ''
  },
  proveStatus: {
    type: Object,
    default: () => ({})
  }
})

// 表单验证 身份证验证
const validateIdCard = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入正确的身份证号'))
  } else {
    const reg = /^[1-9]\d{5}(19|20)\d{2}[01]\d[0123]\d\d{3}[xX\d]$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的身份证号'))
    }
  }
}

// 邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else {
    const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('邮箱格式错误'))
    }
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
      callback(new Error('请输入正确的手机号'))
    }
  }
}
const rules = {
  licenseNo: [
    { required: true, message: '请输入公司注册号', trigger: 'blur' },
    { min: 18, max: 18, message: '请输入正确的社会信用代码（18位）', trigger: 'blur' }
  ],
  licenseUri: [{ required: true, message: '请上传营业执照照片', trigger: 'blur' }],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 0, max: 40, message: '请输入姓名（最大字数不得超过40个字）', trigger: 'blur' }
  ],
  industry: [{ required: true, message: '请选择所属行业', trigger: 'change' }],
  pinCode: [
    { required: true, message: '请输入短信验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入正确的短信验证码（6位数字）', trigger: 'blur' }
  ],
  icNo: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { min: 18, max: 18, message: '请输入正确的身份证信息', trigger: 'blur' },
    { validator: validateIdCard, trigger: 'blur' }
  ],
  icEmblemUri: [{ required: true, message: '请上传身份证（正面）照片', trigger: 'change' }],
  icAvatarUri: [{ required: true, message: '请上传身份证（反面）照片', trigger: 'change' }],
  corporateName: [
    { required: true, message: '请输入公司名称', trigger: 'blur' },
    { min: 2, max: 50, message: '最小字数不得少于两个字，最大字数不得超过50字', trigger: 'blur' }
  ],
  website: [
    { required: false, message: '请输入', trigger: 'blur' },
    { min: 0, max: 100, message: '最大字数不得超过100个字', trigger: 'blur' }
  ],
  icp: [
    { required: false, message: '请输入', trigger: 'blur' },
    { min: 0, max: 100, message: '最大字数不得超过100个字', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入企业地址', trigger: 'blur' },
    { min: 0, max: 100, message: '最大字数不得超过100个字', trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  contactEmail: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ]
}

const data = reactive({
  active: 0,
  industryList: industryList, // 行业列表
  props: {
    expandTrigger: 'hover'
  },
  proveForm: props.proveStatus,
  codeBtnText: '获取验证码',
  codeBtnDisabled: false,
  dialogImageUrl: '',
  dialogVisible: false,
  handleLicenseShow: false,
  handleEmblemShow: false,
  handleAvatarShow: false,
  loading: {},
  clauseShow: false,
  loadingShow: {},
  subInterval: {}
})

onMounted(() => {
  if (props.status === '4') {
    data.handleLicenseShow = true
    data.handleAvatarShow = true
    data.handleEmblemShow = true
  }
})

// 查看图片
const handlePictureCardPreview = (url: any) => {
  data.dialogImageUrl = url
  data.dialogVisible = true
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
  if (data.proveForm.contactPhone === undefined || !/^[1]([3-9])[0-9]{9}$/.test(data.proveForm.contactPhone)) {
    ElMessage.error('请输入正确的手机号')
    return
  }
  const res = await baseApi.AccountPinCodeApply({ phone: data.proveForm.contactPhone, type: 5 })
  if (res.status.success) {
    ElMessage.success('验证码发送成功')
    codeBtn()
  } else {
    ElMessage.error('验证码发送失败')
  }
}

function beforeRead(file: any) {
  return new Promise((resolve, reject) => {
    file = new ImageCompressor(file, {
      maxWidth: 1024,
      maxHeight: 1024,
      checkOrientation: false,
      success(result) {
        resolve(result)
      },
      error(e) {
        reject(e)
      }
    })
  })
}

// 营业执照
const handleLicense = async (file: any, fileList: any) => {
  if (file.status === 'success' || file.status === 'ready') {
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      ElMessage.error('图片大小不得超过5MB')
      fileList.length === 1 ? fileList.splice(0, 1) : fileList.length === 2 ? fileList.splice(1, 1) : ''
      return false
    }
  } else if (file.status === 'fail') {
    data.loadingShow.close()
    data.proveForm.licenseUri = ''
    clearInterval(data.subInterval)
    if (file.response) {
      if (file.response.status.replyCode !== '0') {
        ElMessage.error(file.response.status.replyText)
      }
    } else {
      ElMessage.error('图片上传错误')
    }
    return
  }

  // 检测类型
  const isJPG =
    file.raw.type === 'image/jpeg' ||
    file.raw.type === 'image/png' ||
    file.raw.type === 'image/jpg' ||
    file.raw.type === 'image/bmp'
  if (!isJPG) {
    ElMessage.error('请上传正确的图片格式，支持 JPG、JPEG、PNG、BMP 格式')
    fileList.length === 1 ? fileList.splice(0, 1) : fileList.length === 2 ? fileList.splice(1, 1) : ''
    return
  }

  // 赋值数据
  data.handleLicenseShow = false
  fileList.length === 2 ? fileList.splice(0, 1) : ''
  if (file.response) {
    data.proveForm.licenseUri = file.response.body.fileUrl
    data.handleLicenseShow = true
    return
  } else {
    // 压缩图片
    data.handleLicenseShow = false
    const beforFile: any = await beforeRead(file.raw)
    data.proveForm.licenseUri = URL.createObjectURL(beforFile)
    file = beforFile
  }
}

// 身份证
const handleAvatar = async (file: any, fileList: any) => {
  if (file.status === 'success' || file.status === 'ready') {
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      ElMessage.error('图片大小不得超过5MB')
      fileList.length === 1 ? fileList.splice(0, 1) : fileList.length === 2 ? fileList.splice(1, 1) : ''
      return
    }
  } else if (file.status === 'fail') {
    data.loadingShow.close()
    data.proveForm.icAvatarUri = ''
    clearInterval(data.subInterval)
    if (file.response) {
      if (file.response.status.replyCode !== '0') {
        ElMessage.error(file.response.status.replyText)
      }
    } else {
      ElMessage.error('图片上传错误')
    }
    return
  }

  // 检测类型
  const isJPG =
    file.raw.type === 'image/jpeg' ||
    file.raw.type === 'image/png' ||
    file.raw.type === 'image/jpg' ||
    file.raw.type === 'image/bmp'
  if (!isJPG) {
    ElMessage.error('请上传正确的图片格式，支持 JPG、JPEG、PNG、BMP 格式')
    fileList.length === 1 ? fileList.splice(0, 1) : fileList.length === 2 ? fileList.splice(1, 1) : ''
    return
  }

  // 赋值数据
  data.handleAvatarShow = false
  fileList.length === 2 ? fileList.splice(0, 1) : ''
  if (file.response) {
    data.proveForm.icAvatarUri = file.response.body.fileUrl
    data.handleAvatarShow = true
    return
  } else {
    // 压缩图片
    data.handleAvatarShow = false
    const beforFile: any = await beforeRead(file.raw)
    data.proveForm.icAvatarUri = URL.createObjectURL(beforFile)
    file = beforFile
  }
}
const handleEmblem = async (file: any, fileList: any) => {
  if (file.status === 'success' || file.status === 'ready') {
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      ElMessage.error('图片大小不得超过5MB')
      fileList.length === 1 ? fileList.splice(0, 1) : fileList.length === 2 ? fileList.splice(1, 1) : ''
      return
    }
  } else if (file.status === 'fail') {
    data.loadingShow.close()
    data.proveForm.icEmblemUri = ''
    clearInterval(data.subInterval)
    if (file.response) {
      if (file.response.status.replyCode !== '0') {
        ElMessage.error(file.response.status.replyText)
      }
    } else {
      ElMessage.error('图片上传错误')
    }
    return
  }
  // 检测
  const isJPG =
    file.raw.type === 'image/jpeg' ||
    file.raw.type === 'image/png' ||
    file.raw.type === 'image/jpg' ||
    file.raw.type === 'image/bmp'
  if (!isJPG) {
    ElMessage.error('请上传正确的图片格式，支持 JPG、JPEG、PNG、BMP 格式')
    fileList.length === 1 ? fileList.splice(0, 1) : fileList.length === 2 ? fileList.splice(1, 1) : ''
    return
  }

  // 赋值数据
  data.handleEmblemShow = false
  fileList.length === 2 ? fileList.splice(0, 1) : ''
  if (file.response) {
    data.proveForm.icEmblemUri = file.response.body.fileUrl
    data.handleEmblemShow = true
    return
  } else {
    // 压缩图片
    data.handleEmblemShow = false
    const beforFile: any = await beforeRead(file.raw)
    data.proveForm.icEmblemUri = URL.createObjectURL(beforFile)
    file = beforFile
  }
}

/**
 * 获取 行业列表 所选中的值
 */
const handleChangeIndustry = (value: any) => {
  data.proveForm.industry = value[1]
}

const cancelSubmit = () => {
  emit('cancelSubmit')
}

// 认证
const onSubmit = async () => {
  proveForm.value.validate(async (valid: any) => {
    if (valid) {
      data.loadingShow = ElLoading.service({
        lock: true,
        text: '提交中...'
      })

      // 验证短信
      let params = {}
      const code = await baseApi
        .AccountVerifySms({
          mobile: data.proveForm.contactPhone,
          pinCode: data.proveForm.pinCode
        })
        .catch(() => {
          data.loadingShow.close()
        })

      if (code.status.success) {
        data.loadingShow = ElLoading.service({
          lock: true,
          text: '提交中...'
        })
        // 上传图片
        licenseImg.value.submit()
        avatarImg.value.submit()
        emblemImg.value.submit()
        params = {
          certificationInfo: data.proveForm,
          subjectId: Cookies.get('entityId'),
          userId: Cookies.get('userId'),
          pinCodeToken: code.body.pinCodeToken
        }
      } else {
        return
      }
      data.loadingShow = ElLoading.service({
        lock: true,
        text: '提交中...'
      })

      data.subInterval = setInterval(async () => {
        if (data.handleLicenseShow && data.handleAvatarShow && data.handleEmblemShow) {
          clearInterval(data.subInterval)
          const res =
            props.status === '4'
              ? await basicApi.SubjectCertificationMaintenance(params)
              : await basicApi.SubjectCertificationAddition(params)
          if (res.status.success) {
            ElMessage({
              message: '提交成功',
              type: 'success'
            })
            emit('subProve')
          }
          data.loadingShow.close()
        }
      }, 1000)
    } else {
      ElMessage.error('请补填必填项内容')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.prove {
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 20px 10%;
  .avatar-uploader {
    line-height: 0;
  }
  .lookImg {
    display: flex;
    align-items: center;
    justify-content: center;
    .look {
      position: absolute;
      color: #fff;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }

  .doubt {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 100px;
    top: -40px;
  }
  .code {
    position: relative;
    width: 100%;
    .codeBtn {
      position: absolute;
      right: 0px;
      border-radius: 0 3px 3px 0;
    }
  }
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #3c7dff;
  }
  .avatar-uploader-icon {
    font-size: 12px;
    color: #8c939d;
    width: 148px;
    height: 102px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 400;
    color: #3c7dff;
    font-style: inherit;
  }
  .avatar-uploader-icon svg {
    margin-top: 25px; /* (178px - 28px) / 2 - 1px */
    font-size: 30px;
    padding-bottom: 10px;
  }
  .avatar {
    width: 150px;
    height: 100px;
    display: block;
  }
  .checkClause {
    font-size: 14px;
    font-weight: 200;
    color: #6e6e6e;
    span {
      color: #3d7dff;
    }
  }
  .step {
    margin: 10px 0;
    position: relative;
    left: -80px;
    img {
      width: 72px;
      height: 55px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      font-weight: 700;
      color: #121212;
      position: relative;
      top: -5px;
    }
  }
  .hint {
    margin-top: 30px;
    min-height: 102px;
    background: rgba(60, 125, 255, 0.08);
    border-radius: 2px;
    border: 1px solid #3c7dff;
    font-size: 12px;
    font-weight: 400;
    color: #6e6e6e;
    padding: 20px 40px;
    .title {
      position: relative;
      img {
        width: 20px;
        height: 20px;
        position: absolute;
        left: -25px;
      }
    }
  }
}
</style>
