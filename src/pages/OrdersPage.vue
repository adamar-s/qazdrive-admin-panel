<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useAdminPanelStore } from "@/stores/useAdminPanelStore";
import { formatDate, formatTime } from "@/utils/format";
import VueDatePicker from '@vuepic/vue-datepicker';
import Pagination from "@/components/UI/Pagination.vue";


const adminPanelStore = useAdminPanelStore();
const page = ref(1);

const dates = ref([new Date(0), new Date()])


const orders = computed(() => {
  return adminPanelStore.getOrders;
})

const getText = (item: string) => {
  switch (item) {
    case "completed": return "Завершен";
    case "paid": return "Оплачен";
    case "created": return "Создан";
    default:
      return "Неизвестный источник";
  }
}

const updateOrders = async (page) => {
  await adminPanelStore.loadOrders(
      { created_from: dates.value[0], created_to: dates.value[1], page: page}
  );
};

onMounted(async () => {
  await updateOrders(1);
});

watch([dates.value], () => {
  updateOrders(1)
})
</script>

<template>
  <section >
    <div v-if="orders" class="w-container">
      <div class="flex items-center w-1/2">
        <VueDatePicker
            v-model="dates"
            :multiCalendars="2"
            :clearable="false"
            :range="true"
            locale="ru"
            :format="'dd.MM.yyyy HH:mm'"
            @change="updateOrders"
        ></VueDatePicker>
        <button class="btn-primary" @click="updateOrders(1)">Показать</button>
      </div>
      <div v-if="orders.length" class="mx-auto pt-8">
        <div class="table-primary">
          <table>
            <thead>
            <tr class="">
              <th class="">Номерной знак</th>
              <th class="">Время</th>
              <th class="">Дата</th>
              <th class="">Статус</th>
              <th class="">Количество топлива клиента</th>
              <th class="">Подтвержено оператором</th>
              <th class="">Цена ла литр</th>
              <th class="">Оплачено клиентом</th>
              <th class="">Начислено бонусов</th>
              <th class="">Оплачено бонусами</th>
              <th class="">АГЗС</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(order, index) in orders" :key="index" class="">
              <td>{{ order.license_plate }}</td>

              <td>{{ formatTime(order.created) }}</td>

              <td>{{ formatDate(order.created) }}</td>

              <td :class="{'text-green-600': order.status === 'completed', 'text-purple-700': order.status === 'paid', 'text-yellow-600': order.status === 'created'}">
                  {{ getText(order.status) }}
              </td>

              <td>{{ order.litre ? order.litre + ' л' : 'нет' }}</td>

              <td >{{ order.litre_completed ? order.litre_completed + ' л' : 'нет' }}</td>

              <td>{{ order.fuel_price }} ₸</td>

              <td>{{ order.sum_paid }} ₸</td>

              <td>{{ order.cashback }}</td>

              <td v-if="order.use_balance">{{ order.balance_amount_paid }} ₸</td>
              <td v-else>нет</td>

              <td>{{ order.station }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="mb-5">
          <Pagination :totalCount="adminPanelStore.count" @onChangePage="updateOrders($event)" />
        </div>
      </div>

      <div v-else style="height: 100vh; padding-top: 2rem">
        <div class="flex">
          <img src="@/assets/img/icons/basket.png">
          <h2 class="text-xl pl-4"> На данный момент нет текущих заказов</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
