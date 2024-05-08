// @ts-ignore
import axios, { AxiosError, AxiosResponse } from "axios";
import toast, { type Toast } from "~/plugins/toast";


const ignoreUrl = {
  "/sanctum/csrf-cookie": true,
}


// @ts-ignore
const $toast : () => Toast = () => toast({} as any).provide.toast;

// @ts-ignore

export default defineNuxtPlugin((_NuxtApp) => {

  axios.defaults.withCredentials = true;

  
  axios.defaults.baseURL = _NuxtApp?.$config.public.API_URL ?? "https://app.chinatop12.kz";
  

  const responseToastsIds : string[] = [];
  const successToastsIds : string[] = [];

  // Интерцептор запросов
  axios.interceptors.request.use((config) => {
    if(!ignoreUrl.hasOwnProperty(config.url ?? '')) {
      for(let a of responseToastsIds) {
        $toast().remove(a);
      }
      responseToastsIds.push(config.url ?? '');
      $toast().add({ title: "Ожидание", color: "orange", id: config.url });
      // $toast.
    }
    return config;
  });

  // Интерцептор ответов
  axios.interceptors.response.use((response: AxiosResponse) => {
    // Добавьте здесь свою обработку ответа
    if(!response.config.url || ignoreUrl.hasOwnProperty(response.config.url ?? '')) return response;
    $toast().remove(response.config.url);
    for(let a of successToastsIds) {
      $toast().remove(a);
    }
    successToastsIds.push(response.config.url);
    if(response.data.message) {
      $toast().add({ title: response.data.message, color: "green", id:response.config.url });
    }else {
      $toast().add({ title: "Успешно", color: "green", id:response.config.url });
    }
    return response;
  });

  // Интерцептор ошибок
  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if(!error.config?.url || ignoreUrl.hasOwnProperty(error.config.url ?? '')) return ;
    
    $toast().remove(error.config.url)

    if ((error.response?.data as any)?.message == "Unauthenticated.") {
      $toast().add({ title: "Вы не авторизованный", color: "red" , id:error.config.url });
      return;
    }

    // @ts-ignore
    if(error.response?.data?.message) {
      // @ts-ignore
      $toast().add({ title: error.response?.data?.message, color: "red" , id:error.config.url });
    }else {
      $toast().add({ title: "Error", color: "red" , id:error.config.url });
    }
  

  });

  return {
    provide: {
      axios: axios,
    },
  };
});
