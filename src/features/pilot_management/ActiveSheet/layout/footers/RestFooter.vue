<template>
  <v-footer fixed style="padding-bottom: 2px; border-top: 2px solid var(--v-primary-base)">
    <v-dialog v-model="rcDialog" width="80vw">
      <template v-slot:activator="{ on }">
        <v-btn outlined small class="mr-5" style="border-color: var(--v-warning-base)" v-on="on">
          RESUME COMBAT
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat tile color="warning darken-3 heading h2">
          RESUME COMBAT
        </v-toolbar>
        <v-card-text>
          <p class="flavor-text stark--text mt-2 mb-0 mx-6">
            >//[
            <span class="accent--text">COMP/CON</span>
            :
            <span class="stark-text--text">Confirmation Required</span>
            ] TODO: text here about confirming resume mission
          </p>
          <v-row justify="center" no-gutters class="mt-n2"></v-row>
          <v-alert dense outlined :color="pilot.ActiveMech.Frame.Manufacturer.Color" class="mt-4">
            current running stats, number of encounters completed, etc
          </v-alert>
          <v-row justify="center" class="mt-2">
            <v-col cols="auto">
              <v-btn
                x-large
                tile
                color="warning darken-3"
                @click="
                  rcDialog = false
                  pilot.State.StartCombat()
                "
              >
                &nbsp;Reactivate Combat Mode
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="emDialog" width="80vw">
      <template v-slot:activator="{ on }">
        <v-btn outlined small class="mr-5" style="border-color: var(--v-error-base)" v-on="on">
          END MISSION
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat tile color="warning darken-3 heading h2">
          END MISSION
        </v-toolbar>
        <v-card-text>
          <p class="flavor-text stark--text mt-2 mb-0 mx-6">
            >//[
            <span class="accent--text">COMP/CON</span>
            :
            <span class="stark-text--text">Confirmation Required</span>
            ] TODO: text here about confirming mission will end, record data to pilot log
          </p>
          <v-row justify="center" no-gutters class="mt-n2"></v-row>
          <v-alert dense outlined :color="pilot.ActiveMech.Frame.Manufacturer.Color" class="mt-4">
            pilot log here with ability to edit stats
          </v-alert>
          <v-row justify="center" class="mt-2">
            <v-col cols="auto">
              <v-btn
                x-large
                tile
                color="warning darken-3"
                @click="
                  emDialog = false
                  pilot.State.StartDowntime()
                "
              >
                &nbsp;Complete Mission
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <span class="flavor-text">
      >//[
      <span class="accent--text">COMP/CON</span>
      :
      <span class="stark-text--text">Field Repair Protocols Active</span>
      ]
    </span>

    <v-spacer />

    <action-menu-button :actions="pilot.State.Protocols" color="primary" title="DATA">
      <v-icon slot="icon" size="25">mdi-notebook</v-icon>
    </action-menu-button>

    <action-menu-button :actions="pilot.State.Protocols" color="primary" title="ACTIONS">
      <v-icon slot="icon" size="30">mdi-dots-vertical</v-icon>
    </action-menu-button>
  </v-footer>
</template>

<script lang="ts">
import ActionMenuButton from '../../components/ActionMenuButton.vue'
import activePilot from '@/features/pilot_management/mixins/activePilot'
import vueMixins from '@/util/vueMixins'

export default vueMixins(activePilot).extend({
  name: 'turn-footer',
  components: { ActionMenuButton },
  data: () => ({
    emDialog: false,
    rcDialog: false,
  }),
})
</script>
