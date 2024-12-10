import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Nav from "@components/Navbar/nav";
import Head from "next/head";

function getQueryParameters(url) {
    const queryParameters = new URL(url, `${process.env.NEXT_PUBLIC_FRONTEND_URL}`).searchParams;
    const token = queryParameters.get("token");
    return token;
}

export default function Login() {
    const [details, setDetails] = useState({ password: "", confirmPassword: "" });
    const router = useRouter();
    const token = getQueryParameters(router.asPath);


    const resetPass = async () => {
        if (!details.password) {
            toast.error("Please enter a new password");
            return;
        }
        if (!details.confirmPassword) {
            toast.error("Please re-enter your password");
            return;
        }
        if (details.confirmPassword !== details.password) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password/${token}`,
                { password: details.password }
            );
            if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.success("Password updated successfully. Login to continue.");
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
        <Head>
        <title>Reset Your Password - NJATH</title>
      </Head>
            <Nav className="z-50" ></Nav>

            <ToastContainer autoClose={2000} />
            <Image
                src="/assets/treasure_box.svg"
                className={styles.treasurebox}
                width={900.44}
                height={1000}
                alt="Treasure image"
            ></Image>

            <div className={styles.mainContainer}>
                <div
                    className={styles.loginBox}
                    onKeyUp={(event) => {
                        if (event.key == "Enter") resetPass();
                    }}
                >
                    <div className="head_text">Reset Password</div>

                    <div className="flex flex-col justify-end w-full">
                        <input
                            className="form_input w-full"
                            type="password"
                            placeholder="New Password"
                            onChange={(s) => {
                                setDetails({
                                    password: s.target.value,
                                    confirmPassword: details.confirmPassword,
                                });
                            }}
                            required
                        />
                    </div>

                    <div className="flex flex-col justify-end w-full">
                        <input
                            className="form_input w-full"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(s) => {
                                setDetails({
                                    password: details.password,
                                    confirmPassword: s.target.value,
                                });
                            }}
                            required
                        />
                    </div>


                    <button onClick={() => resetPass()} className="black_btn w-full h-12 rounded-sm text-xl">
                        Change password
                    </button>

                </div>
            </div>
        </>
    );
}
