import axios from "~/plugins/axios";
import { type AxiosStatic } from "axios";
import type { PasswordChange, SelectOption } from "./general";

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



interface UserHavePost {
  archive: SelectOption[],
  active: SelectOption[],
}

// @ts-ignore
let $axios : AxiosStatic = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: (): { user: User | null , userHavePost: UserHavePost | null } => ({
    user: null,
    userHavePost: null
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
        if(!res) return 
        if(res?.message?.errors) {

        }else {
          
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

    async getUserHavePost() {
      let data = await $axios.get("/api/user-have-post");
      if (data?.data?.data) {
        // @ts-ignore
        this.userHavePost = {};
        // @ts-ignore
        this.userHavePost.active = this.getUsersPost(data.data.data?.active ?? []) ?? [];
        // @ts-ignore
        this.userHavePost.archive = this.getUsersPost(data.data.data?.archive ?? []) ?? [];
      }
    },

    async changePassword(event: PasswordChange) {
      await $axios.patch('/api/user/change-password', event);
    },


    getUsersPost (usersArg: User[]) {
      if(!usersArg) return [];

      let users = [];
      for (let a of usersArg) {
        if (a) {
          users.push({
            value: a.id,
            name: a.name + ' ' + a.lastName
          });
        }
      }
      
      
      users = users.filter((user, index, self) =>
        index === self.findIndex((t) => (
          t.value === user.value && t.name === user.name
        ))
      );

      return users;
    }




  },
});
