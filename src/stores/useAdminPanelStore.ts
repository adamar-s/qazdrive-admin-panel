import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AdminPanelDataService from "@/services/AdminPanelDataService.ts";

export const useAdminPanelStore = defineStore("admin_panel", () => {
    const orders = ref([]);
    const count = ref(0);
    const excel = ref();

    const loadOrders = async (params: Record<string, any> = {}) => {
        try {
            const response = await AdminPanelDataService.getOrders(params);
            orders.value = response.data.results;
            count.value = response.data.count;
        } catch (error) {
            console.error("Error loading zones:", error);
        }
    }

    const getOrders = computed(() => {
        return orders.value;
    })

    const loadExcel = async (params: Record<string, any> = {}) => {
        try {
            await AdminPanelDataService.getExcel(params).then(response => {
                const blob = new Blob([response.data], {
                    type: response.headers["content-type"]
                })
                const url = URL.createObjectURL(blob)
                excel.value= url
            })
        } catch (error) {
            console.error("Error loading Excel data:", error);
        }
    }
    const getExcel = computed(() => {
        return excel.value
    })
    return {  orders, getOrders, loadOrders, count, loadExcel, excel, getExcel}
})
