<template>
  <div>
   <el-card style="width: 98%;">
    <el-table border style="margin: 10px 0;" :data="skuArr">
      <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip width="200" prop="skuName"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip width="200" prop="skuDesc"></el-table-column>
      <el-table-column label="图片"  width="200">
        <template #default="{row}">
          <el-image :src="row.skuDefaultImg" style="width: 100px;height: 100px;" />
        </template>
      </el-table-column>
      <el-table-column label="重量"  width="200" prop="weight" align="center"></el-table-column>
      <el-table-column label="价格" width="200" prop="price" align="center"></el-table-column>
      <el-table-column label="操作" width="250" fixed="right" align="center">
        <template #default="{row}">
          <el-button type="primary" size="small" :icon="row.isSale == 1 ? Top : Bottom" @click="updateSale(row)"></el-button>
          <el-button type="success" size="small" icon="Edit" @click="updateSku()"></el-button>
          <el-button type="warning" size="small" icon="InfoFilled" @click="finSku(row.id)"></el-button>
            <el-popconfirm :title="`确定删除${row.skuName}吗？`" @confirm="removeSku(row.id)" width="200">
              <template #reference>
                <el-button type="danger" size="small"  icon="Delete" ></el-button>
              </template>
            </el-popconfirm>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="PageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout=" prev, pager, next, jumper, ->,sizes,total"
      :total="total"
      @current-change="getHasSku"
      @size-change="handler"
    />
     <el-drawer v-model="drawer" >
    <template #header>
      <h4>查看商品详情</h4>
    </template>
    <template #default>
      <el-row style="margin: 10px 0;">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">h{{ skuInfo?.skuName }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0;">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ skuInfo?.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0;">
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{ skuInfo?.price }}</el-col>
      </el-row>
      <el-row style="margin: 10px 0;">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">  <el-tag :span="18" v-for="item in skuInfo?.skuAttrValueList" :key="item.id"
          style="margin: 5px ;">{{ item.valueName }}</el-tag>
        </el-col>
      
      </el-row>
        <el-row style="margin: 10px 0;">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">  <el-tag :span="18" v-for="item in skuInfo?.skuSaleAttrValueList" :key="item.id"
          style="margin: 5px ;">{{ item.saleAttrValueName }}</el-tag>
        </el-col>
      
      </el-row>
        <el-row style="margin: 10px 0;">
        <el-col :span="6">图片</el-col>
        <el-col :span="18"> 
          <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in skuInfo?.skuImageList" :key="item.id">
        <el-image :src="getFullUrl(item.imgUrl)" style="width: 100%; height: 100%;" />
      </el-carousel-item>
      </el-carousel>
        </el-col>
      
      </el-row>
       
     
    </template>
    <template #footer>
      
    </template>
  </el-drawer>
   </el-card>

  </div>
</template>
<script setup lang="ts">
import { Top, Bottom } from '@element-plus/icons-vue'
import { ref ,onMounted} from 'vue'
import { reqSkuList ,reqSaleSku,reqCancelSale,reqRemoveSku,reqSkuInfo} from '../../../api/product/sku'
import { ElMessage } from 'element-plus'
import type { SkuResponseData, SkuData ,SkuInfoData} from '../../../api/product/sku/type'
const PageNo = ref(1)
const pageSize = ref(10)
const total = ref<number>(0)
const skuArr = ref<SkuData[]>([])
const drawer = ref(false)
const skuInfo = ref<SkuData | null>(null); // 只存储具体数据
const skuImageList = ref<ImageData[]>([])
const getHasSku = async (pager = 1) => {
    //当前分页器的页码
    PageNo.value = pager;
    const result: SkuResponseData = await reqSkuList(PageNo.value, pageSize.value);
    console.log(result)
    if (result.code == 200) {
        total.value = result.data.total;
        skuArr.value = result.data.records;
    }
}
const handler = () => {
  getHasSku()
}
const updateSale = async (row: SkuData) => {
 if(row.isSale == 1){
  await reqCancelSale(row.id as number)
  ElMessage.success('下架成功')
  getHasSku(PageNo.value)
}else{
  await reqSaleSku(row.id as number)
  ElMessage.success('上架成功')
  getHasSku()
}
}
const updateSku = () => {
 ElMessage.warning('该功能暂未开发')
}
const finSku = async (skuId: number) => {
  drawer.value = true
  const result: SkuInfoData = await reqSkuInfo(skuId)
  if(result.code == 200){
    skuInfo.value = result.data // 只赋具体数据
  }

}
const getFullUrl = (url: string) => {
  if (!url) return '';
  return url.startsWith('http') ? url : 'http://localhost:8000/uploads/' + url;
}
onMounted(() => {
  getHasSku()
})
const removeSku = async (skuId: number) => {
  const result: any = await reqRemoveSku(skuId)
  if(result.code == 200){
    ElMessage.success('删除成功')
    getHasSku(skuArr.value.length>1?PageNo.value:PageNo.value-1)
  }else{
    ElMessage.error('系统数据不能删除')
  }
}
</script>
<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}</style>
