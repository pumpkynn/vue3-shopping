//商品分类全局组件的仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '../../api/product/attr'
import type { CategoryResponseData, CategoryObj } from '../../api/product/attr/type'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        c1arr: [] as CategoryObj[],
        c1Id: '' as string | number,
        c2arr: [] as CategoryObj[],
        c2Id: '' as string | number,
        c3arr: [] as CategoryObj[],
        c3Id: '' as string | number,
    }),
    actions: {
        async getC1() {
            try {
                const result: CategoryResponseData = await reqC1()
                if (result.code === 200) {
                    this.c1arr = result.data as CategoryObj[]
                } else {
                    this.c1arr = []
                }
            } catch (e) {
                this.c1arr = []
            }
        },
        async getC2() {
            //获取二级分类的数据

            let result: CategoryResponseData = await reqC2(this.c1Id)

            if (result.code === 200) {
                this.c2arr = result.data as CategoryObj[]
            } else {
                this.c2arr = []
            }

        },
        async getC3() {

            let result: CategoryResponseData = await reqC3(this.c2Id)

            if (result.code == 200) {
                this.c3arr = result.data as CategoryObj[]
            } else {
                this.c3arr = []
            }
        },
    },
})