export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  const toast = useToast();
  return {
    provide: {
      toast,
    },
  };
});

export type Toast = ReturnType<typeof useToast>;

