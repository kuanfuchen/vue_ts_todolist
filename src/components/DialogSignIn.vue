<template>
  <div>
    <q-dialog v-model="confirmDialog" persistent>
      <q-card  style="height: 20vh; width: 30vw" class="row items-center justify-center">
        <q-card-section>
          <p class="text-h6">登入你的Google帳號</p>
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <q-btn label="Google Sign in" color="teal" no-caps @click="loginGoogle"></q-btn>
        </q-card-section>
        <!-- <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Enter" color="primary" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const confirmDialog = ref(true);
  import { googleTokenLogin } from 'vue3-google-login';
  import axios from 'axios';
  let clientIDdata:object = {};
  const loginGoogle = ()=>{
    confirmDialog.value = false;
    try{
      googleTokenLogin({
        clientId: import.meta.env.VITE_APP_CLIENT_ID,
        // 771037620608-aap4bl0pqg9ar5die31led536vcldotu.apps.googleusercontent.com
        // import.meta.env.VITE_APP_CLIENT_ID
      }).then(async(res:any)=>{
        clientIDdata = res;
        console.log(res,'res')
        await axios.post('http://localhost:3000/users/googleLogin',{
          token:res.access_token
        }).then((response)=>console.log(response))
      })
    }catch(err){
      console.log(err)
    }
  }
</script>