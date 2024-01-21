<template>
    <UContainer>
        <div class="flex justify-center">
            <div class="container mx-auto w-[100vw]">
                <div class="flex justify-between items-center w-full gap-5">
                    <UButton @click="handleBtnActivePost"  class="flex-1 flex justify-center" color="purple">Добавить</UButton>
                    <UButton @click="isOpenInfo = true"  class="flex-1 flex justify-center" color="lime">Информация</UButton>
                    <UButton @click="handleBtnArchive"  class="flex-1 flex justify-center" color="rose">Архив</UButton>
                </div>
            </div>
        </div>
        <PostList :posts="$post.posts" 
            :data-posts="$post.withDates"
            @get-posts="getPosts"
        />
        <PostCreate :isOpenProps="isOpenProps" @closeModal="closeModal" />
        <PostInfo :isOpen="isOpenInfo" @closeModal="closeModalInfo"/>
    </UContainer>
</template>

<script setup lang="ts">
import type { PostParams } from '~/stores/posts';


const $post = usePostsStore();


const isOpenProps = ref(false);
const isOpenInfo = ref(false);


// let posts = ref<Array<any>>([]);


onMounted(async () => {
    await $post.getWarehouse();
    await $post.getPosts();
    await $post.getPostsArchive();
});


const getPosts = async (params? : PostParams) => {
    await $post.getPosts(params);
}


const closeModal = ()=> {
    isOpenProps.value = false;
}

const closeModalInfo = () => {
    isOpenInfo.value = false;
}


const handleBtnActivePost = () => {
    isOpenProps.value = true;
}


const handleBtnArchive = () => {
    isOpenProps.value = false;
    $post.isLoading= true;
    navigateTo('/archive');
}

</script>