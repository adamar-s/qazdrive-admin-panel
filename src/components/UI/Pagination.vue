<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  totalCount: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    default: 10
  },
})

const emits = defineEmits(['onChangePage']);
const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(props.totalCount / props.limit);
});

const handleChangePage = async (type: 'next' | 'prev' | 'goTo', page?: number) => {
  if (type === 'next' && currentPage.value < totalPages.value) {
    currentPage.value++;
  } else if (type === 'prev' && currentPage.value > 1) {
    currentPage.value--;
  } else if (type === 'goTo') {
    currentPage.value = page || 1;
  } else {
    return;
  }
  emits("onChangePage", currentPage.value);
}

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 1;
  const range = [];

  let start = Math.max(1, current - delta);
  let end = Math.min(total - 1, current + delta);

  if (current === 1) {
    end = Math.min(3, total - 1);
  } else if (current === total) {
    start = Math.max(1, total - 2);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});
</script>

<template>
  <div class="pagination mt-2 flex justify-center">
    <button @click="handleChangePage('prev')" :disabled="currentPage === 1" class="btn-paginate mx-1.5 px-2" :style="{ opacity: currentPage === 1 ? 0.36 : 1 }">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#111827" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>
    </button>

    <button v-if="currentPage > 2" @click="handleChangePage('goTo', 1)" class="btn-paginate mx-1 px-3 py-1 text-sm">1</button>
    <span v-if="currentPage > 3">...</span>

    <template v-for="page in displayedPages" :key="page">
      <button @click="handleChangePage('goTo', page)" :class="{ active: currentPage === page, 'bg-brand-primary': currentPage === page, 'text-white': currentPage === page }" class="btn-paginate mx-1 px-3 py-1 text-sm">
        {{ page }}
      </button>
    </template>

    <span v-if="currentPage < totalPages - 2 && totalPages > 3">...</span>
    <button @click="handleChangePage('goTo', totalPages)" :class="{ active: currentPage === totalPages, 'bg-brand-secondary': currentPage === totalPages }" class=" btn-paginate mx-1 px-3 py-1 text-sm" v-if="currentPage <= totalPages">{{ totalPages }}</button>

    <button @click="handleChangePage('next')" :disabled="currentPage >= totalPages" class="btn-paginate mx-1.5 bg-brand-secondary px-2" :style="{ opacity: currentPage >= totalPages ? 0.36 : 1 }">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#111827" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
    </button>
  </div>
</template>

<style lang="scss"></style>
