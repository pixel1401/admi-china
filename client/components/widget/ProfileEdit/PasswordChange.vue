<template>

    <UModal :model-value="open" @close="() => emits('closeModal')">
        <UForm :validate="validate" :state="state" @submit="handleSubmit">
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold">Изменить пароль</h2>
                </template>
                <UFormGroup :required="true" label="Пароль" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormGroup>

                <UFormGroup class="mt-2" :required="true" label="Подтверждения пароля" name="password_confirmation">
                    <UInput v-model="state.password_confirmation" type="password" />
                </UFormGroup>
                <template #footer>
                    <div class="flex justify-between">
                        <UButton variant="outline" @click="handleClose">Отмена</UButton>
                        <UButton type="submit">
                            Изменить
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>

<script setup lang="ts">

interface ProfilePasswordProps {
    open: boolean
}

const { open } = defineProps<ProfilePasswordProps>()

const emits = defineEmits(['closeModal', 'handleSubmit'])

const handleClose = () => {
    emits('closeModal')
}

const handleSubmit = () => {
    emits('handleSubmit', state);
}

const state = reactive<PasswordChange>({
    password: undefined,
    password_confirmation: undefined,
})

const validate = async (stateArg: typeof state) => {
    const errors = []
    if (state.password != state.password_confirmation) errors.push({ path: 'password_confirmation', message: 'Не совпадает' })
    return errors
}

</script>