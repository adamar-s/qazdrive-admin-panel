import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";
import AuthDataService from "@/services/AuthDataService";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(useStorage("token", "", localStorage));
    //------------------------------------------------------------------------------
    const setToken = (value: string) => {
        token.value = value;
    }
    const login = async (email: string, password: string) => {
        try {
            const response = await AuthDataService.authLogin(email, password);
            if (response.status === 200 || response.status === 201) {
                const token = JSON.stringify(response.data.token);
                setToken(token);
                localStorage.setItem("token", token);
                console.log("token: " + token);
            } else {
                console.log("ERROR AUTH ", response.status);
            }
        } catch (err) {
            console.log("FAILED LOGIN ", err);
        }
    }
    const removeToken = () => {
        token.value = "";
    }
    //------------------------------------------------------------------------------
    const getToken = computed(() => {
        return token.value;
    })
    return { token, getToken, login, setToken, removeToken }
})
