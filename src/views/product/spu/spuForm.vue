<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" ></el-input>
    </el-form-item>
   
    <el-form-item label="SPU品牌" style="width: 200px;">
        <el-select >
            <el-option label="品牌1" value="1"></el-option>
            <el-option label="品牌2" value="2"></el-option>
            <el-option label="品牌3" value="3"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入SPU描述" ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
        <el-upload
    
    list-type="picture-card"
   
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog >
    <img alt="Preview Image" />
  </el-dialog>

    </el-form-item>
   <el-form-item label="SPU销售属性" >
     <el-select style="width: 200px;">
            <el-option label="品牌1" value="1"></el-option>
            <el-option label="品牌2" value="2"></el-option>
            <el-option label="品牌3" value="3"></el-option>
        </el-select>
        <el-button type="primary"  style="margin-left: 10px;" :icon="Plus">添加属性值</el-button>
        <el-table border style="margin: 10px 0;">
            <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
            <el-table-column label="销售属性名" prop="attrName" width="100"></el-table-column>
            <el-table-column label="销售属性值" prop="attrValue"></el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template >
                    <el-button type="primary" size="small" ></el-button>
                </template>
            </el-table-column>
        </el-table>
   </el-form-item>
   <el-form-item>
    <el-button type="primary" size="default" >保存</el-button>
    <el-button type="primary" size="default" @click="cancel">取消  </el-button>
   </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'

defineOptions({
  name: 'SpuForm'
})

const $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene',0)
}
</script>

<style scoped>

</style>