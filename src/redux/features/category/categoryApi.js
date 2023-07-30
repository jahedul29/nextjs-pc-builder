import { api } from "@/redux/api/apiSlice";

const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeaturedCategories: builder.query({
            url: '/get-categories/featured'
        })
    })
});

export const { useGetFeaturedCategoriesQuery } = categoryApi;