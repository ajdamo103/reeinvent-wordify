import Axios from "axios";
import { toast } from "react-hot-toast";

class AxiosWrapper {
  constructor(baseURL) {
    this.client = Axios.create({ baseURL });
  }

  request = async (options) => {
    return new Promise(async (resolve) => {
      try {
        resolve(await this.client(options));
      } catch (error) {
        toast.error("Oooops. Something went wrong. Please try again. ");

        if (Axios.isCancel(error)) return;
      }
    });
  };
}

export default AxiosWrapper;
