<template>
    <div class="max-w-xl w-full flex flex-col items-center justify-center">
        <NuxtImg src="/palceholder.jpg" width="150" class="mx-auto"/>
        <UCard class="w-full mt-5" >
            <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup :required="true" label="Email" name="email">
                    <UInput v-model="state.email" />
                </UFormGroup>

                <UFormGroup :required="true" label="Пароль" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormGroup>

                <UFormGroup :required="true" label="Подтверждения пароля" name="password_confirmation">
                    <UInput v-model="state.password_confirmation" type="password" />
                </UFormGroup>
                <UFormGroup :required="true" label="Имя" name="name">
                    <UInput v-model="state.name" type="text" />
                </UFormGroup>
                <UFormGroup :required="true" label="Фамилия" name="lastname">
                    <UInput v-model="state.lastName" type="text" />
                </UFormGroup>

                <InputNumber :phone-number="state.tel" @change-num="(value: string) => {
                    state.tel = value
                }"/>

                <UButton class="w-full flex justify-center" type="submit" :disabled="isDisabledBtn">
                    Войти
                </UButton>
                
            </UForm>
            <template #footer >
                <div class="flex justify-center items-center">
                    <h2>Вы уже зарегистрированы?</h2>
                    <UButton variant="link" to="/login" >Войти</UButton>
                </div>
            </template>
        </UCard>

    </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { $axios } = useNuxtApp();
const $user = useUserStore();


const state = reactive({
    email: undefined,
    password: undefined,
    password_confirmation: undefined,
    name:undefined,
    lastName: undefined,
    tel:''
})

const isDisabledBtn = ref(false);

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Обязательный' })
    if (!state.password) errors.push({ path: 'password', message: 'Обязательный' })
    if (state?.password?.length < 8) errors.push({ path: 'password', message: 'Количество символов должен быть больше 8' })
    if (state.password != state.password_confirmation)  errors.push({ path: 'password_confirmation', message: 'Ошибка' })
    if (!state.tel) errors.push({ path: 'tel', message: 'Обязательный' }) 
    if (!state.name) errors.push({ path: 'name', message: 'Обязательный' }) 
    if (state?.tel?.length != 16) errors.push({ path: 'tel', message: 'Пример: +7 707 777 77 77' }) 
    return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
    isDisabledBtn.value = true;
    $user.register(event.data);
    isDisabledBtn.value = false;
}
</script>