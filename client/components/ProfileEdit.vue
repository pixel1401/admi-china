

<template>
    <div>
        <UModal :model-value="isOpen" @close="() => {
            handleClose()
        }">
            <ProfileCard :is-register="false" @on-submit="onSubmit" :user="$user.user">
                <UButton type="submit">Сохранить</UButton>
                <template #title>
                    <h2>Профиле</h2>
                </template>
            </ProfileCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { isOpen } = defineProps(['isOpen'])
const emit = defineEmits(['closeModal'])


const $user = useUserStore();


const isDisabledBtn = ref(false);



async function onSubmit(event: any) {
    console.log(event.data);
    
    // isDisabledBtn.value = true;
    // $user.register(event.data);
    // isDisabledBtn.value = false;
}


const handleClose = () => {
    emit('closeModal');
}

</script>