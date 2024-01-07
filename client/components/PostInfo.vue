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
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="emit('closeModal')" />
          </div>
        </template>

        <UKbd size="md">wdaawd a d awd aw ddwa dwadawd aw daw d</UKbd>


      </UCard>
    </UModal>
</template>

<script setup lang="ts">

    const {isOpen} = defineProps(['isOpen'])
    const emit = defineEmits(['closeModal'])

</script>