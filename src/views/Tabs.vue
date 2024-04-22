<template>
  <div>
    <q-card>
      <q-tabs v-model="selectedTab"  dense no-caps
          class="bg-grey-2 text-grey-7"
          active-color="primary"
          indicator-color="primary"
          align="justify">
        <q-tab name="Calendar" label="Calendar">
          
        </q-tab>
        <q-tab name="Todolists" label="Todolists">
          
        </q-tab>
      </q-tabs>
      <q-tab-panels v-model="selectedTab">
        <q-tab-panel name="Calendar">
          <Calendar></Calendar>
        </q-tab-panel>
        <q-tab-panel name="Todolists">
          <Todolists ></Todolists>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script setup>
  import Todolists from '../components/Todolist.vue';
  import Calendar from '../components/Calendar.vue';
  import { ref, reactive} from 'vue';
  const selectedTab = ref('Calendar')
</script>