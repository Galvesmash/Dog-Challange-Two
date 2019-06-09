<template>
  <sui-modal basic v-model="isModalOpen">
    <h1 class="title">Dog Saved</h1>
    <sui-button positive @click.native="toggleModal">
      OK
    </sui-button>
  </sui-modal>
</template>

<script>
  export default {
    name: 'SaveConfirmationModal',
    props: ['isModalOpen', 'toggleModal']
  }
</script>

<style lang="less" scoped>
  .title {
    text-align: center;
  }
  .ui.positive.button {
    margin: 0 auto;
    display: block;
  }
</style>
 