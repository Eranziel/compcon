<template>
  <v-col xl="4" lg="6" class="pa-2">
    <v-btn block x-large tile color="active" dark :disabled="disabled" @click="dialog = true">
      <v-icon style="position: absolute; left: -10px">
        $vuetify.icons.{{ action.action_type }}
      </v-icon>
      <div style="position: absolute; right: 0">
        <v-divider dark vertical class="ml-2 mr-1" />
        <v-icon class="fadeSelect" @click.stop="infoDialog = true">mdi-help-circle-outline</v-icon>
      </div>
      <span class="pl-4 pr-3">{{ action.name }}</span>
      <v-dialog v-model="dialog" width="80vw">
        <v-toolbar dense color="action--downtime" class="heading h2" dark>
          {{ action.name }}
        </v-toolbar>
        <v-card>
          <slot @close="dialog = false" />
        </v-card>
      </v-dialog>
      <v-dialog v-model="infoDialog" width="800">
        <v-card tile>
          <v-toolbar dense flat color="action--downtime" class="heading h2" dark>
            {{ action.name }}
          </v-toolbar>
          <v-card-text class="body-text text--text mt-2" v-html="action.detail" />
        </v-card>
      </v-dialog>
    </v-btn>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { actions } from 'lancer-data'

export default Vue.extend({
  name: 'dt-action',
  props: {
    actionId: { type: String, required: true, default: '' },
    disabled: { type: Boolean },
  },
  data: () => ({
    action: {},
    infoDialog: false,
    dialog: false,
  }),
  created() {
    this.action = actions.find(x => x.id === this.actionId)
  },
  methods: {
    close() {
      this.dialog = false
    },
  },
})
</script>
