import client from "../../../lib/ApiClient";


export const Wishlist_post = async (product) => {
    try {
        const response = await client.post("wishlist/add/", {
            product: product.id
        });
        return response.data;

    } catch (error) {
        console.log("Wishlist POST error:", error.response?.data || error);
        throw error;
    }
};


export const Wishlist_get = async () => {
    try {

        const response = await client.get('wishlist/');
        return response.data
    }
    catch (error) {
        console.log('wishlist get : ', error)
    }

}

// delete item 

export const Wishlist_delete = async (id) => {
    try {
        const response = await client.delete(`wishlist/remove/${id}/`);
        return response.data;

    } catch (error) {
        console.log("wishlist delete error:", error.response?.data || error);
        throw error;
    }
};