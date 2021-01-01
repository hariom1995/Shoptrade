import axios from 'axios';

export const productApi = async () => {
    const response = await axios
        .get('./productData.json')
        .catch((err) => console.log(err.response));
    return response.data
}
