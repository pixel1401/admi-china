import type { Pagination } from "~/helpers/types";
import { type AxiosStatic } from "axios";
import axios from "~/plugins/axios";
import { defineStore } from "pinia";

export interface Post {
  id: number;
  code: string;
  user_id: number;
  warehouse_id?: number;
  warehouseChina?: string;
  sentFrom?: string;
  issuedClient?: string;
  description: string;
  descriptionAdmin?: string;
  created_at: Date;
  updated_at: Date;
  warehouse: {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface Warehouse {
  id: number;
  name: string;
  updated_at: Date;
  created_at: Date;
}

// @ts-ignore
let $axios: AxiosStatic = axios().provide.axios;

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: null as Post[] | null,
    warehouse: null as Warehouse[] | null,
  }),
  getters: {},
  actions: {
    async getPosts() {
      let data = await $axios.get("/api/posts");
      if (Array.isArray(data?.data?.data)) {
        this.posts = data.data.data;
      }
    },

    async addPost(event: any) {
      let data = await $axios.post("/api/post", event);
      if (data?.data?.data) {
        if(this.posts === null) {
          this.posts = [data?.data?.data]
        }else {
          this.posts?.unshift(data.data.data);
        }
      }
    },

    async deletePost(id: number) {
      let data = await $axios.delete("/api/post/" + id);
      if (data.status < 400) {
        this.posts = this.posts?.filter((item) => item.id != id) ?? [];
      }
    },

    async editPost(postArg: Post ) {
      let data = await $axios.put('/api/post/' + postArg.id , postArg);
      if(data?.data?.data) {
        this.posts = this.posts?.map((item) => {
          if(item.id == postArg.id) {
            return data.data.data;
          }
          return item;
        }) ?? []
      }
    },

    async getWarehouse() {
      let data = await $axios.get("/api/warehouse");
      if (data?.data?.data) {
        this.warehouse = data.data.data;
      }
    },
  },
});
