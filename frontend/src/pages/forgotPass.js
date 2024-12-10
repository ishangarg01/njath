import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@components/Navbar/nav";
import Head from "next/head";
export default function Login() {
    const [details, setDetails] = useState({ email: "", phone: "" });
    const router = useRouter();

    const changePass = async () => {
        if (!details.email) {
            toast.error("Please enter your email address");
            return;
        }
        if (details.phone.length !== 10) {
            toast.error("Please enter a valid phone number");
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forget-password`,
                details
            );
            if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.info(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
        <Head>
        <title>Find Your Account - NJATH</title>
      </Head>
            <Nav className="z-50"></Nav>
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
                        if (event.key == "Enter") changePass();
                    }}
                >
                    <div className="head_text">Find your Account</div>

                    <div className="flex flex-col justify-end w-full">
                        <input
                            className="form_input w-full"
                            type="email"
                            placeholder="Email"
                            onChange={(s) => {
                                setDetails({ email: s.target.value, phone: details.phone });
                            }}
                            required
                        />
                    </div>

                    <div className="flex flex-col justify-end w-full">
                        <input
                            className="form_input w-full"
                            type="phone"
                            placeholder="Mobile Number"
                            onChange={(s) => {
                                setDetails({ email: details.email, phone: s.target.value });
                            }}
                            required
                        />
                    </div>

                    <button
                        onClick={() => changePass()}
                        className="black_btn w-full h-12 rounded-sm text-xl"
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </>
    );
}
