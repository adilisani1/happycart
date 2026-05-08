import React, { useContext, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import ShopItems from '../ShopItem/ShopItems';
import { IoSearchOutline } from 'react-icons/io5';
import { BsGrid3X3Gap, BsList } from 'react-icons/bs';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdOutlineSearchOff } from 'react-icons/md';

const SORT_OPTIONS = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A → Z' },
    { value: 'name-desc', label: 'Name: Z → A' },
];

const POPULAR_SEARCHES = ['shoes', 'watch', 'laptop', 'bag', 'headphones'];

const SkeletonCard = () => (
    <div className="animate-pulse rounded-xl overflow-hidden bg-black-gradient-2">
        <div className="w-full aspect-square bg-gray-700/50" />
        <div className="p-3 space-y-2">
            <div className="h-3 bg-gray-700/50 rounded w-3/4" />
            <div className="h-3 bg-gray-700/50 rounded w-1/2" />
        </div>
    </div>
);

const Search = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const { products, url, loading } = useContext(StoreContext);

    const [searchInput, setSearchInput] = useState(query || '');
    const [sortBy, setSortBy] = useState('relevant');
    const [viewMode, setViewMode] = useState('grid');
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const val = searchInput.trim();
        if (val) navigate(`/search/${val}`);
    };

    const filteredProducts = useMemo(() => {
        if (!query || !products.length) return [];
        const term = query.toLowerCase().trim();
        const results = products.filter((p) => {
            const title = p.title?.toLowerCase() || '';
            const description = p.description?.toLowerCase() || '';
            const category = p.category?.toLowerCase() || '';
            return title.includes(term) || description.includes(term) || category.includes(term);
        });

        switch (sortBy) {
            case 'price-asc':
                return [...results].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            case 'price-desc':
                return [...results].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            case 'name-asc':
                return [...results].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
            case 'name-desc':
                return [...results].sort((a, b) => (b.title || '').localeCompare(a.title || ''));
            default:
                return results;
        }
    }, [query, products, sortBy]);

    const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label;

    return (
        <div className="shade-parent min-h-screen pt-28 pb-24">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-20">

                {/* ── Search Bar ── */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 mb-8 shadow-lg"
                >
                    <IoSearchOutline className="text-gray-400 text-xl shrink-0" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search products, categories…"
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm md:text-base"
                    />
                    <button
                        type="submit"
                        className="bg-blue-gradient hover:bg-light-gradient text-white text-sm font-medium px-5 py-2 rounded-xl transition-all"
                    >
                        Search
                    </button>
                </form>

                {/* ── Results Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="md:text-2xl text-lg font-bold text-white">
                            {query
                                ? `Results for "${query}"`
                                : 'Search Results'}
                        </h1>
                        {!loading && (
                            <p className="text-gray-400 text-sm mt-0.5">
                                {filteredProducts.length > 0
                                    ? `${filteredProducts.length} product${filteredProducts.length > 1 ? 's' : ''} found`
                                    : 'No products found'}
                            </p>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Sort */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSortDropdown((p) => !p)}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-2 rounded-xl transition-all"
                            >
                                <HiOutlineAdjustmentsHorizontal className="text-base" />
                                <span className="hidden sm:inline">{currentSortLabel}</span>
                                <span className="sm:hidden">Sort</span>
                            </button>
                            {showSortDropdown && (
                                <div className="absolute right-0 mt-2 bg-[#1a1333] border border-white/20 rounded-xl shadow-2xl z-50 min-w-[190px] overflow-hidden">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt.value ? 'bg-blue-gradient text-white' : 'text-gray-300 hover:bg-white/10'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center border border-white/20 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-gradient text-white' : 'text-gray-400 hover:bg-white/10'}`}
                                title="Grid view"
                            >
                                <BsGrid3X3Gap className="text-base" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-gradient text-white' : 'text-gray-400 hover:bg-white/10'}`}
                                title="List view"
                            >
                                <BsList className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Products Section ── */}
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-20">
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
                            {filteredProducts.map((product) => (
                                <ShopItems
                                    key={product._id}
                                    id={product._id}
                                    title={product.title}
                                    image={product.image}
                                    price={product.price}
                                    ratings={product.ratings}
                                    url={url}
                                />
                            ))}
                        </div>
                    ) : (
                        /* List View */
                        <div className="flex flex-col gap-4 mb-20">
                            {filteredProducts.map((product) => (
                                <Link
                                    to={`/products/${product._id}`}
                                    key={product._id}
                                    className="flex items-center gap-4 bg-black-gradient-2 rounded-xl p-4 hover:bg-white/5 border border-white/10 transition-all"
                                >
                                    <img
                                        src={`${url}/images/${product.image}`}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-lg shrink-0"
                                        onError={(e) => { e.target.src = '/assets/images/placeholder.png'; }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-medium truncate">{product.title}</h3>
                                        <p className="text-gray-400 text-sm mt-0.5 line-clamp-1">{product.description}</p>
                                        <p className="text-price-color font-semibold mt-1">${product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <MdOutlineSearchOff className="text-7xl text-gray-600 mb-4" />
                        <h2 className="text-xl font-semibold text-gray-300 mb-2">
                            No results for &ldquo;{query}&rdquo;
                        </h2>
                        <p className="text-gray-500 text-sm mb-8 max-w-sm">
                            Try different keywords, check your spelling, or browse our popular searches below.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mb-10">
                            {POPULAR_SEARCHES.map((term) => (
                                <button
                                    key={term}
                                    onClick={() => navigate(`/search/${term}`)}
                                    className="px-4 py-2 rounded-full border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all capitalize"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                        <Link
                            to="/shop"
                            className="bg-blue-gradient hover:bg-light-gradient text-white px-8 py-3 rounded-xl font-medium transition-all"
                        >
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
