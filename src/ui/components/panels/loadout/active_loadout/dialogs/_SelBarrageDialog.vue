<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.mdAndDown"
    :style="$vuetify.breakpoint.mdAndDown ? `x-overflow: hidden` : ''"
    width="90vw"
  >
    <v-card tile class="background">
      <cc-titlebar large color="action--full">
        <v-icon x-large>mdi-hexagon-slice-6</v-icon>
        Barrage
        <v-btn slot="items" dark icon @click="hide()">
          <v-icon large left>close</v-icon>
        </v-btn>
      </cc-titlebar>

      <v-spacer v-if="$vuetify.breakpoint.mdAndDown" class="titlebar-margin" />

      <v-card-text class="mb-0 pb-2">
        <div v-for="(item, i) in items" :key="`barrage_item_${item.ID}_${i}`">
          <weapon-attack :ref="`main_${i}`" :item="item" :mech="mech">
            <div class="heading h2 mt-3 mb-n3">
              <v-icon x-large class="mt-n2 mr-n1">cci-mech-weapon</v-icon>
              {{ item.Name }}
            </div>
          </weapon-attack>
        </div>
        <v-container v-if="auxes.length">
          <div v-for="(aux, i) in auxes" :key="`barrage_item_${aux.ID}_${i}`" class="my-3">
            <div class="body-text text-center font-weight-bold">
              You may make an additional attack with the following mounted Auxiliary weapon:
              <div class="text-center overline my-n2">
                This weapon cannot deal bonus damage.
              </div>
            </div>
            <v-alert dense outlined class="my-1" colored-border color="primary">
              <weapon-attack :ref="`aux_${i}`" :item="aux" :mech="mech" aux class="mt-n3">
                <div class="heading h3 mt-3 mb-n3">
                  <v-icon large class="mt-n2 mr-n1">cci-mech-weapon</v-icon>
                  {{ extraAux.Name }}
                </div>
              </weapon-attack>
            </v-alert>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { WeaponSize } from '@/class'
import Vue from 'vue'
import WeaponAttack from '../components/_WeaponAttack.vue'

export default Vue.extend({
  name: 'barrage-dialog',
  components: { WeaponAttack },
  props: {
    items: {
      type: Array,
      required: true,
    },
    mech: {
      type: Object,
      required: true,
    },
    mounts: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    auxes() {
      const arr = []
      this.mounts.forEach(m => {
        if (!m.Weapons || m.Weapons.length === 1) return
        let extra = m.Weapons.find(x => !this.items.some(y => y === x))
        if (extra && extra.length) extra = extra.filter(w => w.WeaponSize === WeaponSize.Aux)
        if (extra) arr.concat(extra)
      })
      return arr
    },
  },
  methods: {
    reset() {
      for (let i = 0; i < this.items.length; i++) {
        this.$refs[`main_${i}`].reset()
      }
      for (let i = 0; i < this.auxes.length; i++) {
        this.$refs[`aux_${i}`].reset()
      }
    },
    confirm(): void {
      this.mech.Pilot.State.ClearBarrageSelections()
      this.dialog = false
    },
    show(): void {
      this.dialog = true
    },
    hide(): void {
      console.log('clear')
      this.mech.Pilot.State.ClearBarrageSelections()
      this.dialog = false
    },
  },
})
</script>
