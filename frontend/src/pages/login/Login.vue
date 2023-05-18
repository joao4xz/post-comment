<template>
  <form class="row justify-center q-pt-lg">
    <div class="container q-pt-lg q-gutter-sm">
      <q-img src="./Login.svg" width="350px" />
      <q-input label="Login" :readonly="loading" v-model="form.login" autofocus />
      <q-input label="Senha" @blur="onBlur" @focus="onFocus" :type="this.showPassword ? 'password' : 'text'"
        :toggle="showPassword" :readonly="loading" v-model="form.senha">
        <template v-slot:append>
          <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="showPassword = !showPassword" />
        </template>
      </q-input>
      <div class="row">
        <q-btn @click="login" dense :loading="loading" color="primary" class="q-mt-sm col-md-12 col-xs-12">
          Entrar
        </q-btn>
      </div>
    </div>
  </form>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { securityStore } from 'stores/security'

export default defineComponent({
  name: 'LoginForm',
  setup () {
    const store = securityStore()
    const form = ref({
      login: '',
      senha: ''
    })
    const loading = ref(false)
    const focused = ref(false)
    const showPassword = ref(true)

    const login = async () => {
      loading.value = true
      try {
        await store.login({ ...form.value })
      } finally {
        loading.value = false
      }
    }

    const onBlur = () => (focused.value = false)

    const onFocus = () => (focused.value = true)

    return { form, loading, showPassword, login, onBlur, onFocus }
  }
})
</script>
