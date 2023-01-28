<!--
 * @Author: Jin Biao
 * @Date: 2021-12-07 13:40:32
 * @LastEditTime: 2021-12-23 17:02:52
 * @Description:  上传图片组件

  使用方法：
  <ImgUpload @onUploadSuccess="bannerImageUploadSuccess" :images="data" :limit="3" />

  参数说明：
  fileType="pdf"   jpeg  pdf
  type="text"      text/picture/picture-card
  limit            文件数量
  @onUploadSuccess 上传成功回调
-->

<template>
  <el-upload
    action="/cos/v1/FileUpload"
    :accept="state.accept"
    :data="state.fileDate"
    :list-type="props.type"
    :limit="props.limit"
    multiple
    :file-list="state.fileList"
    :on-exceed="handleOnExceed"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :class="{ hide: state.hideUpload }"
  >
    <el-button v-if="props.type == 'text'" size="small" type="primary">点击上传</el-button>
    <el-icon v-else><svg-icon class-name="icon" icon-class="add"></svg-icon></el-icon>
  </el-upload>
  <!-- 预览 -->
  <el-dialog v-model="state.dialogVisible" :append-to-body="true">
    <img style="width: 100%" :src="state.dialogImageUrl" alt="" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['onUploadSuccess'])

interface UploadProps {
  limit: number
  images: Array<string>
  type: string
  fileType: string
}
const props = withDefaults(defineProps<UploadProps>(), {
  limit: 1,
  iamges: [],
  type: 'picture-card',
  fileType: 'jpeg'
})

const state = reactive({
  fileList: <any>[],
  dialogImageUrl: '',
  dialogVisible: false,
  hideUpload: false,
  fileDate: {
    channel: 'gwin-cloud',
    fileName: 'licenseUri' + Date.parse(new Date()) + '.' + props.fileType
  },
  accept:
    props.fileType === 'jpeg' ? 'image/jpeg,image/png,image/jpg,image/JPG,image/PNG,image/JPEG' : 'application/pdf'
})

onMounted(() => {
  props.images.forEach((item: any) => {
    state.fileList.push({
      name: item.name,
      url: item.url
    })
  })
})

// 文件数量
const handleOnExceed = () => {
  ElMessage.error(`最多只能上传${props.limit}个！`)
}

// 文件格式
const handleBeforeUpload = (file: any) => {
  console.log(file)
  // 检测图片
  if (props.type === 'picture-card') {
    const isIMAGE =
      file.type === 'image/jpeg' || 'image/png' || 'image/jpg' || 'image/JPG' || 'image/PNG' || 'image/JPEG'
    const isLt500KB = file.size / 1024 / 1024 < 5
    if (!isIMAGE) {
      ElMessage.error('上传图片只能是图片格式！')
    }
    if (!isLt500KB) {
      ElMessage.error('上传文件大小不能超过 5M!')
    }
    return isIMAGE && isLt500KB
  }
}
// 预览
const handlePictureCardPreview = (file: any) => {
  state.dialogImageUrl = file.url
  state.dialogVisible = true
}

// 上传成功
const handleSuccess = (response: any, file: any, fileList: any) => {
  state.fileList = fileList
}

// 文件改变
const handleChange = (file: any, fileList: any) => {
  state.hideUpload = fileList.length >= props.limit
  state.fileList = fileList
  updateChange()
}

// 删除
const handleRemove = (file: any, fileList: any) => {
  state.hideUpload = fileList.length >= props.limit
  state.fileList = fileList
  updateChange()
}

// 文件更新
const updateChange = () => {
  const imgList: any = []
  let show = true
  state.fileList.forEach((item: any) => {
    if (item.response && item.response.status.success) {
      show = true
      imgList.push(item.response.body.fileUrl)
    } else {
      show = false
      imgList.push(item.url)
    }
  })
  if (show) emit('onUploadSuccess', imgList)
}
</script>

<style lang="scss" scoped>
.hide :deep(.el-upload--picture-card) {
  display: none;
}
</style>
