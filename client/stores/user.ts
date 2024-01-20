import axios from "~/plugins/axios";
import { type AxiosStatic } from "axios";

export interface User {
  id: number;
  status: 'user' | 'admin'
  name: string;
  lastName: string;
  email: string;
  tel: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
  city?: string

}

// @ts-ignore
let $axios : AxiosStatic = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: (): { user: User | null } => ({
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
      await $axios.post("/login", event.data).then(async (res: any) => {
        console.log(res);
        if(!res) return 
        if(res?.message?.errors) {

        }else {
          console.log('wadaw');
          
          await this.getUserOwn()
          await navigateTo("/");
        }
      });
    },

    async register(value: any) {
      let data = await $axios.post('/register', value);
      if(data.status > 399) {

      }else {
        await navigateTo('/login');
      }
    },


    async updateUser(params : any) {
      let data = await $axios.put('/api/user/update', params);
      if(data.data.data) {
        this.user = data.data.data;
      }
    },


    async exitClearUser() {
      await $axios.post("/logout");
      this.user = null;
      navigateTo("/login");
    },
  },
});
