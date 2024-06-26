import { type AxiosResponse, type AxiosStatic } from "axios";
import axios from "~/plugins/axios";
import { defineStore } from "pinia";
import type { User } from "./user";
import type { Pagination } from "~/helpers/types";




export interface Post {
  id: number;
  code: string;
  user_id: number;
  warehouse_id?: number;
  warehouseChina?: boolean;
  sentFrom?: boolean;
  issuedClient?: boolean;
  description: string;
  descriptionAdmin?: string;
  created_at: Date;
  updated_at: Date;
  city: string;
  tel: string;
  is_warehouse: boolean;
  warehouse: {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
  user: User;
}

export interface Warehouse {
  id: number;
  name: string;
  updated_at: Date;
  created_at: Date;
}

export interface PostParams {
  search?: string;
  user_id?: string | number;
  page?: string | number;
}




// @ts-ignore
let $axios: AxiosStatic = axios().provide.axios;

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: null as Post[] | null,
    warehouse: null as Warehouse[] | null,
    withDates: null as Pagination<Post> | null,
    postsArchive: null as Post[] | null,
    postsArchiveWithData: null as Pagination<Post> | null,
    isLoading: true as boolean,
  }),
  getters: {
  },

  actions: {
    async getPosts(params?: PostParams) {
      this.isLoading = true;
      let data = await $axios.get<any, AxiosResponse<Pagination<Post>>>(
        "/api/posts",
        {
          params: params,
        }
      );

      if (Array.isArray(data?.data?.data)) {
        this.posts = data?.data?.data ?? null;
        this.withDates = data.data;
      }
      this.isLoading = false;
    },

    async getPostsArchive(params?: PostParams) {
      this.isLoading = true;
      let data = await $axios.get<any, AxiosResponse<Pagination<Post>>>(
        "/api/archive",
        {
          params: params,
        }
      );

      if (Array.isArray(data?.data?.data)) {
        this.postsArchive = data?.data?.data ?? null;
        this.postsArchiveWithData = data.data;
        
      }
      this.isLoading = false;
    },

    async addPost(event: any) {
      let data = await $axios.post("/api/post", event);
      if (data?.data?.data) {
        if (this.posts === null) {
          this.posts = [data?.data?.data];
        } else {
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

    async editPost(postArg: Post) {
      let data = await $axios.put("/api/post/" + postArg.id, postArg);
      if (data?.data?.data) {
        this.posts =
          this.posts?.map((item) => {
            if (item.id == postArg.id) {
              return data.data.data;
            }
            return item;
          }) ?? [];

        if (this.posts) {
          this.posts = this.posts.filter((item) => item.issuedClient === false);
        }
        if (this.postsArchive) {
          this.postsArchive = this.posts.filter((item) => item.issuedClient === true)
        }
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
