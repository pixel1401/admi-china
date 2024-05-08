<template>
    <USelectMenu @change="(e) => {
        handleCurrentValue(options?.find((item) => item.name == e)?.value as string ?? '')
    }" :options="options.map((item) => item.name)">
        <UInput class="flex-1 cursor-pointer" placeholder="Select people"
            :value="options?.find((item) => item.value == currentValue)?.name"
            :ui="{ icon: { trailing: { pointer: '' } } }" readonly>
            <template #trailing>
                <UButton icon="i-heroicons-x-mark" @click.stop="() => {
                    handleCurrentValue('');
                }" :padded="false" color="gray" variant="ghost" />
            </template>
        </UInput>
    </USelectMenu>
</template>

<script setup lang="ts">

interface PostsProps {
    options: SelectOption[],
    currentValue: string
}

const { options, currentValue } = defineProps<PostsProps>();

const emits = defineEmits(['handleCurrentValue']);

const handleCurrentValue = (value: string) => {
    emits('handleCurrentValue', value);
}

</script>