<template>
    <UContainer>
        <div class="flex justify-center">
            <div class="container mx-auto w-[100vw]">
                <div class="flex justify-between items-center w-full gap-5">
                    <UButton @click="isOpenProps = true" class="flex-1 flex justify-center" color="purple">Добавить</UButton>
                    <UButton @click="isOpenInfo = true" class="flex-1 flex justify-center" color="lime">Информация</UButton>
                    <UButton class="flex-1 flex justify-center" color="rose">Архив</UButton>
                </div>
            </div>
        </div>
        <PostList v-if="$post.posts" :posts="$post.posts"/>
        <PostCreate :isOpenProps="isOpenProps" @closeModal="closeModal" />

        <PostInfo :isOpen="isOpenInfo" @closeModal="closeModalInfo"/>
    </UContainer>
</template>

<script setup lang="ts">

const { $axios } = useNuxtApp()
const $post = usePostsStore();


const isOpenProps = ref(false);
const isOpenInfo = ref(false);
// let posts = ref<Array<any>>([]);


onMounted(async () => {
    await $post.getWarehouse();
    await $post.getPosts();
});


const closeModal = ()=> {
    isOpenProps.value = false;
}

const closeModalInfo = () => {
    isOpenInfo.value = false;
}

</script>