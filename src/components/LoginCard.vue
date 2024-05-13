<script setup lang="ts">
import InputPrimary from "@/components/UI/InputPrimary.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const name = ref("");

const token = ref(window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '')

const saveToken = () => {
  window.localStorage.setItem('token', token.value as string);
  router.push("/");
}
</script>

<template>
  <div class="min-w-[450px] max-w-2xl rounded-2xl border border-brand-line bg-white px-7 py-14">
    <div>
      <div class="mb-10 text-center">
        <h1 class="text-2xl font-semibold">Admin panel</h1>
      </div>
      <form action="" @submit.prevent="saveToken">
        <div class="space-y-5">
          <div class="input-wrapper">
            <label for="">Токен авторизации</label>
            <InputPrimary class="input-primary" v-model="token"  name="token" type="text" label="" />
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
