<template>
  <div>
    <q-dialog v-model="confirmDialog" persistent>
      <q-card  style="height:20vh; width:30vw" class="row items-center justify-center">
        <q-card-section  >
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <q-btn label="Google Sign in" color="teal" no-caps @click="signinGoogle"></q-btn>
        </q-card-section>

        <!-- <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Enter" color="primary" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  const confirmDialog = ref(true);
  const signinGoogle = ()=>{
    confirmDialog.value = false;
  }
</script>