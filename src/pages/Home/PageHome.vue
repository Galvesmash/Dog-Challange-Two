<template>
  <div class="page-home">
    <div class="header" :style="{ backgroundImage: `url(${headerImage})` }">
    </div>
    <div class="content" :class="{ 'loading': isSearching }">
      <h1>Challange Two</h1>
      <div class="item">
        <sui-dropdown
          :options="fonts"
          placeholder="Select font"
          search
          selection
          centered
          v-model="currentFont"
        />
      </div>
      <div class="item">
        <sui-dropdown
          :options="colors"
          placeholder="Select color"
          search
          selection
          centered
          v-model="currentColor"
        />
      </div>
      <div class="item" v-if="breedList">
        <sui-dropdown
          :class="{ 'loading': isSearching }"
          :options="breedList"
          placeholder="Select breed"
          search
          selection
          centered
          v-model="search"
        />
      </div>
      <!-- <div class="ui search item" :class="{ 'loading': isSearching }">
        <div class="ui icon input">
          <input class="prompt" type="text"
            v-model="search"
            placeholder="Search..."
          >
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div> -->
      <div class="results" v-if="!searchError && searchedDog">
        <img :src="dogImage" class="ui medium centered image">
        <h1 class="title" :class="[currentFont, currentColor]">{{ searchedDog }}</h1>
        <button class="ui secondary button" @click="saveLocalStorage()">Save</button>
      </div>
      <p class="search-error" v-else="searchError">{{ searchError }}</p>
    </div>
    <SaveConfirmationModal
      :isModalOpen="isModalOpen"
      :toggleModal="toggleModal"
    ></SaveConfirmationModal>
  </div>
</template>

<script>
  import SaveConfirmationModal from '@/pages/Home/components/SaveConfirmationModal'
  import debounce from 'lodash/debounce'
  import _ from 'lodash'

  export default {
    name: 'PageHome',
    components: {
      SaveConfirmationModal
    },
    watch: {
      search: {
        handler: function (newVal, oldVal) {
          if (newVal) {
            this.dogImage = null
            this.searchedDog = null
            this.searchError = null
            this.isSearching = true
            this.debouncedSearch()
          } else if (!newVal && oldVal) {
            this.dogImage = null
            this.searchedDog = null
            this.searchError = null
            this.isSearching = false
          }
        }
      }
    },
    data() {
      return {
        dogImage: '',
        headerImage: '',
        search: null,
        searchedDog: null,
        currentFont: null,
        currentColor: null,
        searchError: null,
        isSearching: false,
        isModalOpen: false,
        breedList: null,
        fonts: [
          { key: 'fresca', value: 'fresca', text: 'Fresca' },
          { key: 'amatic', value: 'amatic', text: 'Amatic SC' },
          { key: 'permanent', value: 'permanent', text: 'Permanent Marker' },
          { key: 'gloria', value: 'gloria', text: 'Gloria Hallelujah' },
          { key: 'kaushan', value: 'kaushan', text: 'Kaushan Script' }
        ],
        colors: [
          { key: 'black', value: 'black', text: 'Black' },
          { key: 'white', value: 'white', text: 'White' },
          { key: 'red', value: 'red', text: 'Red' },
          { key: 'green', value: 'green', text: 'Green' },
          { key: 'blue', value: 'blue', text: 'Blue' }
        ],
      }
    },
    created() {
      this.getRandomImage()
      this.getAllBreeds()
      this.debouncedSearch = _.debounce(this.searchDog, 500)
    },
    mounted() {
      this.currentFont = localStorage.getItem('currentFont')
      this.currentColor = localStorage.getItem('currentColor')
      this.searchedDog = localStorage.getItem('searchedDog')
      this.dogImage = localStorage.getItem('dogImage')
    },
    methods: {
      getRandomImage() {
        let vm = this
        vm.$store
          .dispatch('Dog/GET_RANDOM_IMAGE')
          .then(_response => {
            vm.headerImage = _response
          })
      },
      getAllBreeds() {
        let vm = this
        vm.$store
          .dispatch('Dog/GET_ALL_BREEDS')
          .then(_response => {
            vm.breedList = _response
          })
      },
      searchDog() {
        let vm = this
        if (!vm.search) { return }

        let payload = {
          search: vm.search
        }
        vm.$store
          .dispatch('Dog/SEARCH_DOG', payload)
          .then(_response => {
            vm.searchedDog = vm.search
            vm.dogImage = _response
          })
          .catch(_error => {
            vm.searchError = _error
          })
          .finally(() => {
            vm.isSearching = false
          })
      },
      saveLocalStorage() {
        localStorage.setItem('currentFont', this.currentFont)
        localStorage.setItem('currentColor', this.currentColor)
        localStorage.setItem('searchedDog', this.searchedDog)
        localStorage.setItem('dogImage', this.dogImage)
        localStorage.setItem('data', new Date())
        this.toggleModal()
      },
      toggleModal() {
        this.isModalOpen = !this.isModalOpen;
      }
    }
  }
</script>

<style lang="less" scoped>
  .ui.selection.dropdown {
    text-transform: capitalize;
  }
  .page-home {
    .header {
      width: 100vw;
      height: 30vh;
      background-size: 100%;
      background-position: 50%;
      box-shadow: 0 0 5px 2px grey;
    }
    .content {
      padding: 25px;
      text-align: center;
      .item {
        margin-top: 20px;
      }
      .results {
        width: 300px;
        margin: 0 auto;
        margin-top: 20px;
        position: relative;
        .ui.image {
          min-height: 50px;
          border-radius: 10px;
        }
        .title {
          top: 45%;
          left: 50%;
          margin: 0;
          font-weight: bold;
          position: absolute;
          transform: translate(-50%, -55%);
          // Fonts
          &.fresca { font-family: 'Fresca', sans-serif; }
          &.amatic { font-family: 'Amatic SC', cursive; }
          &.permanent { font-family: 'Permanent Marker', cursive; }
          &.gloria { font-family: 'Gloria Hallelujah', cursive; }
          &.kaushan { font-family: 'Kaushan Script', cursive; }
          // Colors
          &.black { color: black; }
          &.white { color: white; }
          &.red { color: red; }
          &.green { color: green; }
          &.blue { color: blue; }
        }
        .ui.button {
          margin-top: 20px;
        }
      }
      .search-error {
        color: red;
        padding: 0 20%;
        margin-top: 20px;
        text-align: center;
      }
    }
  }
</style>
 