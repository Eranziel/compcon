<template>
  <div>
    <span class="overline">
      DEPLOYED EQUIPMENT
      <v-btn small right icon class="fadeSelect" @click="showDeployed = !showDeployed">
        <v-icon small v-html="showDeployed ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" />
      </v-btn>
    </span>
    <v-scroll-y-reverse-transition mode="out-in" leave-absolute>
      <div v-if="showDeployed">
        <v-card flat tile class="clipped-large light-panel" style="height: calc(100% - 20px)">
          <v-row class="text-center" style="height: 100%" justify="center" align="center">
            <v-col class="panel">
              <div class="heading h2 subtle--text" style="opacity: 0.4">
                <cc-slashes />
                NO EQUIPMENT DEPLOYED
                <cc-slashes />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-scroll-y-reverse-transition>
  </div>
</template>

<script lang="ts">
import activePilot from '@/features/pilot_management/mixins/activePilot'
import vueMixins from '@/util/vueMixins'

export default vueMixins(activePilot).extend({
  name: 'deployed-block',
  data: () => ({
    showDeployed: true,
  }),
})
</script>
