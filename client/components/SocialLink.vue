<template>
    <UCard class="max-w-xl w-full mt-8">
            <div class="flex justify-around">
                <ULink to="/elements/link" active-class="text-primary"
                    inactive-class="flex flex-col justify-center gap-1 items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <UIcon name="logos:telegram" />
                    Telegram
                </ULink>
                <ULink to="/elements/link" active-class="text-primary"
                    inactive-class="flex flex-col justify-center gap-1 items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <UIcon name="logos:whatsapp-icon" />
                    Whatsapp
                </ULink>
                <ULink to="/elements/link" active-class="text-primary"
                    inactive-class="flex flex-col justify-center gap-1 items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <UIcon name="skill-icons:instagram" />
                    Instagram
                </ULink>
            </div>
        </UCard>
</template>
<script lang="ts">
    const isAll = ref(false);
</script>