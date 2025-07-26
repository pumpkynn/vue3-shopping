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
            <el-popconfirm :title="`你确定删除${row.attrName}吗？`" @confirm="handleDelete(row.id )"> 
            <template #reference>
              <el-button type="danger" size="small" :icon="Delete"></el-button>
            </template>
          </el-popconfirm>
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
          <template #default="{row,$index}">
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" v-if="row.flag" @blur="toLook(row,$index)" size="small"></el-input>
              <div  v-else @click="toEdit(row,$index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作" align="center">
          <template #default="{$index}">
            <el-button type="danger" size="small" :icon="Delete"  @click="attrParams.attrValueList.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
       </el-table>
       <el-button type="primary"  size="default" @click="save" >保存</el-button>
       <el-button @click="cancel" size="default" >取消</el-button>
      </div>
       </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch ,ref ,reactive,nextTick,onBeforeMount } from 'vue'
import { reqAttr ,reqAddOrUpdateAttr,reqRemoveAttr } from '../../../api/product/attr' 
import { Edit,Delete } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { useCategoryStore } from '../../../store/modules/category'
import type {Attr as MyAttr,AttrResponseData,AttrValue} from '../../../api/product/attr/type'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
const attrArr = ref<MyAttr[]>([])
//定义卡片组件切换
const scene = ref<number>(0)
//给三级分类添加属性时，需要携带的参数
const attrParams = reactive({
 id: undefined as number | undefined, // 新增id属性
 attrName: "",
 attrValueList: [
  {
    valueName: "",
    flag: true
  }
 ],
 categoryId: "",
 categoryLevel: 3
})
watch(() => categoryStore.c3Id,()=>{
  attrArr.value = []
  if(categoryStore.c3Id){
    getAttr()
  }
})
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const result :AttrResponseData= await reqAttr(c1Id, c2Id, c3Id)
  if(result.code == 200){
    attrArr.value = result.data 
  }
}
const handleEdit = (row: MyAttr) => {
  //收集数据
  //！！！！！！注意注意！这是浅拷贝，如果修改了属性值名称，也会修改原有的属性值名称，就算不点击保存，点击取消后还是会影响到原数据，所以要深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  //切换场景
  scene.value = 1
}
const handleDelete = async (attrId:number) => {
const res :any = await reqRemoveAttr(attrId)
if(res.code == 200){
  ElMessage.success('删除属性成功')
  getAttr()
}else{
  ElMessage.error('删除属性失败')
}
}
const addAttr = () => {
  scene.value = 1
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [
      
    ],
    categoryId: categoryStore.c3Id as string,
    categoryLevel: categoryStore.c3Id
  })
}
const addAttrValue = () => {
  //点击添加属性值按钮时，像数组中添加一个空对象
  attrParams.attrValueList.push({
    valueName: "",
    flag: true
  })
  nextTick(() => {
  inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
const cancel = () => {
  scene.value = 0
}
const save = async () => {
 //收集参数，发请求
let result :any = await reqAddOrUpdateAttr(attrParams)
if(result.code == 200){
   getAttr()
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
const toLook = (row: AttrValue ,$index:number) => {
 if(row.valueName.trim() == ''){
  ElMessage.error('属性值不能为空')
  attrParams.attrValueList.splice($index,1)
  return
}
let repeat = attrParams.attrValueList.find((item) =>{
  if(item!==row){
    return item.valueName == row.valueName
  }
})
if(repeat){
  ElMessage.error('属性值不能重复')
  return
}
row.flag = false
}
const inputArr = ref<any>([])
const toEdit = (row: AttrValue ,$index:number) => {
  nextTick(() => {
 inputArr.value[$index].focus()
  })
  row.flag = true
}
onBeforeMount(() => {
  categoryStore.$reset()
})
</script>

<style scoped lang="scss">

</style>
