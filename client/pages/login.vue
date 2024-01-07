<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const toast = useToast()
const { $axios } = useNuxtApp()
const $user = useUserStore();

const state = reactive({
    email: undefined,
    password: undefined
})

const validate = async (stateArg: typeof state) => {
    const errors = []
    if (!stateArg.email) errors.push({ path: 'email', message: 'Required' })
    if (!stateArg.password) errors.push({ path: 'password', message: 'Required' })
    return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
    $user.login(event);
}
</script>

<template>
    <div class="max-w-xl w-full flex flex-col items-center justify-center">
        <NuxtImg src="/palceholder.jpg" width="150" class="mx-auto"/>
        <UCard class="w-full mt-5">
            <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormGroup>

                <UButton class="w-full flex justify-center" type="submit">
                    Войти
                </UButton>
            </UForm>
            <template #footer >
                <div class="flex justify-center items-center">
                    <h2>У вас еще нет аккаунта?</h2>
                    <UButton variant="link" to="/auth">Зарегистрироваться</UButton>
                </div>
            </template>
        </UCard>
    </div>
</template>

