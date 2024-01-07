import axios, { AxiosError, AxiosResponse } from "axios";

const axiosCustom = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:8000";

  let toastId = "wait";

  // Интерцептор запросов
  axios.interceptors.request.use((config) => {
    // Добавьте здесь свою обработку запроса
    // toast.add({ title: "Ожидание", color: "orange", id: toastId });
    return config;
  });

  // Интерцептор ответов
  axios.interceptors.response.use((response: AxiosResponse) => {
    // Добавьте здесь свою обработку ответа
    // toast.remove(toastId);
    // toast.add({ title: "Успешно", color: "green" });
    return response;
  });

  // Интерцептор ошибок
  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    //   console.error('Ошибка запроса', error);
    // toast.remove(toastId);
    // toast.add({ title: "Error", color: "red" });
    if ((error.response?.data as any)?.message == "Unauthenticated.") {
    }
  });

  return axios;
};

export default axiosCustom;
