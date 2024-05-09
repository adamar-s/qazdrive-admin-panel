<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router"

const route = useRoute();
const list = ref([
  {
    name: "Кабинет партнера",
    link: "/"
  },
  {
    name: "Платеж",
    link: ""
  },
  {
    name: "Касса",
    link: ""
  },
  {
    name: "Пользователи",
    link: ""
  },

  {
    name: "Статистика",
    link: ""
  },
  {
    name: "Контент",
    link: ""
  }
])

const openedMobileNav = ref<boolean>(false)

const closeMenu = (value: boolean) => {
  openedMobileNav.value = value
}

const isActive = (link: string) => {
  return route.path === link;
}

watch(
    openedMobileNav,
    newValue => {
      const html = document.querySelector("html")
      if (newValue === true) {
        html.classList.add("no-scroll")
      } else {
        html.classList.remove("no-scroll")
      }
    },
    { immediate: true }
)
</script>

<template>
  <div class="relative mb-8">
    <div class="h-14 border-b border-brand-line md:h-16">
      <div class="h-full w-container">
        <div class="flex h-full items-center justify-between">
          <div class="flex h-full items-center justify-center px-4 xl:px-0">
            <img src="@/assets/img/icons/logo.png" class="md:w-10" alt="" />
            <h2 class="text-2xl font-bold ml-2">Qaz drive</h2>
          </div>
          <nav class="hidden xl:block">
            <ul class="flex items-center space-x-10">
              <li v-for="(item, index) in list" :key="index" :class="{ 'bg-brand-accent text-white h-[50px] px-4 rounded-lg ': isActive(item.link) }">
                <router-link :to="item.link" class="flex h-full w-full items-center justify-center px-1 text-center">{{ item.name }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
