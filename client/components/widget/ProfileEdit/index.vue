

<template>
    <div>
        <UModal :model-value="isOpen" @close="() => {
            handleClose()
        }">
            <ProfileCard v-if="$user.user" :is-register="false" @on-submit="onSubmit" :user="$user.user">
                <template #title>
                    <h2>Профиле</h2>
                </template>
                <UButton class="mt-4 w-fit" variant="outline" @click="isOpenChangePassword = true" >Изменить пароль</UButton>
                <template #footer>
                    <UButton type="submit">Сохранить</UButton>
                </template>
            </ProfileCard>
            <WidgetProfileEditPasswordChange 
            :open="isOpenChangePassword" 
            @close-modal="isOpenChangePassword = false" 
            @handle-submit="handleSubmitChangePassword"
        />
        </UModal>
    </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const isOpenChangePassword = ref(false);


const { isOpen } = defineProps(['isOpen'])
const emit = defineEmits(['closeModal'])


const $user = useUserStore();


const isDisabledBtn = ref(false);



async function onSubmit(event: any) {
    if(event.data) {
        $user.updateUser(event.data);
    }

    // isDisabledBtn.value = true;
    // $user.register(event.data);
    // isDisabledBtn.value = false;
}

const handleSubmitChangePassword = (state : PasswordChange) => {
    $user.changePassword(state);
    isOpenChangePassword.value = true;
}


const handleClose = () => {
    emit('closeModal');
}

</script>