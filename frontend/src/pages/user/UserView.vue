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
            <q-item-label>Usuários</q-item-label>
            <q-item-label caption>Listagem de usuários</q-item-label>
          </q-item-section>
        </q-item>
        <q-space />
        <q-btn icon="add" flat color="primary" @click="add" />
      </q-toolbar>
      <q-separator />
      <div class="col-md-12">
        <div class="q-pa-sm">
          <q-table dense flat :rows="rows" :columns="columns" class="cursor-pointer" @row-click="openUserForm" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'UserView',
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
          name: 'login',
          label: 'Login',
          align: 'left',
          field: row => row.login,
          sortable: true
        },
        {
          name: 'dataNascimento',
          label: 'Data de Nascimento',
          align: 'left',
          field: row => row.dataNascimento,
          format: val => `${date.formatDate(val, 'DD/MM/YYYY')}`,
          sortable: true
        }
      ]
    }
  },
  methods: {
    openUserForm (evt, row) {
      this.$router.push(`/users/form?id=${row.id}`)
    },
    add () {
      this.$router.push('/users/form')
    }
  },
  async mounted () {
    const res = await this.$api.get('/user/v1')
    this.rows = res.data
  }
}
</script>
