<template>
    <UInput :value="search" @input="debouncedInput" class="mt-4 w-full" placeholder="Поиск" />

    <UISelect v-if="$user?.user?.status == 'admin'" class="mt-4" 
        :options="isArchive ? $user.userHavePost?.archive ?? [] : $user.userHavePost?.active ?? []" 
        :current-value="userIdPost" 
        @handle-current-value="(e) => {
            userIdPost = e}"/>

    <div class="flex flex-wrap mt-4 gap-5 w-full">
        <template v-if="posts && !$post.isLoading" v-for="post in posts">
            <UCard class="xl:w-[32%] md:w-[48%] w-full">
                <template #header>
                    <div class="flex justify-between items-center">
                        <div>{{ post.code }}</div>
                        <UPopover>
                            <UButton variant="ghost" color="rose" icon="solar:trash-bin-trash-linear" />
                            <template #panel="{ close }">
                                <div class="p-4">
                                    <h4 class="font-bold">Вы хотите удалить?</h4>
                                    <div class="flex justify-between gap-2 mt-1">
                                        <UButton @click="close" variant="link" color="sky">Отмена</UButton>
                                        <UButton @click="() => {
                                            $post.deletePost(post.id)
                                            close();
                                        }" variant="link" color="rose">Удалит</UButton>
                                    </div>
                                </div>
                            </template>
                        </UPopover>
                        <UButton v-if="$user?.user?.status === 'admin'" @click="selectEditPost(post)" variant="link"
                            icon="solar:pen-new-square-linear" />
                    </div>
                </template>
                <div class="mb-3">
                    <p>{{ post.description }}</p>
                </div>
                <UDivider />
                <div class="flex flex-col  gap-3 mt-5">
                    <PostInfoItem :title="'Дата регистрации клиентом'" :value="formatDate(post?.created_at)"
                        :is-select="undefined" />
                    <PostInfoItem :title="'Склад в Китае'" :value="post?.warehouseChina"
                        :is-select="post.warehouseChina" />
                    <PostInfoItem :title="`Отправлено из Алматы`" :value="post?.sentFrom" :is-select="post.sentFrom" />
                    <PostInfoItem :title="'Склад'" :value="post.warehouse.name" :is-select="post.is_warehouse" />
                    <PostInfoItem :title="'Выдан клиенту'" :value="post.issuedClient" :is-select="post.issuedClient" />
                </div>
            </UCard>
        </template>
        <template v-if="!posts || $post.isLoading" v-for="post in [1, 2, 3]">
            <USkeleton class="h-[400px] xl:w-[32%] md:w-full" />
        </template>
    </div>
    <div class="flex justify-center mt-6">
        <UPagination v-if="dataPosts" @update:model-value="(e) => page = e" :model-value="dataPosts.current_page"
            :page-count="10" :total="dataPosts.total" />
    </div>
    <UCard v-if="dataPosts" class="mt-7 w-full">
        Количество треков: {{ dataPosts?.total }}
    </UCard>

    <PostEdit v-if="editPost" :is-open-props="isEdit" :post="editPost" @close-modal="onIsEdit" />
</template>

<script setup lang="ts">
import { formatDate } from '~/helpers/index';
import { useDebounce } from '~/hooks/useDebounce';
import type { Pagination } from '~/helpers/types';
import type { PostParams } from '~/stores/posts';

const $user = useUserStore();
const $post = usePostsStore();

interface PostsProps {
    posts?: Array<Post> | null,
    dataPosts?: Pagination<Post> | null,
    isArchive?: boolean
}

const { posts, dataPosts , isArchive = false } = defineProps<PostsProps>()



const emits = defineEmits<{
    (e: 'getPosts', params: PostParams): void
}>();


const isEdit = ref(false);
const editPost = ref<Post | null>(null);
const search = ref('')
const userIdPost = ref('');
const page = ref(dataPosts?.current_page ?? 1);    


const debouncedInput = useDebounce(
    (e) => search.value = e.target.value,
    500
);

// onMounted(async () => {
//     $post.getUserHavePost();
// })

watch([search, userIdPost, page], () => {
    emits('getPosts', { search: search.value, user_id: userIdPost.value , page: page.value })
    // $post.getPosts({ search: search.value })
})

const onIsEdit = () => {
    isEdit.value = false;
    editPost.value = null;
}

const selectEditPost = (selectPost: Post) => {
    editPost.value = selectPost;
    isEdit.value = true;
}

// const handleChangePagination = (page: number) => {
//     if(isArchive) {
//         $post.getPostsArchive({ page })
//     }else {
//         $post.getPosts({ page })
//     }
// }



</script>