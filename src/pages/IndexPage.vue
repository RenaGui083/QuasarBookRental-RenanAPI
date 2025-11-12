<template>
  <q-page class="flex flex-center" id="fundoLogin">
    <div class="localeSelector">

      <q-select v-model="locale" :options="localeOptions" dense borderless style="min-width: 100px"
        @update:model-value="changeLocale" emit-value map-options>
        <!-- Como a opção aparece na lista -->
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <img :src="scope.opt.icon" alt="" style="width: 24px; height: 24px;" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <!-- Como a opção selecionada aparece no select -->
        <template v-slot:selected-item="scope">
          <div class="flex items-center">
            <img :src="scope.opt.icon" alt="" style="width: 20px; height: 20px; margin-right: 8px;" />
            <span>{{ scope.opt.label }}</span>
          </div>
        </template>
      </q-select>



    </div>
    <div class="containerLogin">
      <div class="left">
        <div class="logoSection">
          <img :src="logo" alt="Logo" />
          <header>{{ t('login.bookRental') }}</header>
        </div>

        <q-form ref="loginForm" @submit="onSubmit" @reset="onReset" class="formLogin" style="max-width: 300px">
          <p>{{ t('login.welcome') }}</p>
          <header style="color: #F7B176;">{{ t('login.title') }}</header>

          <q-input filled v-model="email" type="email" :label="t('login.email')" :hint="t('login.hints.email')" lazy-rules
            class="input white-message" :rules="[val => val && val.length > 0 || t('login.hints.errorEmail')]" />

          <q-input filled v-model="password" type="password" :label="t('login.password')" :hint="t('login.hints.password')"
            lazy-rules class="input white-message" :rules="[
              val => val !== null && val !== '' || t('login.hints.errorPassword')]" />

          <div v-if="errorMsg" class="text-negative q-mb-sm">{{ errorMsg }}</div>
          <q-btn push type="submit" :label="t('login.button')" id="logIn" />
          <router-link to="/forgot-password" id="forgotPasswordLabel">
            {{ t('login.forgotPassword') }}
          </router-link>
          <img :src="logoWDA" alt="" class="logo">
        </q-form>
      </div>
      <div class="imgLogin" id="imgLogin">
        <img :src="logoWDA" alt="">
      </div>
    </div>

  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import logoImg from 'src/assets/logoLocadora.png'
import logoWDAbranca from 'src/assets/logo.png'
import { useI18n } from 'vue-i18n'
import flagBR from 'src/assets/br.png'
import flagUS from 'src/assets/us.png'
import flagES from 'src/assets/es.png'
import { authenticate } from 'src/stores/authStore.js'
import { useRouter } from 'vue-router'

const { t, locale: i18nLocale } = useI18n()
const locale = ref(i18nLocale.value || 'pt-BR')
const email = ref('')
const password = ref('')
const router = useRouter()
const logo = logoImg
const logoWDA = logoWDAbranca
const errorMsg = ref('')
const loginForm = ref(null)
import { Dark } from 'quasar'

Dark.set(true)
//traduction

const localeOptions = [
  { label: 'Português', value: 'pt-BR', icon: flagBR },
  { label: 'English', value: 'en-US', icon: flagUS },
  { label: 'Español', value: 'es-ES', icon: flagES }
]

function changeLocale(newLocale) {
  if (typeof newLocale === 'string') {
    i18nLocale.value = newLocale
    localStorage.setItem('locale', newLocale)
  } else {
    console.warn('Locale inválido:', newLocale)
  }
}

//login


const onSubmit = async () => {
  if (!loginForm.value.validate()) return

  try {
    await authenticate.login(email.value, password.value)
    console.log('Successful Login')
    router.replace('/dashboard-quasar')
  } catch {
    errorMsg.value = t('login.hints.alert')
  }
}

const onReset = () => {
  loginForm.value.reset()
  errorMsg.value = ''
}

</script>