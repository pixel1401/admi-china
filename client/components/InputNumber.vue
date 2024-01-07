
<template>
    <UFormGroup :required="true" label="Номер тел" name="tel">
        <UInput type="tel" :model-value="phoneNumber" placeholder="Введите телефонный номер" maxlength="16"
        @update:model-value="(e) => handleInput(e)" />
    </UFormGroup>
</template>

<script setup lang="ts">

// const phoneNumber = ref('');
const {phoneNumber} = defineProps(['phoneNumber']);
const emits = defineEmits(['changeNum'])


const handleInput = (argNum : string) => {

    // Получить только цифры из введенного значения
    let cleanedNumber = argNum.replace(/\D/g, '');

    // Ограничить количество символов
    if (cleanedNumber.length > 11) {
        cleanedNumber = cleanedNumber.slice(0, 11);
    }

    // Форматировать номер
    let formattedNumber = '';
    if (cleanedNumber.length >= 1) {
        formattedNumber += `+${cleanedNumber[0]}`;
    }
    if (cleanedNumber.length >= 2) {
        formattedNumber += ` ${cleanedNumber.slice(1, 4)}`;
    }
    if (cleanedNumber.length >= 5) {
        formattedNumber += ` ${cleanedNumber.slice(4, 7)}`;
    }
    if (cleanedNumber.length >= 8) {
        formattedNumber += ` ${cleanedNumber.slice(7, 9)}`;
    }
    if (cleanedNumber.length >= 10) {
        formattedNumber += ` ${cleanedNumber.slice(9)}`;
    }

    // Обновить значение
    emits('changeNum', formattedNumber)
    // phoneNumber.value = formattedNumber ?? '';
};



</script>