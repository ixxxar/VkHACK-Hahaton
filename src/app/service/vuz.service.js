import httpService from "./http.service";

const vuzEndpoint = "universities/";

const vuzService = {
  get: async () => {
    const { data } = await httpService.get(vuzEndpoint);
    return data;
  },
};

export default vuzService;
