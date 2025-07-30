<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>

    <el-form-item label="SPU品牌" style="width: 200px">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in AllTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        list-type="picture-card"
        v-model:file-list="SpuImageList"
        action="/api/admin/product/fileUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible" title="预览">
        <img
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
          w-full
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        style="width: 200px"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个销售属性`
            : '请先选择销售属性'
        "
        v-model="saleAttrIdAndName"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        style="margin-left: 10px"
        :icon="Plus"
        @click="addSaleAttr"
        :disabled="saleAttrIdAndName ? false : true"
      >
        添加属性值
      </el-button>
      <el-table border style="margin: 10px 0" :data="SaleAttr">
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="销售属性名"
          prop="saleAttrName"
          width="100"
        ></el-table-column>
        <el-table-column label="销售属性值" prop="attrValue">
          <template #default="{ row }">
            <el-tag
              style="margin: 0 5px"
              v-for="item in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              @close="row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(item), 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
              v-if="row.flag ? true : false"
              style="width: 100px"
              placeholder="请你输入属性值"
              size="small"
            ></el-input>
            <el-button
              @click="toEdit(row)"
              v-else
              style="margin-left: 10px"
              type="primary"
              size="small"
              icon="Plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ $index }">
            <el-button
              type="primary"
              size="small"
              :icon="Delete"
              @click="SaleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="SaleAttr.length > 0 ? false : true"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import type {
  SpuData,
  TradeMark,
  SaleAttrResponseData,
  HASSaleAttrResponseData,
  SpuHasImage,
  AllTradeMark,
  SpuImage,
  SaleAttr,
  SaleAttrValue,
  HasSaleAttr,
} from '../../../api/product/spu/type'
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '../../../api/product/spu'
import { ElMessage } from 'element-plus'
import { reqAddOrUpdateSpu } from '../../../api/product/spu'
const $emit = defineEmits(['changeScene'])
const AllTradeMark = ref<TradeMark[]>([])
const SpuImageList = ref<SpuImage[]>([])
const SaleAttr = ref<SaleAttr[]>([])
const AllSaleAttr = ref<HasSaleAttr[]>([])
const saleAttrIdAndName = ref<string>('')
const spuParams = ref<SpuData>({
  category3Id: 0, //收集三级分类的Id
  spuName: '', //spu的名字
  description: '', //spu的描述
  tmId: 0, //品牌ID
  spuImageList: null,
  spuSaleAttrList: null,
})
const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref<string>('')
const cancel = () => {
  $emit('changeScene', {
    flag: 0,
    params: 'update',
  })
}

const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  //获取品牌数据
  const res: AllTradeMark = await reqAllTrademark()

  //获取图片
  const result1: SpuHasImage = await reqSpuImageList(spu.id as number)

  //获取销售属性
  const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number,
  )

  //获取所有销售属性
  const result3: HASSaleAttrResponseData = await reqAllSaleAttr()
  AllTradeMark.value = res.data
  SpuImageList.value = result1.data
  SaleAttr.value = result2.data
  AllSaleAttr.value = result3.data
  SpuImageList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}
//预览图片
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url || file.response?.data
  dialogVisible.value = true
  console.log(file)
}
//删除图片
const handleRemove = (file: File) => {
  console.log(file)
}
//照片上传之前的钩子，约束文件的大小与类型
const handlerUpload = (file: File) => {
  if (
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/gif'
  ) {
    if (file.size / 1024 / 1024 > 3) {
      ElMessage.error('请上传小于3M的文件')
      return false
    }
    return true
  } else {
    ElMessage.error('请上传jpg/png/gif文件')
    return false
  }
}
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  //整理成服务器需要的属性值形式
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  //非法情况判断
  if (saleAttrValue?.trim() === '') {
    ElMessage.error('请输入属性值')
    return
  }
  //判断属性值在数组中是否存在
  let repeat = row.spuSaleAttrValueList?.find((item: SaleAttrValue) => {
    return item.saleAttrValueName == saleAttrValue
  })

  if (repeat) {
    ElMessage.error('属性值已存在')
    return
  }
  //追加新的属性值对象
  row.spuSaleAttrValueList?.push(newSaleAttrValue)
  //切换为查看模式
  row.flag = false
}
//属性值按钮的点击事件，切换为编辑模式
const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
//计算当前spu未选择的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectSaleAttr = AllSaleAttr.value.filter((item) => {
    return SaleAttr.value.every((item1) => {
      return item1.saleAttrName !== item.name
    })
  })
  return unSelectSaleAttr
})
const addSaleAttr = () => {
  //解构出销售属性id和名称
  const [saleAttrId, saleAttrName] = saleAttrIdAndName.value.split(':')
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId: Number(saleAttrId),
    saleAttrName: saleAttrName,
    spuSaleAttrValueList: [],
    flag: false, // 添加flag字段，用于控制编辑状态
    saleAttrValue: '', // 添加saleAttrValue字段
  }
  SaleAttr.value.push(newSaleAttr)
  saleAttrIdAndName.value = ''
}
const save = async () => {
  //整理数据
  spuParams.value.spuImageList = SpuImageList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl:
        ((item as any).response && (item as any).response.data) || item.url,
    }
  })
  spuParams.value.spuSaleAttrList = SaleAttr.value.map((item) => ({
    baseSaleAttrId: item.baseSaleAttrId,
    saleAttrName: item.saleAttrName,
    spuSaleAttrValueList: item.spuSaleAttrValueList || [],
  })) as any
  const res = await reqAddOrUpdateSpu(spuParams.value as any)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
    //更新成功后，切换场景
    $emit('changeScene', {
      flag: 0,
      params: spuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '更新失败' : '添加失败',
    })
  }
}
const initAddSpu = async (category3Id: number) => {
  Object.assign(spuParams.value, {
    category3Id: '',
    spuName: '',
    description: '',
    tmId: 0,
    spuImageList: [],
    spuSaleAttrList: [],
  })
  SaleAttr.value = []
  SpuImageList.value = []
  spuParams.value.category3Id = category3Id
  //获取全部品牌数据
  const res: AllTradeMark = await reqAllTrademark()
  let res1: HASSaleAttrResponseData = await reqAllSaleAttr()
  AllTradeMark.value = res.data
  AllSaleAttr.value = res1.data
  console.log(AllTradeMark.value, AllSaleAttr.value)
}
defineExpose({
  initAddSpu,
  initHasSpuData,
})
</script>

<style scoped lang="scss"></style>
