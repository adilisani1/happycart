import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {
    FiUser, FiMail, FiCalendar, FiEdit2, FiLogOut,
    FiShoppingBag, FiShoppingCart, FiHome, FiCheck, FiX
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const StatCard = ({ icon, label, value, color }) => (
    <div className="flex flex-col items-center justify-center gap-2 bg-black-gradient-2 border border-white/10 rounded-2xl p-5">
        <span className={`text-2xl ${color}`}>{icon}</span>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-gray-400 text-sm">{label}</p>
    </div>
);

const QuickLink = ({ to, icon, label, description, external }) => {
    const Wrapper = external ? 'a' : Link;
    const props = external ? { href: to, target: '_blank', rel: 'noreferrer' } : { to };
    return (
        <Wrapper
            {...props}
            className="flex items-center gap-4 bg-black-gradient-2 border border-white/10 rounded-2xl p-4 hover:bg-white/5 hover:border-primary-color/50 transition-all group"
        >
            <span className="text-xl text-primary-color group-hover:scale-110 transition-transform">{icon}</span>
            <div>
                <p className="text-white font-medium text-sm">{label}</p>
                <p className="text-gray-500 text-xs">{description}</p>
            </div>
        </Wrapper>
    );
};

const Profile = () => {
    const navigate = useNavigate();
    const { token, setToken, userData, setUserData, fetchUserProfile, url, cartItems } = useContext(StoreContext);

    const [orderCount, setOrderCount] = useState(0);
    const [pageLoading, setPageLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState('');
    const [savingName, setSavingName] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        const init = async () => {
            setPageLoading(true);
            if (!userData) await fetchUserProfile(token);
            try {
                const res = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
                setOrderCount(res.data.data?.length || 0);
            } catch {
                setOrderCount(0);
            }
            setPageLoading(false);
        };
        init();
    }, [token]);

    useEffect(() => {
        if (userData) setEditName(userData.name || '');
    }, [userData]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUserData(null);
        navigate('/');
    };

    const handleSaveName = async () => {
        if (!editName.trim()) return;
        setSavingName(true);
        try {
            await axios.patch(`${url}/api/user/update-name`, { name: editName.trim() }, { headers: { token } });
            setUserData((prev) => ({ ...prev, name: editName.trim() }));
            setEditMode(false);
            toast.success('Name updated successfully!');
        } catch {
            toast.error('Failed to update name.');
        } finally {
            setSavingName(false);
        }
    };

    const cartCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    const initial = userData?.name?.[0]?.toUpperCase() || 'U';

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-500 border-solid" />
                    <p className="text-gray-400 text-sm">Loading profile…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-screen-lg mx-auto">

            {/* ── Back link ── */}
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
                <FiHome className="text-base" /> Back to Home
            </Link>

            {/* ── Profile Card ── */}
            <div className="bg-black-gradient-2 border border-white/10 rounded-3xl p-6 md:p-10 mb-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                    {/* Avatar */}
                    <div className="relative shrink-0">
                        {imgError || !userData ? (
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-blue-gradient flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                                {initial}
                            </div>
                        ) : (
                            <img
                                src='/assets/images/profile_image.png'
                                alt="Profile"
                                onError={() => setImgError(true)}
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-lg border-2 border-white/20"
                            />
                        )}
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#00040F]" title="Online" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                        {/* Name + edit */}
                        {editMode ? (
                            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="bg-white/10 border border-white/30 rounded-lg px-3 py-1.5 text-white text-lg font-bold outline-none focus:border-primary-color"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSaveName}
                                    disabled={savingName}
                                    className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 disabled:opacity-50 transition-colors"
                                    title="Save"
                                >
                                    <FiCheck />
                                </button>
                                <button
                                    onClick={() => { setEditMode(false); setEditName(userData?.name || ''); }}
                                    className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                    title="Cancel"
                                >
                                    <FiX />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    {userData?.name || 'User'}
                                </h1>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                    title="Edit name"
                                >
                                    <FiEdit2 className="text-sm" />
                                </button>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 mt-3">
                            <span className="inline-flex items-center gap-1.5 text-gray-400 text-sm">
                                <FiMail className="text-primary-color" />
                                {userData?.email || '—'}
                            </span>
                            {userData?.createdAt && (
                                <span className="inline-flex items-center gap-1.5 text-gray-400 text-sm">
                                    <FiCalendar className="text-primary-color" />
                                    Member since {formatDate(userData.createdAt)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Logout button (top-right on desktop) */}
                    <button
                        onClick={handleLogout}
                        className="hidden sm:flex items-center gap-2 text-sm text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 px-4 py-2 rounded-xl transition-all"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <StatCard
                    icon={<FiShoppingBag />}
                    label="Total Orders"
                    value={orderCount}
                    color="text-indigo-400"
                />
                <StatCard
                    icon={<FiShoppingCart />}
                    label="Cart Items"
                    value={cartCount}
                    color="text-emerald-400"
                />
                <StatCard
                    icon={<FiUser />}
                    label="Account"
                    value="Active"
                    color="text-violet-400"
                />
            </div>

            {/* ── Quick Links ── */}
            <div className="bg-black-gradient-2 border border-white/10 rounded-3xl p-6 md:p-8 mb-6">
                <h2 className="text-white font-semibold text-lg mb-4">Quick Links</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <QuickLink
                        to="/myorders"
                        icon={<FiShoppingBag />}
                        label="My Orders"
                        description="Track and manage your orders"
                    />
                    <QuickLink
                        to="/cart"
                        icon={<FiShoppingCart />}
                        label="My Cart"
                        description={`${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart`}
                    />
                    <QuickLink
                        to="/shop"
                        icon={<FiHome />}
                        label="Shop"
                        description="Browse all products"
                    />
                    <QuickLink
                        to="/contact"
                        icon={<FiMail />}
                        label="Contact Support"
                        description="Get help from our team"
                    />
                </div>
            </div>

            {/* ── Logout (mobile) ── */}
            <button
                onClick={handleLogout}
                className="sm:hidden w-full flex items-center justify-center gap-2 text-sm text-red-400 border border-red-500/30 px-4 py-3 rounded-2xl transition-all hover:bg-red-500/10"
            >
                <FiLogOut /> Sign Out
            </button>
        </div>
    );
};

export default Profile;
