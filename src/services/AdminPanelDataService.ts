import http from "@/http-common";

class AdminPanelDataService {
    getOrders = async () => {
        return http.get("/admin_panel/orders/");
    }
}
export default new AdminPanelDataService();
