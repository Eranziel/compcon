<template>
  <v-footer fixed style="padding-bottom: 2px; border-top: 2px solid var(--v-primary-base)">
    <v-dialog v-model="ecDialog" width="80vw">
      <template v-slot:activator="{ on }">
        <v-btn outlined small class="mr-5" style="border-color: var(--v-warning-base)" v-on="on">
          END COMBAT
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat tile color="warning darken-3 heading h2">
          END COMBAT
        </v-toolbar>
        <v-card-text>
          <p class="flavor-text stark--text mt-2 mb-0 mx-6">
            >//[
            <span class="accent--text">COMP/CON</span>
            :
            <span class="stark-text--text">Confirmation Required</span>
            ] TODO: text here about confirming end combat and enter rest mode, give option for
            ending mission
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
                  ecDialog = false
                  pilot.State.StartRest()
                "
              >
                &nbsp;Start Rest
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <span class="flavor-text">
      >//[
      <span class="active--text">COMP/CON</span>
      :
      <span class="stark-text--text">Combat Mode Active</span>
      ]
    </span>

    <span class="heading h3 accent--text pl-4">
      ROUND
      <span class="font-weight-bold">
        {{ pilot.State.Round }}
      </span>
    </span>

    <v-btn
      outlined
      small
      class="ml-5"
      style="border-color: var(--v-active-base)"
      @click="pilot.State.NextRound()"
    >
      NEXT ROUND
    </v-btn>

    <v-spacer />

    <div class="mt-n1">
      <action-menu-button
        :base-actions="pilot.State.BaseActions('Protocol')"
        :item-actions="pilot.State.ItemActions('Protocol')"
        :mech="pilot.ActiveMech"
        color="action--protocol"
        title="PROTOCOLS"
        @open-menu="openMenu(0)"
        @open-dialog="openDialog($event)"
      >
        <v-icon slot="icon" color="white" size="40">cci-protocol</v-icon>
      </action-menu-button>
    </div>

    <v-divider vertical class="mx-3" />

    <div class="mt-n1">
      <action-menu-button
        :base-actions="[]"
        :item-actions="[]"
        :mech="pilot.ActiveMech"
        color="action--move"
        title="MOVEMENT"
        @open-menu="openMenu(0)"
        @open-dialog="openDialog($event)"
      >
        <v-icon slot="icon" color="white" size="30">mdi-arrow-right-bold-hexagon-outline</v-icon>
      </action-menu-button>

      <action-menu-button
        :base-actions="pilot.State.BaseActions('Full')"
        :item-actions="pilot.State.ItemActions('Full')"
        :mech="pilot.ActiveMech"
        color="action--full"
        title="FULL ACTIONS"
        @open-menu="openMenu(1)"
        @open-dialog="openDialog($event)"
      >
        <v-icon slot="icon" color="white" size="30">mdi-hexagon-slice-6</v-icon>
      </action-menu-button>

      <action-menu-button
        :base-actions="pilot.State.BaseActions('Quick')"
        :item-actions="pilot.State.ItemActions('Quick')"
        :mech="pilot.ActiveMech"
        color="action--quick"
        title="QUICK ACTIONS"
        @open-menu="openMenu(2)"
        @open-dialog="openDialog($event)"
      >
        <v-icon slot="icon" color="white" size="30">mdi-hexagon-slice-3</v-icon>
      </action-menu-button>

      <action-menu-button
        :base-actions="pilot.State.BaseActions('Reaction')"
        :item-actions="pilot.State.ItemActions('Reaction')"
        :mech="pilot.ActiveMech"
        color="action--reaction"
        title="REACTIONS"
        @open-menu="openMenu(3)"
        @open-dialog="openDialog($event)"
      >
        <v-icon slot="icon" color="white" size="35">cci-reaction</v-icon>
      </action-menu-button>

      <action-menu-button
        :base-actions="pilot.State.BaseActions('Free')"
        :item-actions="pilot.State.ItemActions('Free')"
        :mech="pilot.ActiveMech"
        color="action--free"
        title="FREE ACTIONS"
        @open-menu="openMenu(4)"
        @open-dialog="openDialog($event)"
      >
        <v-icon slot="icon" color="white" size="35">cci-free-action</v-icon>
      </action-menu-button>
    </div>

    <v-divider vertical class="mx-3" />

    <div class="mt-n1">
      <action-menu-button
        :base-actions="[]"
        :item-actions="[]"
        :mech="pilot.ActiveMech"
        color="primary"
        title="DATA"
        @open-menu="openMenu(5)"
        @open-dialog="openDialog($event)"
      >
        <v-icon slot="icon" color="white" size="25">mdi-notebook</v-icon>
      </action-menu-button>

      <action-menu-button
        :base-actions="[]"
        :item-actions="[]"
        :mech="pilot.ActiveMech"
        color="primary"
        title="OTHER"
        @open-menu="openMenu(6)"
        @open-dialog="openDialog($event)"
      >
        <v-icon slot="icon" color="white" size="30">mdi-dots-vertical</v-icon>
      </action-menu-button>
    </div>

    <cc-combat-dialog
      v-for="a in pilot.State.AllBaseActions"
      :key="`fa_${a.ID}`"
      :ref="`dialog_${a.ID}`"
      :action="a"
      :mech="pilot.ActiveMech"
    />

    <cc-solo-dialog ref="actionMenu" no-confirm title="Actions" large>
      <action-menu :tab="menuTab" />
    </cc-solo-dialog>
  </v-footer>
</template>

<script lang="ts">
import ActionMenuButton from '../../components/ActionMenuButton.vue'
import ActionMenu from '../../components/ActionMenu.vue'
import activePilot from '@/features/pilot_management/mixins/activePilot'
import vueMixins from '@/util/vueMixins'

export default vueMixins(activePilot).extend({
  name: 'turn-footer',
  components: { ActionMenuButton, ActionMenu },
  data: () => ({
    menuTab: 0,
    ecDialog: false,
  }),
  methods: {
    openMenu(tab) {
      this.menuTab = tab
      this.$refs.actionMenu.show()
    },
    openDialog(action) {
      const r = this.$refs[`dialog_${action.ID}`]
      if (r && r[0]) r[0].show()
    },
  },
})
</script>
