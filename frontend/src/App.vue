

<template>
  <div id="app">
    <nav>
      <h2>
        <img src="https://i.imgur.com/FQ2o0ZH.png" alt="app-store" /> App Store
        Search
      </h2>

      <a href="#" target="_blank">View Blog</a>
    </nav>
    <ReactiveBase
      :app="getIndex"
      url="https://readonly:LF*$Sst`ENR>6}J9@calm-river-nesrtpa-arc.searchbase.io"
      :key="getIndex"
      :enable-appbase="true"
    >
      <div class="content-container">
        <SearchBox
          className="result-list-container"
          componentId="q"
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
          <div class="text">{{ isAnn ? "vector" : "text" }} search</div>
        </div>
        <ReactiveList
          componentId="SearchResult"
          dataField="['Name', 'Description']"
          className="result-list-container"
          :pagination="true"
          :size="5"
          :react="{ and: ['q'] }"
          :showResultStats="false"
        >
          <div slot="render" slot-scope="{ loading, error, data, resultStats }">
            <div class="loader" v-if="loading">
              <img src="https://i.imgur.com/ULLRsFw.gif" alt="searching..." />
            </div>
            <div v-if="Boolean(error)">
              Something went wrong! Error details {{ JSON.stringify(error) }}
            </div>
            <div v-if="!loading">
              <div>
                Found {{ resultStats.numberOfResults }} results in
                {{ resultStats.time }} seconds
              </div>
              <div v-bind:key="result._id" v-for="result in data">
                <div
                  :id="result['ID']"
                  class="flex book-content"
                  :key="result['ID']"
                >
                  <img
                    :src="result['Icon URL']"
                    alt="Icon URL"
                    class="book-image"
                  />
                  <div class="flex column justify-center ml20">
                    <div class="book-header">
                      {{ result.Name }}
                      <span class="stars">
                        <span
                          v-for="(item, index) in Array(
                            Math.ceil(result['Average User Rating'])
                          ).fill('x')"
                          :key="index"
                        >
                          ⭐
                        </span>
                      </span>
                    </div>
                    <div class="flex column justify-space-between">
                      <div>
                        <div>
                          by
                          <span class="authors-list">{{
                            result.Developer
                          }}</span>
                        </div>
                      </div>
                      <span
                        :title="
                          result['Description']
                            .replace(/\\n/g, ' ')
                            .replace(/\\t/g, ' ')
                        "
                        class="description"
                        >{{
                          result["Description"]
                            .replace(/\\n/g, " ")
                            .replace(/\\t/g, " ")
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactiveList>
      </div>
    </ReactiveBase>
  </div>
</template>



<script>
import "./styles.css";
export default {
  name: "app",
  metaInfo: {
    title: "App store search demo from Reactivesearch",
    meta: [
      {
        name: "description",
        content:
          "Demo of kNN and text search capabilities for reactivesearch.io",
      },
    ],
  },
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
  padding: 0 40px;
  margin: 20px 0;
}

.text {
  padding-left: 12px;
  text-transform: uppercase;
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

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
