<template>
    <div class="flex gap-5 items-center">
        <UCheckbox :disabled="true" name="notifications"  v-model="selected" />
        <div>
            <p class="text-sm text-slate-500">{{ title }}</p>
            <p class="text-xs font-bold mt-1">{{ value ?? 'Нету данных' }}</p>
        </div>

    </div>
    <UDivider/> 
</template>


<script setup lang="ts">

const { title, value } = defineProps<{title: string , value: string | null | undefined}>()

const selected = ref(Boolean(value))

</script>