<template>
    <UContainer>
        <div class="flex justify-center">
            <div class="container mx-auto w-[100vw]">
                <div class="flex justify-between items-center w-full gap-5">
                    <UButton @click="handleBtnActivePost" class="flex-1 flex justify-center" color="purple">Добавить</UButton>
                    <UButton @click="isOpenInfo = true" class="flex-1 flex justify-center" color="lime">Информация</UButton>
                    <UButton @click="handleBtnArchive" class="flex-1 flex justify-center" color="rose">Архив</UButton>
                </div>
            </div>
        </div>
        <PostList v-if="$post.posts && $post.withDates && !isOpenArchive" :posts="$post.posts" :data-posts="$post.withDates"/>
        <PostCreate :isOpenProps="isOpenProps" @closeModal="closeModal" />
        <PostInfo :isOpen="isOpenInfo" @closeModal="closeModalInfo"/>

        <PostList v-if="isOpenArchive && $post.postsArchiveWithData" :posts="$post.postsArchive ?? []" :data-posts="$post.postsArchiveWithData" />

    </UContainer>
</template>

<script setup lang="ts">

const $post = usePostsStore();


const isOpenProps = ref(false);
const isOpenInfo = ref(false);

const isOpenArchive = ref(false);

// let posts = ref<Array<any>>([]);


onMounted(async () => {
    await $post.getWarehouse();
    await $post.getPosts();
    await $post.getPostsArchive();
});


const closeModal = ()=> {
    isOpenProps.value = false;
}

const closeModalInfo = () => {
    isOpenInfo.value = false;
}


const handleBtnActivePost = () => {
    isOpenArchive.value = false; 
    isOpenProps.value = true;
}


const handleBtnArchive = () => {
    isOpenProps.value = false;
    isOpenArchive.value = true;
}

</script>