<template>
  <div>
    <div class="q-pa-md">
      <div class="q-gutter-y-md " style="width: 80vw">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-2 text-grey-7"
            active-color="primary"
            indicator-color="purple"
            align="justify"
          >
            <q-tab name="mails" label="未開始" />
            <q-tab name="alarms" label="進行中" />
            <q-tab name="movies" label="已完成" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated class="bg-primary text-white todolistStyle">
            <q-tab-panel name="mails">
              <div class="text-h6">未開始</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
            <q-tab-panel name="alarms">
              <div class="text-h6">進行中</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
            <q-tab-panel name="movies">
              <div class="text-h6">已完成</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const tab = ref('alarms')
  
</script>
<style scope>
  .todolistStyle{
    height:70vh
  }
</style>