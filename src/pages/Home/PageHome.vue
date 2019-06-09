<template>
  <div class="page-home">
    <sui-dropdown
      :options="fonts"
      placeholder="Select font"
      search
      selection
      v-model="currentFont"
    />
    <sui-dropdown
      :options="colors"
      placeholder="Select font"
      search
      selection
      v-model="currentColor"
    />
    <div class="ui search" :calss="{ 'loading': isSearching }">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Search...">
        <i class="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
    <img :src="dogImage" class="ui medium circular centered image">
  </div>
</template>

<script>
export default {
  name: 'PageHome',
  data() {
    return {
      dogImage: '',
      isSearching: false,
      currentFont: null,
      fonts: [
        { key: 'font1', value: '1', text: 'Font 1' },
        { key: 'font2', value: '2', text: 'Font 2' },
        { key: 'font3', value: '3', text: 'Font 3' },
        { key: 'font4', value: '4', text: 'Font 4' },
        { key: 'font5', value: '5', text: 'Font 5' }
      ],
      currentColor: null,
      colors: [
        { key: 'color1', value: 'black', text: 'Black' },
        { key: 'color2', value: 'red', text: 'Red' },
        { key: 'color3', value: 'green', text: 'Green' },
        { key: 'color4', value: 'blue', text: 'Blue' },
        { key: 'color5', value: 'yellow', text: 'Yellow' }
      ],
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
 