import VK from "vk-io";
import { Config } from "../config";

const userApi = new VK();
userApi.token = Config.VkToken;

export default userApi;
