

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
        <label class="switch">
          <input type="checkbox" v-model="isAnn" />
          <span class="slider round"></span>
        </label>
        <div class="text">Enable vector search</div>
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
  display: flex;
  align-items: center;
  padding: 25px 50px;
}

.text {
  padding-left: 12px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
