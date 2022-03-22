

<template>
  <div id="app">
    <ReactiveBase
      app="app-store-data-text"
      url="http://foo:bar@localhost:8000"
      :enable-appbase="true"
    >
      <ReactiveList
        componentId="SearchResult"
        dataField="Name"
        className="result-list-container"
        :pagination="true"
        :size="5"
      >
        <div slot="renderItem" slot-scope="{ item }">
          <div :id="item._id" class="flex book-content" :key="item._id">
            <img :src="item['Icon URL']" alt="Icon URL" class="book-image" />
            <div class="flex column justify-center ml20">
              <div class="book-header">{{ item.Name }}</div>
              <div class="flex column justify-space-between">
                <div>
                  <div>
                    by <span class="authors-list">{{ item.Developer }}</span>
                  </div>
                  <div class="ratings-list flex align-center">
                    <span class="stars">
                      <i
                        v-for="(item, index) in Array(
                          item['Average User Rating']
                        ).fill('x')"
                        class="fas fa-star"
                        :key="index"
                      />
                    </span>
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
