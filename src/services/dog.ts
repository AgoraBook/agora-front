import axios from "axios";

export const getDog = async () => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    return response.data;
  } catch (error) {
    console.error("Error fetching random dog:", error);
  }
};
