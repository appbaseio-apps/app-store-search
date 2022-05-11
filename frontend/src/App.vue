

<template>
  <div id="app">
    <ReactiveBase
      :app="getIndex"
      url="https://readonly:LF*$Sst`ENR>6}J9@calm-river-nesrtpa-arc.searchbase.io"
      :key="getIndex"
      :enable-appbase="true"
    >
      <SearchBox
        className="result-list-container"
        componentId="BookSensor"
        :dataField="['Name', 'Description']"
        :URLParams="true"
        :size="3"
        :enablePopularSuggestions="false"
        :enableRecentSearches="false"
        :autosuggest="false"
        :enterButton="true"
      />
      <div class="search--type--toggle">
        <input type="checkbox" v-model="isAnn" />
        Enable vector search
      </div>
      <ReactiveList
        componentId="SearchResult"
        dataField="['Name', 'Description']"
        className="result-list-container"
        :pagination="true"
        :size="5"
        :react="{ and: ['BookSensor'] }"
        loader="Loading results"
      >
        <div slot="renderItem" slot-scope="{ item }">
          <div :id="item['ID']" class="flex book-content" :key="item['ID']">
            <img :src="item['Icon URL']" alt="Icon URL" class="book-image" />
            <div class="flex column justify-center ml20">
              <div class="book-header">{{ item.Name }}</div>
              <div class="flex column justify-space-between">
                <div>
                  <div>
                    by <span class="authors-list">{{ item.Developer }}</span>
                  </div>
                  <div class="ratings-list flex align-center">
                    <span class="avg-rating"
                      >({{ item["Average User Rating"] }} avg)</span
                    >
                  </div>
                </div>
                <span class="description">{{
                  item["Description"].slice(0, 120)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </ReactiveList>
    </ReactiveBase>
  </div>
</template>



<script>
import "./styles.css";
export default {
  name: "app",
  data() {
    return {
      isAnn: false,
    };
  },
  computed: {
    getIndex() {
      return this.isAnn ? "app-store-data-ann" : "app-store-data-text";
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.search--type--toggle {
  padding: 25px 50px;
}
</style>
