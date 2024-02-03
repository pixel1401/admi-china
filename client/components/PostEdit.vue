<template>
    <UModal :model-value="isOpenProps" @close="() => {
        emits('closeModal');
    }">
        <UForm :validate="validate" :state="editPostState" class="space-y-4" @submit="onSubmit">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <h2 class="text-xl font-bold">Добавить</h2>
                    <h6 class="text-sm font-normal mt-2">ФИО пользователя: {{ editPostState.user.name }} {{
                        editPostState.user.lastName }}</h6>
                </template>

                <UFormGroup label="Трек-код" name="code">
                    <UInput v-model="editPostState.code" />
                </UFormGroup>

                <UFormGroup class="mt-2" label="Описание" name="description">
                    <UTextarea v-model="editPostState.description" type="text" />
                </UFormGroup>


                <UFormGroup class="mt-2 mt-2 flex gap-3" label="Склад в Китае" name="warehouseChina">
                    <!-- <UInput  v-model="editPostState.user.city" /> -->
                    <UCheckbox :model-value="Boolean(editPostState.warehouseChina)"
                        @update:model-value="(e) => editPostState.warehouseChina = e" />
                </UFormGroup>


                <UFormGroup label="Отправлено из Алматы" name="sentFrom" class="mt-2 mt-2 flex gap-3">
                    <!-- <UInput  v-model="editPostState.user.city" /> -->
                    <UCheckbox :model-value="Boolean(editPostState.sentFrom)"
                        @update:model-value="(e) => editPostState.sentFrom = e" />
                </UFormGroup>

                <UFormGroup v-if="post.warehouse" class="mt-2" label="Склад" name="warehouse">
                    <USelectMenu :model-value="warehouseName" @change="(e) => {
                        warehouseName = e;
                        choseOption();
                    }" :options="$post.warehouse!" placeholder="" value-attribute="name" option-attribute="name" />
                </UFormGroup>

                <UFormGroup label="Прибыль в склад" name="is_warehouse" class="mt-2 mt-2 flex gap-3">
                    <!-- <UInput  v-model="editPostState.user.city" /> -->
                    <UCheckbox :model-value="Boolean(editPostState.is_warehouse)"
                        @update:model-value="(e) => editPostState.is_warehouse = e" />
                </UFormGroup>

                <InputNumber class="mt-2" :phone-number="editPostState.tel" @change-num="(value: string) => {
                    editPostState.tel = value
                }" />

                <UFormGroup class="mt-2 flex gap-3" label="Выдан клиенту" name="issuedClient">
                    <!-- <UInput  v-model="editPostState.user.city" /> -->
                    <UCheckbox :model-value="Boolean(editPostState.issuedClient)"
                        @update:model-value="(e) => editPostState.issuedClient = e" />
                </UFormGroup>


                <UFormGroup label="Город пользователя" name="tel_post" class="mt-2">
                    <UInput :disabled="true" v-model="editPostState.user.city" />
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

const { isOpenProps, post } = defineProps<{ isOpenProps: boolean, post: Post }>();

const emits = defineEmits(['closeModal'])

const warehouseName = ref(post.warehouse.name);

const editPostState = reactive<Post>(JSON.parse(JSON.stringify(post)));


const choseOption = () => {
    editPostState.warehouse_id = $post.warehouse?.find((item) => item.name == warehouseName.value)?.id ?? '' as any;
}


const validate = async (stateArg: typeof editPostState) => {
    const errors = []
    if (!stateArg.code) errors.push({ path: 'code', message: 'Обязательно' })
    return errors
}

async function onSubmit(event: any) {
    // $post.addPost(event.data);
    // console.log(event.data);
    $post.editPost(event.data);
    emits('closeModal');
    
}

</script>