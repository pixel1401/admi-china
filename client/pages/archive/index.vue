<template>
        <div class="w-full">
            <UButton @click="handleBack" variant="soft" class="flex justify-center items-center" icon="solar:round-alt-arrow-left-linear" size="xl"/>
            <WidgetPostList 
                :posts="$post.postsArchive" 
                :data-posts="$post.postsArchiveWithData" 
                @get-posts="getPostsArchive"
                :is-archive="true"
            />
        </div>
</template>


<script setup lang="ts">
import type { PostParams } from '~/stores/posts';


const $post = usePostsStore();


onMounted(async () => {
    await $post.getPostsArchive();
    
});

const getPostsArchive = async (params? : PostParams) => {
    await $post.getPostsArchive(params);
}

const handleBack = () => {
    $post.isLoading = true;
    navigateTo('/');
}

</script>