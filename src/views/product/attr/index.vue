<template>
  <div>
   <Category :scene="scene" ></Category>
       <el-card style="margin: 10px 0 ; width: 98%;" >
        <div v-show="scene == 0">
           <el-button type="primary" :icon="Plus" size="default" style="margin-bottom: 16px;" :disabled="!categoryStore.c3Id" @click="addAttr">添加属性</el-button>
        <el-table border style="margin:10px 0" :data="attrArr">
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="属性名称" align="center" width="120" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称" align="center" prop="attrValueList">
          <template #default="{row}">
            <el-tag style="margin: 5px;" v-for="item in row.attrValueList" :key="item.id" type="success" >{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
        <template #default="{row}">
          <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row)"></el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)"></el-button>
        </template>
        </el-table-column>
      </el-table>
        </div>
        <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input place-holder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button :disabled="attrParams.attrName?false:true" 
        type="primary" @click="addAttrValue" :icon="Plus" size="default" >添加属性值</el-button>
        <el-button  @click="cancel"  size="default" >取消</el-button>
       <el-table border style="margin:10px 0" :data="attrParams.attrValueList" >
        <el-table-column width="80px" label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #default="{row}">
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" v-if="flag" @blur="toLook"></el-input>
              <div  v-else @click="toEdit">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作" align="center"></el-table-column>
       </el-table>
       <el-button type="primary"  size="default" @click="save" >保存</el-button>
       <el-button @click="cancel" size="default" >取消</el-button>
      </div>
       </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch ,ref ,reactive} from 'vue'
import { reqAttr ,reqAddOrUpdateAttr } from '../../../api/product/attr' 
import { Edit,Delete } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { useCategoryStore } from '../../../store/modules/category'
import type {Attr as MyAttr,AttrResponseData } from '../../../api/product/attr/type'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
const attrArr = ref<MyAttr[]>([])
//定义卡片组件切换
const scene = ref<number>(1)
//给三级分类添加属性时，需要携带的参数
const attrParams = reactive({
 id: undefined as number | undefined, // 新增id属性
 attrName: "",
 attrValueList: [
  {
    valueName: "",
  }
 ],
 categoryId: "",
 categoryLevel: 3
})
const flag =ref<boolean>(true)
watch(() => categoryStore.c3Id,()=>{
  if(categoryStore.c3Id){
    getAttr()
  }
})
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result :AttrResponseData= await reqAttr(c1Id, c2Id, c3Id)
  if(result.code == 200){
    attrArr.value = result.data 
  }
}
const handleEdit = (row: MyAttr) => {
  console.log(row)
}
const handleDelete = (row: MyAttr) => {
  console.log(row)
}
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [
      
    ],
    categoryId: categoryStore.c3Id as string,
    categoryLevel: 3
  })
  scene.value = 1
  


}
const addAttrValue = () => {
  //点击添加属性值按钮时，像数组中添加一个空对象
  attrParams.attrValueList.push({
    valueName: "",
  })
}
const cancel = () => {
  scene.value = 0
}
const save = async () => {
 //收集参数，发请求
let result :any = await reqAddOrUpdateAttr(attrParams)
if(result.code == 200){
  ElMessage({
    type: 'success',
    message: attrParams.id?'修改属性成功':'添加属性成功'
  })
  scene.value = 0
}else{
  ElMessage({
    type: 'error',
    message: attrParams.id?'修改属性失败':'添加属性失败'
  })
}
}
const toLook = () => {
  flag.value = false
}
const toEdit = () => {
  flag.value = true
}
</script>

<style scoped lang="scss">

</style>
