<template>
  <q-page class="flex flex-center" id="fundoForgotPassword">

    <div class="containerLogin" id="containerForgotPassword">
      <div class="left">
        <div class="logoSection">
          <img :src="logo" alt="Logo" />
          <header>{{ t('forgotPassword.bookRental') }}</header>
        </div>

        <div v-if="step === 'forgot'">
          <div class="formLogin" style="max-width: 300px" id="formForgotPassword">
            <p>{{ t('forgotPassword.forgotPasswordTitle') }}</p>
            <header style="color: #F7B176;">{{ t('forgotPassword.title') }}</header>

            <q-input filled v-model="email" type="email" label="E-mail" class="input" />

            <div class="buttons">
              <q-btn push :label="t('forgotPassword.button')" id="logIn" @click="sendEmail" />
              <q-btn push :label="t('forgotPassword.buttonBack')" id="backButton" to="/" />
            </div>

            <img :src="logoWDA" alt="" class="logoResponsive">
          </div>
        </div>

        <div v-else>
          <div class="formLogin" style="max-width: 300px" id="formForgotPassword">
            <p>{{ t('forgotPassword.recoverPassword.title') }}</p>
            <header style="color: #F7B176;">{{ t('forgotPassword.recoverPassword.newPassword') }}</header>
            <q-form ref="formRef" @submit.prevent="doReset">
              <q-input filled v-model="newPassword" type="password" :label="t('login.password')"
                :hint="t('login.hints.password')" lazy-rules class="input white-message" :rules="[
                  val => !!val || t('login.hints.errorPassword'),
                  val => val.length >= 8 || t('forgotPassword.recoverPassword.errorHintPassword')
                ]"  style="margin-bottom: 10%;"/>

              <div class="buttons">
                <q-btn push :label="t('forgotPassword.button')" id="newPassword" type="submit" />
                <q-btn push :label="t('forgotPassword.buttonBack')" id="backButtonPassword" to="/" />
              </div>
            </q-form>

            <img :src="logoWDA" alt="" class="logoResponsive">
          </div>
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
import { useRecoverPasswordStore } from 'src/stores/forgotPassword'
import { Dark } from 'quasar'
import { successMsg, errorMsg } from 'src/utils/toasts'

Dark.set(true)

export default {
  setup() {
    const step = ref('forgot')
    const email = ref('')
    const newPassword = ref('')

    const logo = logoImg
    const logoWDA = logoWDAbranca

    const { t, locale: i18nLocale } = useI18n()
    const locale = ref(i18nLocale.value || 'pt-BR')

    const store = useRecoverPasswordStore()

    async function sendEmail() {
      try {
        await store.forgotPassword(email.value)
        step.value = 'reset'
      } catch (err) {
        console.error(err)
        // alert("Erro ao enviar token!")
        errorMsg(t('forgotPassword.recoverPassword.errorToSendEmail') )
      }
    }

    const formRef = ref(null)

    async function doReset() {
      const isValid = formRef.value.validate()
      if (!isValid) return

      try {
        await store.resetPassword(newPassword.value)
        successMsg(t('forgotPassword.recoverPassword.successNewPassword'))
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      } catch (err) {
        console.error(err)
        errorMsg(t('forgotPassword.recoverPassword.errorNewPassword'))
      }
    }

    return {
      email,
      newPassword,
      step,
      sendEmail,
      doReset,
      formRef,
      logo,
      logoWDA,
      t,
      locale,
      i18nLocale
    }
  }
}
</script>
