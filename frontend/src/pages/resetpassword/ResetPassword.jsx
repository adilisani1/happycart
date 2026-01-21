import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import './resetpassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { url } = useContext(StoreContext);
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const isValidPassword = (password) => {
        const passwordRegex = /^[A-Z][A-Za-z\d@$!%*?&]{5,}$/;
        return passwordRegex.test(password);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "newPassword") {
            if (!isValidPassword(value)) {
                setPasswordError("Password must start with a capital letter & include at least 1 special character.");
            } else {
                setPasswordError("");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.email) {
            toast.error("Please enter your email address");
            return;
        }

        if (!isValidPassword(data.newPassword)) {
            toast.error("Password must start with a capital letter and include at least one special character.");
            return;
        }

        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${url}/api/user/reset-password`, {
                email: data.email,
                newPassword: data.newPassword,
            });

            if (response.data.success) {
                toast.success("Password reset successfully! You can now login.");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error(response.data.message || "Failed to reset password");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page pt-32 pb-20 min-h-screen">
            <div className="max-w-md mx-auto px-4">
                <div className="bg-black-gradient rounded-xl p-8 shadow-2xl border border-gray-800">
                    <h2 className="text-3xl font-bold mb-2 text-white text-center">
                        Reset Password
                    </h2>
                    <p className="text-gray-400 text-sm text-center mb-6">
                        Enter your new password below
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-300 text-sm font-medium mb-2"
                            >
                                Email Address <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={data.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className="w-full border border-gray-600 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none bg-gray-900/50 focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="newPassword"
                                className="block text-gray-300 text-sm font-medium mb-2"
                            >
                                New Password <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                required
                                value={data.newPassword}
                                onChange={handleInputChange}
                                placeholder="Enter new password"
                                className="w-full border border-gray-600 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none bg-gray-900/50 focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all"
                            />
                            {passwordError && (
                                <p className="text-red-400 text-xs mt-1">{passwordError}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">
                                Must start with a capital & include 1 special character.
                            </p>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-300 text-sm font-medium mb-2"
                            >
                                Confirm Password <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                                value={data.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm new password"
                                className="w-full border border-gray-600 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none bg-gray-900/50 focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all"
                            />
                            {data.confirmPassword && data.newPassword !== data.confirmPassword && (
                                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-gradient hover:bg-light-gradient text-white py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    <p className="text-gray-500 text-sm text-center mt-6">
                        Remember your password?{" "}
                        <span
                            className="text-primary-color cursor-pointer hover:underline font-medium"
                            onClick={() => navigate('/')}
                        >
                            Back to Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
