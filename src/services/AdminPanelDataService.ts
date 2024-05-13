import http from "@/http-common";

class AdminPanelDataService {
    getOrders = async (params) => {
        return http.get(`/admin_panel/orders/?page=${params.page}`, { params });
    }
    getExcel = async (params) => {
        return http.get(`/admin_panel/orders/?view_type=xlsx`, { params, responseType: 'blob' });
    }
}
export default new AdminPanelDataService();
