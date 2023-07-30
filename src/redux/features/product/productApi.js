import { api } from "@/redux/api/apiSlice";

const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeaturedProducts: builder.query({
            url: '/get-products/featured'
        })
    })
});

export const { useGetFeaturedProductsQuery } = productApi;