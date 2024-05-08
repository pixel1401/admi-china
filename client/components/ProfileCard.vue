<template>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UCard class="w-full mt-5">
            <template #header>
                <slot name="title"></slot>
            </template>
            <div class="flex flex-col gap-2"> 
                <UFormGroup :required="true" label="Email" name="email">
                    <UInput v-model="state.email" />
                </UFormGroup>

                <UFormGroup v-if="isRegister" :required="true" label="Пароль" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormGroup>

                <UFormGroup v-if="isRegister" :required="true" label="Подтверждения пароля"
                    name="password_confirmation">
                    <UInput v-model="state.password_confirmation" type="password" />
                </UFormGroup>
                <UFormGroup :required="true" label="Имя" name="name">
                    <UInput v-model="state.name" type="text" />
                </UFormGroup>
                <UFormGroup :required="true" label="Фамилия" name="lastname">
                    <UInput v-model="state.lastName" type="text" />
                </UFormGroup>

                <UFormGroup :required="true" label="Город" name="city">
                    <UInput v-model="state.city" type="text" />
                </UFormGroup>

                <UIInputNumber :phone-number="state.tel" @change-num="(value: string) => {
                    state.tel = value
                }" />

                <UButton v-if="isRegister" class="w-full flex justify-center" type="submit" :disabled="isDisabledBtn">
                    Войти
                </UButton>

                <slot />
            </div>

            <template #footer>
                <div v-if="isRegister" class="flex justify-center items-center">
                    <h2>Вы уже зарегистрированы?</h2>
                    <UButton variant="link" to="/login">Войти</UButton>
                </div>
                <slot name="footer"></slot>
            </template>
        </UCard>
    </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'


interface ProfileCardProps {
    isRegister: boolean,
    user?: User
}

const { isRegister = false, user } = defineProps<ProfileCardProps>()
const emit = defineEmits(['onSubmit'])

const state = reactive({
    email: user?.email,
    password: undefined,
    password_confirmation: undefined,
    name: user?.name,
    lastName: user?.lastName,
    tel: user?.tel ?? '',
    city: user?.city
})

const isDisabledBtn = ref(false);

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Обязательный' })
    if (!state.name) errors.push({ path: 'name', message: 'Обязательный' })
    if (!state.lastName) errors.push({ path: 'lastName', message: 'Обязательный' })
    // if (!state.password  && isRegister) errors.push({ path: 'password', message: 'Обязательный' })
    // if (state?.password?.length < 8 && isRegister) errors.push({ path: 'password', message: 'Количество символов должен быть больше 8' })
    if (state.password != state.password_confirmation && isRegister) errors.push({ path: 'password_confirmation', message: 'Не совпадает' })
    if (!state.tel) errors.push({ path: 'tel', message: 'Обязательный' })
    if (!state.city) errors.push({ path: 'city', message: 'Обязательный' })
    if (!state.name) errors.push({ path: 'name', message: 'Обязательный' })
    if (state?.tel?.length != 16) errors.push({ path: 'tel', message: 'Пример: +7 707 777 77 77' })
    return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
    emit('onSubmit', event)
}

</script>