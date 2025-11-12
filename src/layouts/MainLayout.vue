<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>{{ t('sideBar.header') }}</q-toolbar-title>

        <div><img :src="logoWDApreta" alt="" id="toolBarImg"></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="sideBar">
      <q-list>
        <q-item-label header class="headerSideBar">

          <q-expansion-item class="avatar">
            <template v-slot:header="{ }">
              <q-item-section avatar>
                <q-avatar class="avatarImg">
                  <img :src="avatarSrc" id="avatarImg">
                </q-avatar>
              </q-item-section>

              <q-item-section class="profileSection">
                <div class="profileText">
                  <p class="nameProfile">{{ nameProfile }}</p>
                  <p class="roleProfile">{{ roleProfile }}</p>
                </div>
              </q-item-section>
            </template>

            <q-card>

              <q-card-section class="flex flex-center column" id="expansionSelect">

                <!-- Seletor de avatares predefinidos -->
                <div class="preset-avatars row q-gutter-sm">
                  <q-avatar v-for="(preset, index) in presetAvatars" :key="index" size="48px" class="cursor-pointer"
                    @click="setPresetAvatar(preset)">
                    <img :src="preset" />
                  </q-avatar>
                </div>

                <input ref="fileInput" type="file" accept="image/*" @change="handleFile" style="display: none" />

                 <div class="sideBarButtons">

                                  <q-btn :label="t('avatarButton')" @click="triggerFile" color="primary" />
                
                  <div class="localeSelectorSideBar">

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

                 </div>

              
              </q-card-section>
              
            </q-card>
          </q-expansion-item>



        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />


      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref,computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { authenticate } from 'src/stores/authStore.js'
import flagBR from 'src/assets/br.png'
import flagUS from 'src/assets/us.png'
import flagES from 'src/assets/es.png'
import { onMounted } from 'vue'
const { t, locale: i18nLocale } = useI18n()


const locale = ref(i18nLocale.value || 'pt-BR')

const linksList = computed(() => [
  {
    title: t('sideBar.dashboard'),
    icon: 'insights',
    link: '/dashboard-quasar',
  },
  {
    title: t('sideBar.library'),
    icon: 'book',
    link: '/books-quasar',
  },
  {
    title: t('sideBar.rents'),
    icon: 'assignment',
    link: '/rents-quasar',
  },
  {
    title: t('sideBar.users'),
    icon: 'badge',
    link: '/users-quasar',
  },
  {
    title: t('sideBar.renters'),
    icon: 'person',
    link: '/renters-quasar',
  },
  {
    title: t('sideBar.publishers'),
    icon: 'edit',
    link: '/publishers-quasar',
  },
  {
    title: t('sideBar.logout'),
    icon: 'logout',
    action: logoutUser,
    class: 'logout-item'
  },
])

const leftDrawerOpen = ref(false)
// import logoImg from 'src/assets/logoLocadora.png'
import logoPreta from 'src/assets/logo-preta.png'
import { useI18n } from 'vue-i18n'
// const logo = logoImg
const logoWDApreta = logoPreta
const defaultAvatar = 'https://cdn.quasar.dev/img/boy-avatar.png'
const avatarSrc = ref(localStorage.getItem('userAvatar') || defaultAvatar)
const fileInput = ref(null)
const harry = 'src/assets/Harry Potter.jpg'
const hermione = 'src/assets/hermione granger.jpg'
const rony = 'src/assets/ron weasley.jpg'
const lucy = 'src/assets/lucy.jpg'
const percy = 'src/assets/percy jackson.jpg'
const bella = 'src/assets/Bellas.jpg'
const edward = 'src/assets/Edward.jpg'
const jacob = 'src/assets/jacob.jpg'
const malorie = 'src/assets/Malorie.jpg'

const presetAvatars = [
  harry, hermione, rony, bella, edward, jacob, malorie, lucy, percy
]

function triggerFile() {
  fileInput.value.click()
}

function handleFile(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (ev) => {
    avatarSrc.value = ev.target.result
    localStorage.setItem('userAvatar', ev.target.result)
  }
  reader.readAsDataURL(file)
}

function setPresetAvatar(preset) {
  avatarSrc.value = preset
  localStorage.setItem('userAvatar', preset)
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logoutUser() {
  authenticate.logout()
}

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
const nameProfile = ref('')
const roleKey = ref('')

function getNameRole() {
  nameProfile.value = localStorage.getItem('nameUser')
  roleKey.value = localStorage.getItem('roleUser')
}

const roleProfile = computed(() => {
  return roleKey.value === 'ADMIN' ? t('roleAdmin') : t('roleUser')
})

onMounted(() => {
  getNameRole()
})

</script>
