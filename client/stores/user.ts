import axios from "~/plugins/axios";
import { type AxiosStatic } from "axios";

export interface User {
  id: number;
  status: 'user' | 'admin'
  name: string;
  lastName: string;
  email: string;
  tel: null;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
  city?: string

}

// @ts-ignore
let $axios : AxiosStatic = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: (): { user: any | null } => ({
    user: null,
  }),
  getters: {
    //   doubleCount: (state) => state.count * 2,
  },
  actions: {
    async getUserOwn() {
      let data = await $axios.get("api/logged-in-user");
      if (data?.data?.user) {
        this.user = data.data.user;
      }
    },

    async login(event : any) {
      await $axios.get("/sanctum/csrf-cookie");
      await $axios.post("/login", event.data).then(async () => {
        await this.getUserOwn()
        await navigateTo("/");
      });
    },

    async register(value: any) {
      let data = await $axios.post('/register', value);
      if(data.status > 399) {

      }else {
        await navigateTo('/login');
      }
    },


    async exitClearUser() {
      await $axios.post("/logout");
      this.user = null;
      navigateTo("/login");
    },
  },
});
