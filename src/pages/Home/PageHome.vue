<template>
  <div class="page-home">
    <sui-image size="medium" circular centered
      class="image"
      :class="{ 'inverted loader': !dogImage }"
      :src="dogImage"
    ></sui-image>
    <sui-button primary>ok</sui-button>
    <sui-button secondary>exit</sui-button>
    <h1 class="title">Vue + Semantic-ui-vue + Less Template</h1>
  </div>
</template>

<script>
export default {
  name: 'PageHome',
  data() {
    return {
      dogImage: ''
    }
  },
  mounted() {
    this.getRandomImage()
  },
  methods: {
    getRandomImage() {
      let vm = this
      vm.$store
        .dispatch('Dog/GET_RANDOM_IMAGE')
        .then(_response => {
          vm.dogImage = _response
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .page-home {
    padding: 25px;
    .ui.image {
      width: 300px;
      height: 300px;
      backgroung-color: grey;
    }
  }
</style>
 