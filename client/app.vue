<template>
  <div class="bg-slate-50 dark:bg-slate-950">
    <UContainer>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UContainer>
    <UNotifications />
  </div>
</template>



<script  lang="ts">
export default defineComponent ({
  data() {
    const $user = useUserStore();
    const $post = usePostsStore();
    return { user : $user,  post: $post  }
  },
  async mounted() {
    
    await this.user.getUserOwn();
    await this.post.getWarehouse();
    if (!this.user.user) {
      navigateTo('/login')
    }
  },
})

</script>