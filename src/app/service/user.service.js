import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
  registerUser: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  updateUser: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + payload._id,
      payload
    );
    return data;
  },
  getInfo: async (id) => {
    const { data } = await httpService.get(userEndpoint + id);
    return data;
  },
};

export default userService;
