<template>
    <div class="flex gap-5 items-center">
        <UCheckbox :disabled="true" name="notifications" :model-value="isSelect ?? Boolean(value)" />
        <div>
            <p class="text-sm text-slate-500">{{ title }}</p>
            <p class="text-xs font-bold mt-1">{{ (typeof value === 'string') ? value :  (isSelect != undefined) ? ((isSelect) ?  '' : 'Нету данных') : ''  }}</p>
        </div>
    </div>
    <UDivider />
</template>


<script setup lang="ts">

const { title, value, isSelect = undefined}  = defineProps<{ title: string, value: string | null | undefined | boolean, isSelect?: boolean | undefined  }>()

// const selected = isSelect ?? Boolean(value);


</script>