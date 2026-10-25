import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {
    FiUser, FiMail, FiCalendar, FiEdit2, FiLogOut,
    FiShoppingBag, FiShoppingCart, FiHome, FiCheck, FiX
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const DefaultAvatar = ({ name, email, size = 112 }) => {
    const displayName = name || email;
    const initials = displayName
        ? displayName.split(/[\s@]/).map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : 'HC';
    const colors = ['#FF5C35','#0D7377','#E84A24','#2A9D8F','#F4A261'];
    const color = colors[(displayName?.charCodeAt(0) || 0) % colors.length];
    return (
        <svg width={size} height={size} viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="rounded-full shadow-lg border-2 border-white">
            <circle cx="56" cy="56" r="56" fill={color} />
            <text x="56" y="56" dominantBaseline="central" textAnchor="middle"
                fill="white" fontSize={initials.length > 1 ? '30' : '36'} fontWeight="700"
                fontFamily="Syne, sans-serif">
                {initials}
            </text>
        </svg>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="flex flex-col items-center justify-center gap-2 bg-mist border border-white/10 rounded-lg p-5 shadow-sm">
        <span className={`text-2xl ${color}`}>{icon}</span>
        <p className="text-2xl font-bold text-ink">{value}</p>
        <p className="text-muted text-sm">{label}</p>
    </div>
);

const QuickLink = ({ to, icon, label, description, external }) => {
    const Wrapper = external ? 'a' : Link;
    const props = external ? { href: to, target: '_blank', rel: 'noreferrer' } : { to };
    return (
        <Wrapper
            {...props}
            className="flex items-center gap-4 bg-mist border border-white/10 rounded-lg p-4 hover:border-coral/40 transition-all group shadow-sm"
        >
            <span className="text-xl text-coral group-hover:scale-110 transition-transform">{icon}</span>
            <div>
                <p className="text-ink font-medium text-sm">{label}</p>
                <p className="text-muted text-xs">{description}</p>
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
            await fetchUserProfile(token);
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
        <div className="min-h-screen lg:pt-20 pb-20 px-4 sm:px-8 max-w-screen-lg mx-auto">

            {/* -- Back link -- */}
            <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-ink text-sm mb-8 transition-colors">
                <FiHome className="text-base" /> Back to Home
            </Link>

            {/* -- Profile Card -- */}
            <div className="bg-mist border border-white/10 rounded-xl p-6 md:p-10 mb-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <DefaultAvatar name={userData?.name} email={userData?.email} size={112} />
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" title="Online" />
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
                                    className="bg-mist border border-white/15 rounded-lg px-3 py-1.5 text-ink text-lg font-bold outline-none focus:border-coral"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSaveName}
                                    disabled={savingName}
                                    className="p-1.5 rounded-lg bg-green-500/20 text-green-700 hover:bg-green-500/30 disabled:opacity-50 transition-colors"
                                    title="Save"
                                >
                                    <FiCheck />
                                </button>
                                <button
                                    onClick={() => { setEditMode(false); setEditName(userData?.name || ''); }}
                                    className="p-1.5 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30 transition-colors"
                                    title="Cancel"
                                >
                                    <FiX />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-ink font-display">
                                    {userData?.name || 'User'}
                                </h1>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-white/5 transition-colors"
                                    title="Edit name"
                                >
                                    <FiEdit2 className="text-sm" />
                                </button>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 mt-3">
                            <span className="inline-flex items-center gap-1.5 text-muted text-sm">
                                <FiMail className="text-coral" />
                                {userData?.email || '—'}
                            </span>
                            {userData?.createdAt && (
                                <span className="inline-flex items-center gap-1.5 text-muted text-sm">
                                    <FiCalendar className="text-coral" />
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

            {/* -- Stats Row -- */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <StatCard
                    icon={<FiShoppingBag />}
                    label="Total Orders"
                    value={orderCount}
                    color="text-coral"
                />
                <StatCard
                    icon={<FiShoppingCart />}
                    label="Cart Items"
                    value={cartCount}
                    color="text-teal"
                />
                <StatCard
                    icon={<FiUser />}
                    label="Account"
                    value="Active"
                    color="text-coral"
                />
            </div>

            {/* -- Quick Links -- */}
            <div className="bg-mist border border-white/10 rounded-xl p-6 md:p-8 mb-6 shadow-sm">
                <h2 className="text-ink font-semibold text-lg mb-4 font-display">Quick Links</h2>
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

            {/* -- Logout (mobile) -- */}
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
