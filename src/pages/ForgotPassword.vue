<template>
  <q-page class="flex flex-center" id="fundoForgotPassword">

    <div class="containerLogin" id="containerForgotPassword">
      <div class="left">
        <div class="logoSection">
          <img :src="logo" alt="Logo" />
          <header>{{ t('forgotPassword.bookRental') }}</header>
        </div>
        <div class="formLogin" style="max-width: 300px" id="formForgotPassword">
          <p>{{ t('forgotPassword.forgotPasswordTitle') }}</p>
          <header style="color: #F7B176;">{{ t('forgotPassword.title') }}</header>
          <q-input filled v-model="email" type="email" :label="t('forgotPassword.email')" class="input" />
          <div class="buttons">
            <q-btn push :label="t('forgotPassword.button')" id="logIn" /> <q-btn push :label="t('forgotPassword.buttonBack')" id="backButton" to="/"/>
          </div>
           <img :src="logoWDA" alt="" class="logoResponsive">
        </div>
      </div>
      <div class="imgLogin" id="imgForgotPassword">
        <img :src="logoWDA" alt="">
      </div>
    </div>

  </q-page>
</template>
<script>
import { ref } from 'vue'
import logoImg from 'src/assets/logoLocadora.png'
import logoWDAbranca from 'src/assets/logo.png'
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const logo = logoImg
    const logoWDA = logoWDAbranca
    const {  t, locale: i18nLocale } = useI18n()
    const locale = ref(i18nLocale.value || 'pt-BR')

    return { email, password, logo, logoWDA, t, i18nLocale, locale}
  }
}
</script>