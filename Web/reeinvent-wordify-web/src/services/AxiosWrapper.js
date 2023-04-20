import Axios from "axios";
import { toast } from "react-hot-toast";

class AxiosWrapper {
  constructor(baseURL) {
    this.client = Axios.create({ baseURL });
  }

  request = async (options) => {
    try {
      return await this.client(options);
    } catch (error) {
      toast.error("Oooops. Something went wrong. Please try again. ");
    }
  };
}

export default AxiosWrapper;
