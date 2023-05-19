<template>
  <div class="q-pa-sm">
    <q-card flat>
      <q-toolbar>
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
        <q-space />
        <div class="row q-gutter-sm">
          <q-btn icon="save" color="positive" flat @click="save" />
          <q-btn icon="delete" color="negative" flat v-if="hasId" @click="remove" />
        </div>
      </q-toolbar>
      <q-separator />
      <div class="col-md-12">
        <div class="q-pa-sm">
          <q-input label="Login" :readonly="loading" v-model="form.login" autofocus />
          <q-input label="Senha" @blur="onBlur" @focus="onFocus" :type="this.hidePassword ? 'password' : 'text'"
            :toggle="hidePassword" :readonly="loading" v-model="form.senha">
            <template v-slot:append>
              <q-icon :name="hidePassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="hidePassword = !hidePassword" />
            </template>
          </q-input>
          <div class="q-pt-sm col-md-12">
            <span class="text-caption">Data de Nascimento</span>
            <VueDatePicker v-model="form.dataNascimento" />
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { confirm, notify } from 'boot/app'
export default {
  name: 'UserForm',
  data () {
    return {
      form: {},
      loading: false,
      focused: false,
      hidePassword: true
    }
  },
  async mounted () {
    const { id } = this.$route.query
    if (id) {
      const res = await this.$api.get(`/user/v1/${id}`)
      this.form = res.data
    }
  },
  methods: {
    onBlur () {
      this.focused = false
    },
    onFocus () {
      this.focused = true
    },
    async save () {
      const method = this.hasId ? 'put' : 'post'
      await this.$api[method]('/user/v1', this.form)
      notify({
        type: 'positive',
        message: 'Usuário criado com sucesso.'
      })
      this.$router.go(-1)
    },
    remove () {
      confirm('Deseja realmente excluir esse registro?', async () => {
        const { id } = this.$route.query
        const res = await this.$api.delete(`/user/v1/${id}`)
        const { message } = res.data
        if (message && !/excluido/.test(message)) {
          notify({
            type: 'negative',
            message
          })
          return
        }
        this.$router.go(-1)
      })
    }
  },
  computed: {
    hasId () {
      return Object.prototype.hasOwnProperty.call(this.$route.query, 'id')
    }
  }
}
</script>
