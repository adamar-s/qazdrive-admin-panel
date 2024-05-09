import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AdminPanelDataService from "@/services/AdminPanelDataService.ts";

export const useAdminPanelStore = defineStore("admin_panel", () => {
    const orders = ref([]);
    const count = ref(0);

    const loadOrders = async (params: Record<string, any> = {}) => {
        try {
            const response = await AdminPanelDataService.getOrders(params);
            orders.value = response.data.results;
            count.value = response.data.count;
            console.log('COUNT: ' + count.value);
        } catch (error) {
            console.error("Error loading zones:", error);
        }
    }

    const getOrders = computed(() => {
        return orders.value;
    })
    return {  orders, getOrders, loadOrders }
})
