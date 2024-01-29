<template>
    <UModal :model-value="isOpenProps" @close="() => {
        emits('closeModal');
    }">
        <UForm :validate="validate" :state="createPostState" class="space-y-4" @submit="onSubmit">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <h2>Добавить</h2>
                </template>

                <UFormGroup label="Трек-код" name="code">
                    <UInput v-model="createPostState.code" />
                </UFormGroup>


                <InputNumber class="mt-2" :phone-number="createPostState.tel" @change-num="(value: string) => {
                    createPostState.tel = value
                }" /> 

                <UFormGroup class="mt-2" label="Описание" name="description">
                    <UTextarea v-model="createPostState.description" type="text" />
                </UFormGroup>

                <UFormGroup :required="true" class="mt-2" label="Склад" name="warehouse">
                    <USelectMenu :model-value="createPostState.warehouseName" @change="(e) => {
                        createPostState.warehouseName = e;
                        choseOption();
                    }" :options="$post?.warehouse ?? []" placeholder="" value-attribute="name"
                        option-attribute="name" />
                </UFormGroup>

                <template #footer>
                    <UButton type="submit">
                        Отправить
                    </UButton>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>

<script setup lang="ts">

const $post = usePostsStore();
const $user = useUserStore();

const createPostState = reactive({
    description: '',
    code: undefined,
    warehouse_id: undefined,
    warehouseName: undefined,
    city: $user?.user?.city ?? '',
    tel: $user?.user?.tel ?? ''
})


const { isOpenProps } = defineProps({
    isOpenProps: {
        type: Boolean
    }
});

const emits = defineEmits(['closeModal'])

const choseOption = () => {
    createPostState.warehouse_id = $post.warehouse?.find((item) => item.name == createPostState.warehouseName)?.id ?? '' as any;
}

const validate = async (stateArg: typeof createPostState) => {
    const errors = []
    if (!stateArg.code) errors.push({ path: 'code', message: 'Обязательно' })
    if (!stateArg.warehouse_id) errors.push({path: 'warehouse' , message : 'Выберите склад'})
    if (!stateArg.warehouseName) errors.push({path: 'warehouse' , message : 'Выберите склад'})
    return errors
}

async function onSubmit(event: any) {
    $post.addPost(event.data);
    emits('closeModal');
}
</script>