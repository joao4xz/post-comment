<template>
  <div class="q-pa-sm">
    <q-card flat>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Usuário</q-item-label>
          <q-item-label caption>Cadastro de Usuário</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <div class="col-md-12">
        <div class="q-pa-sm">
            <q-input label="Login" :readonly="loading" v-model="form.login" autofocus />
            <q-input label="Senha" @blur="onBlur" @focus="onFocus" :type="this.showPassword ? 'password' : 'text'"
                :toggle="showPassword" :readonly="loading" v-model="form.senha">
                <template v-slot:append>
                    <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="showPassword = !showPassword" />
                </template>
            </q-input>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  data () {
    return {
      form: {},
      loading: false,
      focused: false,
      showPassword: false
    }
  },
  async mounted () {
    const { id } = this.$route.query
    const res = await this.$api.get(`/user/v1/${id}`)
    this.form = res.data
  },
  methods: {
    onBlur () {
      this.focused = false
    },
    onFocus () {
      this.focused = true
    }
  }
}
</script>
