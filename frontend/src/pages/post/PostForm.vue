<template>
  <div class="q-pa-sm">
    <q-card flat>
      <q-toolbar>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img
                src="https://play-lh.googleusercontent.com/FCzgw2YD80puDhwEAOsjYCZcbetxOu5CRx7VzEVJ0z1C_FjyHqOefGqkrijyLD_cHbx1">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Post</q-item-label>
            <q-item-label caption>Cadastro de Post</q-item-label>
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
          <q-input label="Nome" v-model="form.nome" autofocus />
          <q-input label="Descrição" v-model="form.descricao" />
          <div class="q-pt-sm col-md-12">
            <span class="text-caption">Curtida</span>
            <q-rating class="q-pl-sm" v-model="form.curtida" size="2rem" max="1" icon="thumb_up" color="blue-5" />
          </div>
          <q-input label="Comentario" v-model="form.comentario" type="textarea" class="q-pb-md" />
          <span>Comentário</span>
          <div class="row" v-for="row in form.comments" :key="row.id">
            <div class="col-md-1">
              <q-rating class="q-pl-sm" v-model="row.curtida" @click="curtir(row)" size="2rem" max="1" icon="thumb_up" color="blue-5" />
            </div>
            <div class="col-auto">{{ row.comentario }}</div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { confirm, notify } from 'boot/app'
export default {
  name: 'PostForm',
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
      const res = await this.$api.get(`/post/v1/${id}`)
      const { post, comments } = res.data
      this.form = post
      if (comments) {
        this.form.comments = comments
      }
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
      const res = await this.$api[method]('/post/v1', this.form)
      const message = res.data.message || 'Post criado com sucesso.'
      notify({
        type: 'positive',
        message
      })
      this.form.comments = res.data.comments
      delete this.form.comentario
    },
    remove () {
      confirm('Deseja realmente excluir esse registro?', async () => {
        const { id } = this.$route.query
        const res = await this.$api.delete(`/post/v1/${id}`)
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
    },
    async curtir (row) {
      await this.$api.put('/post/v1/curtir', row)
    }
  },
  computed: {
    hasId () {
      return Object.prototype.hasOwnProperty.call(this.$route.query, 'id')
    }
  }
}
</script>
