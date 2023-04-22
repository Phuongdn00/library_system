import axios from "axios";
import { API_URL } from "../../config";

// This function gets the profile details of a user by their userId
const get_detail_user = async (userId) => {
  // Send a GET request to the API endpoint that retrieves user profile information
  const res = await axios({
    url: API_URL + "/api/v3/user/profile?id=" + userId,
    method: "get",
  });
  const result = await res.data;
  return result;
};

export default get_detail_user;
