<template>
  <UModal :model-value="isOpen" @close="() => {
    emit('closeModal');
  }">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Адрес склада в Китае
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="emit('closeModal')" />
        </div>
      </template>

      <div>
        <p>收件人：K585003-{{ $user.user?.tel?.substring($user?.user?.tel?.length- 5) }}</p>
        <p>13824448525</p>
        <p>广州市白云区石门街道 石沙路289号诚达集团16号仓(鑫晟525)</p>
        <p>{{ $user.user?.name }}, {{ $user.user?.tel }}, {{ $user.user?.city }}</p>
      </div>

      <!-- <UKbd size="md">收件人：K788131-????
        13824448525
        </UKbd> -->


    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { _0 } from '#tailwind-config/theme/backdropBlur';

const $user = useUserStore();
const { isOpen } = defineProps(['isOpen'])
const emit = defineEmits(['closeModal'])

</script>