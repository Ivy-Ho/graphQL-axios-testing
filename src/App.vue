<script setup>
import { apiGetContinents, apiGetCountries } from "@/api";
import { onMounted, ref } from "vue";

import { useCallApi } from "@/composables/useCallApi.js";
const { callApi } = useCallApi();

const continents = ref([]);
const fetchContinents = async () => {
  const query = {
    query: `
    query {
      continents {
        name
        code
      }
    }
  `,
  };
  await callApi({
    actionFn: () => apiGetContinents(query),
    callBack: (res) => {
      continents.value = res.data.data.continents;
    },
  });
};

const countryList = ref([]);
const fetchCountries = async (continentCode) => {
  const postObj = {
    query: `query getCountries($code: ID!) {
      continent(code: $code) {
        countries {
          name
        }
      }
    }
  `,
    variables: { code: String(continentCode) },
  };
  await callApi({
    actionFn: () => apiGetCountries(postObj),
    callBack: (res) => {
      countryList.value = res.data.data.continent.countries;
      console.log(countryList.value);
    },
  });
};

onMounted(() => {
  fetchContinents();
});

const selectedContinent = ref("");
const handleSelectChange = () => {
  fetchCountries(selectedContinent.value);
};
</script>

<template>
  <div>
    <label for="continent-select">Choose a continent: </label>

    <select
      v-model="selectedContinent"
      name="pets"
      id="continent-select"
      @change="handleSelectChange(val)"
    >
      <option value="" hidden selected>--Please Select a Continent--</option>
      <option v-for="item in continents" :key="item.code" :value="item.code">
        {{ item.name }}
      </option>
    </select>

    <div v-show="countryList.length > 0">
      <h3>Country List :</h3>

      <ul class="list-box">
        <li v-for="item in countryList" :key="item.name">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.list-box {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
