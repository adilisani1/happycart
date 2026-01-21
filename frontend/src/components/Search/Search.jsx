import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import ShopItems from '../ShopItem/ShopItems';

const Search = () => {
    const { query } = useParams();
    const { products, url, loading } = useContext(StoreContext);

    // Filter products based on search query
    const filteredProducts = useMemo(() => {
        if (!query || !products.length) return [];

        const searchTerm = query.toLowerCase().trim();
        return products.filter((product) => {
            const title = product.title?.toLowerCase() || '';
            const description = product.description?.toLowerCase() || '';
            const category = product.category?.toLowerCase() || '';

            return (
                title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                category.includes(searchTerm)
            );
        });
    }, [query, products]);

    return (
        <div className="shade-parent min-h-screen pt-32 pb-24">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-20 md:mb-14 mb-4">
                <h1 className="md:text-3xl text-xl font-bold mb-2">
                    Search Results
                </h1>
                {query && (
                    <p className="text-gray-400 md:text-base text-sm">
                        {filteredProducts.length > 0
                            ? `Found ${filteredProducts.length} result${filteredProducts.length > 1 ? 's' : ''} for "${query}"`
                            : `No results found for "${query}"`
                        }
                    </p>
                )}
            </div>

            {/* Products Section */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 max-w-screen-2xl rounded-xl px-4 pb-7 pt-5 sm:px-20 mx-auto relative mb-20">
                {loading ? (
                    <div className="col-span-full flex justify-center items-center h-[200px]">
                        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-500 border-solid"></div>
                        <p className='ml-3 text-xl'>Loading...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ShopItems
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            ratings={product.ratings}
                            url={url}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <h2 className="text-lg font-semibold text-gray-500 mb-2">
                            No products found matching your search.
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Try searching with different keywords or browse our shop.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;