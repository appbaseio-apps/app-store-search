

<template>
  <div id="app">
    <ReactiveBase
      app="app-store-data-text"
      url="http://foo:bar@localhost:8000"
      :enable-appbase="true"
    >
      <DataSearch
        className="result-list-container"
        componentId="BookSensor"
        :dataField="['Name', 'Description']"
        :URLParams="true"
        :size="3"
        :enablePopularSuggestions="true"
        :enableRecentSearches="true"
      />
      <ReactiveList
        componentId="SearchResult"
        dataField="['Name', 'Description']"
        className="result-list-container"
        :pagination="true"
        :size="5"
        :react="{ and: ['BookSensor'] }"
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
                <span class="price">Price {{ item["Price"] }}</span>
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
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
