import axios from "axios";

const userRequest = (data) =>
  axios.post("https://countries.trevorblades.com/graphql", data);

export const apiGetContinents = (query) => userRequest(query);
export const apiGetCountries = (postObj) => userRequest(postObj);
