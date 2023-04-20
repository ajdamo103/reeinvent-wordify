import AxiosWrapper from "services/AxiosWrapper";

const axiosWrapper = new AxiosWrapper(process.env.REACT_APP_WORDIFY_API);

export const getSynonyms = (word) => {
  return axiosWrapper.request({
    url: `/synonyms?word=${word}`,
    method: "GET",
  });
};

export const addSynonym = (data) => {
  return axiosWrapper.request({
    url: `/synonyms`,
    method: "POST",
    data,
  });
};

export const resetSynonyms = () => {
  return axiosWrapper.request({
    url: `/synonyms/reset`,
    method: "POST",
  });
};
