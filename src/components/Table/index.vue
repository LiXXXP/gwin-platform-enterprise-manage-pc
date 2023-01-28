<template>
  <el-table
    ref="multipleTable"
    :data="props.tableDetail.dataList"
    style="width: 100%; cursor: pointer"
    :header-row-style="{ color: '#515151' }"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    :load="handleLoadLevel"
    :row-key="props.id"
    lazy
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <!-- 序号 -->
    <el-table-column v-if="props.tableDetail.selection" type="selection" />
    <!-- 头像 -->
    <el-table-column v-if="props.tableDetail.avatar" label="姓名" width="200px">
      <template #default="scope">
        <slot name="avatar" :row="scope.row"></slot>
      </template>
    </el-table-column>
    <!-- 内容区 -->
    <el-table-column v-for="item in props.tableDetail.tableLabels" :key="item.key" :label="item.label" align="center">
      <template #default="scope">
        <div v-if="item.label == '1'">1</div>
        {{ scope.row[item.key] || '——' }}
      </template>
    </el-table-column>

    <!-- 操作 -->
    <el-table-column v-if="props.tableDetail.operation" label="操作" align="center" fixed="right">
      <template #default="scope">
        <slot name="handle" :row="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  tableDetail: {
    type: Object,
    default: () => ({}),
    required: false
  },
  id: {
    type: String,
    default: () => '',
    required: false
  }
})

const emit = defineEmits(['selectionChange', 'tableHandles', 'rowClick', 'loadLevel'])

const multipleTable = ref(null)

const handleRowClick = (row: any) => {
  emit('rowClick', row)
}

const handleSelectionChange = (val: []) => {
  emit('selectionChange', val, multipleTable.value)
}

/**
 * 加载下级 table 数据
 */
const handleLoadLevel = (tree: any, treeNode: object, resolve: any) => {
  emit('loadLevel', tree, treeNode, resolve)
}
</script>

<style lang="scss" scoped>
.edit {
  color: #1890ff;
  cursor: pointer;
  padding-right: 10px;
}
</style>
