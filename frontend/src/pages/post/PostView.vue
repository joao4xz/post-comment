<template>
  <div class="q-pa-sm">
    <q-card flat>
      <q-toolbar>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://play-lh.googleusercontent.com/FCzgw2YD80puDhwEAOsjYCZcbetxOu5CRx7VzEVJ0z1C_FjyHqOefGqkrijyLD_cHbx1">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Posts</q-item-label>
            <q-item-label caption>Listagem de posts</q-item-label>
          </q-item-section>
        </q-item>
        <q-space />
        <q-btn icon="add" flat color="primary" @click="add" />
      </q-toolbar>
      <q-separator />
      <div class="col-md-12">
        <div class="q-pa-sm">
          <q-table dense flat :rows="rows" :columns="columns" class="cursor-pointer" @row-click="openPostForm" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PostView',
  data () {
    return {
      rows: []
    }
  },
  computed: {
    columns () {
      return [
        {
          name: 'id',
          label: 'Id',
          align: 'left',
          field: row => row.id,
          sortable: true
        },
        {
          name: 'nome',
          label: 'Nome',
          align: 'left',
          field: row => row.nome,
          sortable: true
        },
        {
          name: 'descricao',
          label: 'Descrição',
          align: 'left',
          field: row => row.descricao,
          sortable: true
        },
        {
          name: 'curtida',
          label: 'Curtida',
          align: 'left',
          field: row => row.curtida,
          format: val => val ? 'Sim' : 'Não',
          sortable: true
        }
      ]
    }
  },
  methods: {
    openPostForm (evt, row) {
      this.$router.push(`/posts/form?id=${row.id}`)
    },
    add () {
      this.$router.push('/posts/form')
    }
  },
  async mounted () {
    const res = await this.$api.get('/post/v1')
    this.rows = res.data
  }
}
</script>
