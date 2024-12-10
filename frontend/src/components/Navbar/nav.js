import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import {signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { setIsLoggedIn, user, isLoggedIn, setUser } = useAuth();
    const [toggleDropDown, setToggleDropDown] = useState(null);
    const logoutApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`;
    const router = useRouter();

    const handleLogout = async () => {
        try {
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            router.push("/login");
            setIsLoggedIn(false);
            setUser(null);
            setToggleDropDown(false);
            toast.success("Logout successful");
        } catch (error) {
            console.log(error);
            console.error("Logout Failed! Something Broke");
        }
    };
    return (
        <>
            <ToastContainer autoClose={2000} />
            <nav className="flex-between w-full  ml-2 pr-8 pt-0.5 gap-2 z-50">
                <Link href="/">
                    <Image
                        src="/assets/icons/typeface_nav.svg"
                        alt="NJATH Logo"
                        width={180}
                        height={50}
                        className="object-contain mx-1 ml-2.5"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="max-lg:hidden flex">
                    {isLoggedIn ? (
                        <div className="flex-end gap-0">
                            <Link href="/levels" className="outline_btn">
                                Levels
                            </Link>

                            <Link href="/leaderBoard" className="outline_btn">
                                Learderboard
                            </Link>
                            <button onClick={handleLogout} className="outline_btn">
                                Log Out ({user ? user.username : ""})
                            </button>
                        </div>
                    ) : (
                        <div className="flex-end gap-3">
                            <Link href="/login" className="outline_btn">
                                Login
                            </Link>
                            <Link href="/register" className="black_btn">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex relative">
                    <div className="flex">
                        <Image
                            src="/assets/icons/pajamas_hamburger.svg"
                            width={37}
                            height={37}
                            className="px-1.5 mx-1 fill-njathgold cursor-pointer"
                            alt="profile"
                            onClick={() => setToggleDropDown((prev) => !prev)}
                        />
                    </div>
                    {isLoggedIn ? (
                        <>
                            {toggleDropDown && (
                                <div className="dropdown mr-3">
                                    <Link
                                        href="/levels"
                                        className="dropdown_link border_outline_btn w-full hover:text-white font-bold"
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Levels{" "}
                                    </Link>

                                    <Link
                                        href="/leaderBoard"
                                        className="dropdown_link border_outline_btn w-full hover:text-white font-bold"
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Leaderboard
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full black_btn hover:bg-njathbg hover:text-white"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="max-lg:hidden flex-center space-x-4">
                                <button type="button" className="border_outline_btn">
                                    <Link href="/login">LOG IN</Link>
                                </button>
                                <button type="button" className="black_btn  ">
                                    <Link href="/register">REGISTER</Link>
                                </button>
                            </div>

                            <div className="lg:hidden flex-center space-x-4">
                                {toggleDropDown && (
                                    <div className="dropdown mr-3 ">
                                        <Link
                                            href="/login"
                                            className="dropdown_link w-full border_outline_btn hover:text-white"
                                            onClick={() => setToggleDropDown(false)}
                                        >
                                            Login{" "}
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="dropdown_link mt-1 w-full black_btn hover:bg-njathbg hover:text-white"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Nav;
