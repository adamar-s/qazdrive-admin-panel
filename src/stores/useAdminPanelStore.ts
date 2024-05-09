import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AdminPanelDataService from "@/services/AdminPanelDataService.ts";

export const useAdminPanelStore = defineStore("admin_panel", () => {
    const orders = ref();

    const loadOrders = async () => {
        try {
            const response = await AdminPanelDataService.getOrders();
            orders.value = response.data.results;
        } catch (error) {
            console.error("Error loading zones:", error);
        }
    }

    const getOrders = computed(() => {
        return orders.value;
    })
    return {  orders, getOrders, loadOrders }
})
