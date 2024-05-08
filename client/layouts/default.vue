<template>
    <div class="w-full h-full ">
        <nav v-if="Boolean($user.user)"
            class="bg-white z-50  dark:bg-gray-900 w-full fixed top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="container mx-auto flex justify-between items-center py-3 ">
                <div class="w-10 h-10 ">
                    <NuxtImg src="/main.jpg" width="150" class="mx-auto"/>
                </div>
                <div class="flex items-center">
                    <UButton variant="link" v-if="$user.user" @click="() => handleEditProfile()">
                        <h1 class="text-xl">{{ $user?.user?.name ?? '' }}</h1>
                    </UButton>
                    <UDivider />
                    <UButton @click="onExit()" color="red" variant="link" class="text-xl">Выход</UButton>
                </div>
            </div>
        </nav>
        <div
            :class='`min-h-[100vh] mt-2 flex flex-col justify-center items-center ${Boolean($user.user) ? `pt-[90px]` : ``}`'>
            <slot />

            <SocialLink />
            <div class="m-4"></div>
        </div>

        <ClientOnly>
            <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" 
                class="fixed bottom-4 right-4 shadow hover:shadow-lg" :color="isDark ? 'gray' : 'green'" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
        </ClientOnly>

        <WidgetProfileEdit :is-open="isEditProfile" @close-modal="handleCloseEditProfile"/>
        </div>
</template>


<script setup lang="ts">
const $user = useUserStore();
const colorMode = useColorMode()
const THEME_KEY = 'THEME_KEY';

const isEditProfile = ref(false);
const isSendHaveUsers = ref(false);

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        let currentTheme = colorMode.value === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, currentTheme);
        colorMode.preference = currentTheme;
    }
})

onMounted(() => {
    let currentTheme = localStorage.getItem(THEME_KEY);
    if (currentTheme) {
        colorMode.preference = currentTheme;
    } else {
        colorMode.preference = "light"
    }
}, )


watch($user , (newValue , oldValue) => {
    if($user.user?.status == 'admin' && isSendHaveUsers.value == false) {
        $user.getUserHavePost();   
        // console.log('SEND');
        isSendHaveUsers.value = true;
    }else {
        isSendHaveUsers.value = false;
    }
}, {
    deep: true
})



const onExit = () => {
    $user.exitClearUser();
}


const handleEditProfile = () => {
    isEditProfile.value = true;
}

const handleCloseEditProfile = () => {

    isEditProfile.value = false;
}

</script>
  