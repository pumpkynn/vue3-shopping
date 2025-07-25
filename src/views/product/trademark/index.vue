<template>
  <div>
    <el-card class="box-card">
  <el-button type="primary" size="default" :icon="Plus" @click="addTrademark">添加品牌</el-button>
   <el-table  style="margin: 10px 0px" border :data="trademarkArr">
    <el-table-column prop="date" label="序号" width="80" align="center" type="index"></el-table-column>

    <el-table-column  label="品牌名称" align="center" prop="tmName" >
      <template #default="{row}">
        <pre style="text-align: center;">{{ row.tmName }}</pre>

      </template>
    </el-table-column>
    <el-table-column prop="address" label="品牌LOGO"  align="center">
      <template #default="{row}">
            <el-image :src="row.logoUrl" style="width: 100px;height: 100px;" />
      </template>
    </el-table-column>
    <el-table-column prop="address" label="品牌操作" align="center">
      <template #default="{row}">
        <el-button type="primary" size="small" :icon="Edit" @click="editTrademark(row)"></el-button>
       <el-popconfirm :title="`确定删除品牌${row.tmName}吗？`"  width="240" :icon="Delete" @confirm='removeTrademark(row.id)'>
        <template #reference>
          <el-button type="danger" size="small" :icon="Delete"></el-button>
        </template>
       </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3,5,7,9]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total" 
      @size-change="sizeChange"
      @current-change="changePageNo"
    />
  </el-card>
   <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id?'编辑品牌':'添加品牌'" >
   <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
    <el-form-item label="品牌名称" label-width="100px" prop="tmName">
      <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"/>
    </el-form-item>
    <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
      <el-upload
    class="avatar-uploader"
    action="/api/admin/product/fileUpload"
    :show-file-list="false"
    :before-upload="beforeLogoUpload"
    :on-success="handleAvatarSuccess"
  >
    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
    </el-form-item>
   </el-form>
   <template #footer>
   
    <el-button @click="cancel">取消</el-button> 
    <el-button type="primary" @click="confirm">确定</el-button>
   </template>
  </el-dialog> 
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Plus,Edit,Delete } from '@element-plus/icons-vue'
import { ref,onMounted,reactive } from 'vue' 
import { reqHasTrademark ,reqAddOrUpdateTrademark,reqDeleteTrademark} from '../../../api/product/trademark'
import type { Records,TrademarkResponseData ,Trademark} from '../../../api/product/trademark/type'
import type { UploadProps } from 'element-plus'
const currentPage = ref(1)
const pageSize = ref(3)
const size = ref('small')
const disabled = ref(false)
const background = ref(true)
const total = ref<number>(0)
let trademarkArr = ref<Records>([])
let dialogFormVisible = ref<boolean>(false)
const trademarkParams = reactive<Trademark>({tmName:'',logoUrl:''})
const formRef = ref()
const getHasTrademark = async (page=1) => {
  currentPage.value = page
  let result:TrademarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(() => {
  getHasTrademark()
})
const changePageNo = (size: number) => {
  //当前页码发生变化时，重新获取数据
  getHasTrademark()
  console.log(size)
}
const sizeChange = () => {
  //每页条数发生变化时，重新获取数据,需要再发请求
  // 当前页码数据量发生变化时，当前页码需要重置为1
  currentPage.value = 1
  getHasTrademark()
}
const addTrademark = () => {
  trademarkParams.id = undefined
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  
  dialogFormVisible.value = true
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
}
const editTrademark = (row:Trademark) => {
  
  dialogFormVisible.value = true
  trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
}
// el-upload 的 on-success 事件
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  
  // 假设后端返回 { code: 200, data: { url: '图片地址' } }
  trademarkParams.logoUrl = response.data // 按实际结构调整
  formRef.value.clearValidate('logoUrl')
}
const cancel = () => {
  dialogFormVisible.value = false
  
}
const confirm = async () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    dialogFormVisible.value = false
    let result = await reqAddOrUpdateTrademark(trademarkParams);
    if(result.code==200 ){
      disabled.value = false
      ElMessage({
        type:'success',
        message:trademarkParams.id?'编辑品牌成功':'添加品牌成功',
      });
      getHasTrademark()
    }else{
      ElMessage({
        type:'error',
        message:trademarkParams.id?'编辑品牌失败':'添加品牌失败',
      })
    }
    dialogFormVisible.value = false
  })
}
  const beforeLogoUpload: UploadProps['beforeUpload'] = (rawFile :any) => {
  //要求上传的文件是图片
  if(rawFile.type==='image/jpeg' 
  || rawFile.type==='image/png'
  ||rawFile.type==='image/jpg'){
    if(rawFile.size/1024/1024<4){
      return true 
    }else{
      ElMessage.error('上传的文件大小不能超过4MB')
      return false
    }
  }
else{
  ElMessage.error('上传的文件必须是PNG、JPG、JPEG格式')
return false
}}
//表单验证规则
const validateTmName = (rule:any,value:any,callback:any) => {
  if(value.trim().length<2){
    callback(new Error('品牌名称长度不能小于2'))
  }else{
    callback()
  }
}
const validateLogoUrl = (rule:any,value:any,callback:any) => {
  if(!value){
    callback(new Error('请上传品牌LOGO'))
  }else{
    callback()
  }
}
const rules = {
  tmName:[
    { required:true, message:'请输入品牌名称', trigger:'change' },
    { min:2, max:10, message:'品牌名称长度在2-10个字符之间', trigger:'change' },
    { validator:validateTmName, trigger:'change' }
  ],
  logoUrl:[
    { required:true, message:'请上传品牌LOGO', trigger:'change' },
    { validator:validateLogoUrl, trigger:'change' }
  ]
}
const removeTrademark = async (id:number) => {
  let result = await reqDeleteTrademark(id)
  if(result.code==200){
    ElMessage.success('删除品牌成功')
    //如果删除的品牌是当前页码的最后一个品牌，则当前页码减1
    getHasTrademark(trademarkArr.value.length>1?currentPage.value:currentPage.value-1)
  }else{
    ElMessage.error('删除品牌失败')
  }
}
</script>
<style scoped lang="scss">
.box-card{
  margin-top: 10px;
  width: 98%;
}

</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>