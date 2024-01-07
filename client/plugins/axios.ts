// @ts-ignore
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "~/plugins/toast";


// @ts-ignore
const $toast = () => toast({} as any).provide.toast;

export default defineNuxtPlugin((_NuxtApp) => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:8000";


  // Интерцептор запросов
  axios.interceptors.request.use((config) => {
    $toast().add({ title: "Ожидание", color: "orange", id: config.url });
    return config;
  });

  // Интерцептор ответов
  axios.interceptors.response.use((response: AxiosResponse) => {
    // Добавьте здесь свою обработку ответа
    if(!response.config.url) return response;
    $toast().remove(response.config.url)
    if(response.data.message) {
      $toast().add({ title: response.data.message, color: "green", id:response.config.url });
    }else {
      $toast().add({ title: "Успешно", color: "green", id:response.config.url });
    }
    return response;
  });

  // Интерцептор ошибок
  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    console.log();
    if(!error.config?.url) return ;
    
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
