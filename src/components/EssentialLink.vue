<template>
  <q-item :to="link" clickable class="menu-item" @click="handleClick"
    :active-class="props.title === 'Logout' ? '' : 'q-item--active'"
    :class="props.title === 'Logout' ? 'bg-white text-black' : ''" :ripple="props.title === 'Logout' ? false : true">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '#',
  },

  icon: {
    type: String,
    default: '',
  },

  action: { type: Function, default: null },
})
function handleClick() {
  if (props.action) {
    props.action()
  } else if (props.link) {
    this.$router.push(props.link)
  }
}
</script>
