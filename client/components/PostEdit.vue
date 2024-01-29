<template>
    <UModal :model-value="isOpenProps" @close="() => {
        emits('closeModal');
    }">
        <UForm :validate="validate" :state="editPostState" class="space-y-4" @submit="onSubmit">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <h2>Добавить</h2>
                    <h4>{{ editPostState.user.name }} {{ editPostState.user.lastName }}</h4>
                    <h5>{{ editPostState.user.tel }}</h5>
                </template>

                <UFormGroup label="Трек-код" name="code">
                    <UInput v-model="editPostState.code" />
                </UFormGroup>

                <UFormGroup class="mt-2" label="Описание" name="description">
                    <UTextarea v-model="editPostState.description" type="text" />
                </UFormGroup>

                <UFormGroup class="mt-2" label="Склад в Китае" name="warehouseChina">
                    <UTextarea v-model="editPostState.warehouseChina" type="text" />
                </UFormGroup>

                <UFormGroup class="mt-2" label="Выдан клиенту" name="issuedClient">
                    <UInput v-model="editPostState.issuedClient" type="date" />
                </UFormGroup>

                <UFormGroup label="Отправлено из" name="sentFrom" class="mt-2">
                    <UInput v-model="editPostState.sentFrom" />
                </UFormGroup>

                <UFormGroup v-if="post.warehouse" class="mt-2" label="Склад" name="warehouse">
                    <USelectMenu :model-value="warehouseName" @change="(e) => {
                        warehouseName = e;
                        choseOption();
                    }" :options="$post.warehouse!" placeholder="" value-attribute="name" option-attribute="name" />
                </UFormGroup>

                <UFormGroup label="Прибыль в склад" name="is_warehouse" class="mt-2">
                    <!-- <UInput  v-model="editPostState.user.city" /> -->
                    <UCheckbox :model-value="Boolean(editPostState.is_warehouse)"  @update:model-value="(e) => editPostState.is_warehouse = e   "/>
                </UFormGroup>

                <InputNumber class="mt-2" :phone-number="editPostState.tel" @change-num="(value: string) => {
                    editPostState.tel = value
                }" />

                <UFormGroup label="Город поста" name="tel_post" class="mt-2">
                    <UInput v-model="editPostState.city" />
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

const editPostState = reactive<Post>(post)


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