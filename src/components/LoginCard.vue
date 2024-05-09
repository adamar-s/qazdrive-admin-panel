<script setup lang="ts">
import InputPrimary from "@/components/UI/InputPrimary.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";
const router = useRouter();

const authStore = useAuthStore();
const name = ref("");
const password = ref("");

const handleLogin = async () => {
  authStore.removeToken();
  authStore
      .login(name.value, password.value)
      .then(() => {
        if (authStore.getToken) {
          router.push("/");
        }
      })
      .catch(err => {
        console.log("Failed handleLogin" + err);
      })
}
</script>

<template>
  <div class="min-w-[450px] max-w-2xl rounded-2xl border border-brand-line bg-white px-7 py-14">
    <div>
      <div class="mb-10 text-center">
        <h1 class="text-2xl font-semibold">Admin panel</h1>
      </div>
      <form action="" @submit.prevent="handleLogin">
        <div class="space-y-5">
          <div class="input-wrapper">
            <label for="">Имя пользователя</label>
            <InputPrimary class="input-primary" v-model="name" name="name" type="name" label="" />
          </div>
          <div class="input-wrapper">
            <label for="">Пароль</label>
            <InputPrimary class="input-primary" v-model="password" name="password" type="password" label="" />
          </div>
          <div class="flex flex-col items-center justify-center space-y-4">
            <Button type="submit" class="btn-accent">Войти</Button>
            <Button class="underline">Забыли пароль?</Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
