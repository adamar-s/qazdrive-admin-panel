<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useAdminPanelStore } from "@/stores/useAdminPanelStore";
import { formatDate, formatTime } from "@/utils/format"

const adminPanelStore = useAdminPanelStore();

const orders = computed(() => {
  return adminPanelStore.getOrders
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
  await adminPanelStore.loadOrders();
});
</script>

<template>
  <section>
    <div class="w-container">
      <div class="mx-auto py-8">
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
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
