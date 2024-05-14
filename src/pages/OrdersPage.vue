<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useAdminPanelStore } from "@/stores/useAdminPanelStore";
import { formatDate, formatTime } from "@/utils/format";
import VueDatePicker from '@vuepic/vue-datepicker';
import Pagination from "@/components/UI/Pagination.vue";
// import * as XLSX from 'xlsx';

const adminPanelStore = useAdminPanelStore();

const today = new Date();
const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
const lastWeekStartDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
const dates = ref([startDate, today]);
const page = ref(1);

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

onMounted(async () => {
  await updateOrders(1);
});

const updateOrders = async (page) => {
  await adminPanelStore.loadOrders(
      { created_from: dates.value[0], created_to: dates.value[1], page: page}
  );
};

watch([dates.value], () => {
  updateOrders(1)
});

const lastWeek = () => {
  const today = new Date();
  const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7, 0, 0, 0);
  return [lastWeekStart, today];
}

const excelLink = computed(() => {
  return adminPanelStore.getExcel
})

const downloadExcel = async () => {
  try {
    await adminPanelStore.loadExcel({
      created_from: lastWeekStartDate,
      created_to: dates.value[1]
    })
    const link = document.createElement('a');
    link.href = excelLink.value;
    link.download = 'orders.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading Excel file:', error);
  }
};

// const exportToExcel = () => {
//   const ordersData = orders.value.map(order => ({
//     "Номерной знак": order.license_plate,
//     "Время": formatTime(order.created),
//     "Дата": formatDate(order.created),
//     "Статус": getText(order.status),
//     "Количество топлива клиента": order.litre ? order.litre + ' л' : 'нет',
//     "Подтвержено оператором": order.litre_completed ? order.litre_completed + ' л' : 'нет',
//     "Цена ла литр": order.fuel_price + " ₸",
//     "Оплачено клиентом": order.sum_paid + " ₸",
//     "Начислено бонусов": order.cashback,
//     "Оплачено бонусами": order.use_balance ? order.balance_amount_paid + " ₸" : 'нет',
//     "АГЗС": order.station
//   }));
//
//   const worksheet = XLSX.utils.json_to_sheet(ordersData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Заказы");
//   XLSX.writeFile(workbook, "заказы.xlsx");
// };
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
        <button class="btn-exel" @click="downloadExcel">Excel</button>
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
