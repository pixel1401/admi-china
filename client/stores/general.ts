

export interface SelectOption {
  value: number | string,
  name: string
}

export interface PasswordChange {
  password?: string
  password_confirmation?: string
}


export const useGeneral = defineStore("general", {
  state: () => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
