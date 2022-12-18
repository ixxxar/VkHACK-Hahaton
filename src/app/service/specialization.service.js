import httpService from "./http.service";

const specEndpoint = "specializations/";

const specializationService = {
  get: async () => {
    const { data } = await httpService.get(specEndpoint);
    return data;
  },
};

export default specializationService;
