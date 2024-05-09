import http from "@/http-common";

class AdminPanelDataService {
    getOrders = async (params) => {
        return http.get(`/admin_panel/orders/?page=${params.page}`, { params });
    }
}
export default new AdminPanelDataService();
