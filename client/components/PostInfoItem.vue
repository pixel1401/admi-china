<template>
    <div class="flex gap-5 items-center">
        <UCheckbox :disabled="true" name="notifications" v-model="selected" />
        <div>
            <p class="text-sm text-slate-500">{{ title }}</p>
            <p class="text-xs font-bold mt-1">{{ value ?? 'Нету данных' }}</p>
        </div>
    </div>
    <UDivider />
</template>


<script setup lang="ts">

const { title, value, isSelect}  = defineProps<{ title: string, value: string | null | undefined, isSelect?: boolean  | number }>()

const selected = (isSelect !== 0 && isSelect !== 1) ? Boolean(value) : isSelect == 0 ? false : Boolean(isSelect);



</script>