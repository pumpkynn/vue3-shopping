<template>
 <div>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
         <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" v-model="skuParams.price" type="number"></el-input>
        </el-form-item>
         <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" v-model="skuParams.weight" type="number"></el-input>
        </el-form-item>
         <el-form-item label="SKU描述">
            <el-input type="textarea" placeholder="SKU描述" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
         <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item v-for="(item) in attrArr" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId" placeholder="请选择" style="width: 100px;">
                        <el-option :value="`${item.id}:${attrValue.id}`" v-for="(attrValue) in item.attrValueList"
                            :key="attrValue.id" :label="attrValue.valueName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
         </el-form-item>
         <el-form-item label="销售属性">
            <el-form :inline="true" >
                <el-form-item :label="item.saleAttrName" v-for="(item) in saleAttrArr" :key="item.id">
                    <el-select v-model="item.saleIdAndValueId" placeholder="请选择" style="width: 100px;">
                        <el-option :value="`${item.id}:${saleAttrValue.id}`"
                            v-for="(saleAttrValue) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
         </el-form-item>
           <el-form-item label="图片名称">
                    <el-table border :data="spuImageList" ref="tableRef">
                        <el-table-column type="selection" width="80" align="center"></el-table-column>
                        <el-table-column label="图片">
                            <template #default="{row}">
                  <img :src="row.imgUrl" style="width: 100px;height: 100px;" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column label="名称" prop="imgName" ></el-table-column>
                        <el-table-column label="操作">
                            <template #default="{row}">
                                <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="save">保存</el-button>
                    <el-button type="primary" size="small" @click="cancel">取消</el-button>
                </el-form-item>
    </el-form>
 </div>
</template>
<script setup lang="ts">
import { reqAttr } from '../../../api/product/attr'
import { reqSpuImageList ,reqSpuHasSaleAttr,reqAddSku} from '../../../api/product/spu'
import {ref,reactive} from 'vue'
import type { SkuData } from '../../../api/product/spu/type'
import { ElMessage } from 'element-plus'
const attrArr = ref<any>([])
const saleAttrArr = ref<any>([])
const spuImageList = ref([])
const skuParams = reactive<SkuData>({
            category3Id: "",
            spuId: "",
            tmId: "",
            skuName: "",
            skuDesc: "",
            weight: 0,
             price: 0,
            skuDefaultImg: "",
        spuSaleAttrValueList: [],
    skuAttrValueList: [],
})
const $emit = defineEmits(['changeScene'])
const tableRef = ref<any>(null)
const cancel = () => {  
        $emit('changeScene', {flag: 0,params: ''})
}
const initSkuData = async (category1Id: number | string,category2Id: number | string,spu: any) => {
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
  const res :any  = await reqAttr(category1Id,category2Id,spu.category3Id)
  console.log(res)
 const res2 :any  = await reqSpuHasSaleAttr(spu.id)
 console.log(res2)
 const res3 :any  = await reqSpuImageList(spu.id)
 console.log(res3)
 attrArr.value = res.data
 saleAttrArr.value = res2.data
 spuImageList.value = res3.data
}
const handler = (row: any) => {
    spuImageList.value.forEach((item:any)=>{
        tableRef.value.toggleRowSelection(item,false)
    })
    tableRef.value.toggleRowSelection(row)
   skuParams.skuDefaultImg = row.imgUrl
}
const save =  async () => {
    skuParams.skuAttrValueList = attrArr.value.reduce((prev:any,next:any) =>{
        if(next.attrIdAndValueId){
            let [attrId,valueId] = next.attrIdAndValueId.split(":")
            prev.push({attrId,valueId})
        }
        return prev
    },[])
    skuParams.spuSaleAttrValueList = saleAttrArr.value.reduce((prev:any,next:any) =>{
        if(next.saleIdAndValueId){
            let [saleAttrId,saleAttrValueId] = next.saleIdAndValueId.split(":")
            prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
    },[])
    const res :any = await reqAddSku(skuParams)
    if(res.code == 200){
        ElMessage.success("添加SKU成功")
    }else{
        ElMessage.error("添加SKU失败")
    }
    $emit('changeScene', {flag: 1,params: {}})
}
defineExpose({
  initSkuData
})
</script>
<style scoped></style>
