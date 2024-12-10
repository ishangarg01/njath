"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading/Loading";
import LeveLAccordians from "@components/Level/LevelAccordian";
import Nav from "../components/Navbar/nav";
import { useAuth } from "@context/AuthContext";
import Head from "next/head";

const Levels = () => {
    const [data, setData] = useState(null);
    const { setUser } = useAuth();
    const router = useRouter();
    const participantDataApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/`;

    useEffect(() => {
        const fetchData = async () => {
            const axiosConfig = {
                withCredentials: true,
            };

            try {
                const response = await axios.get(participantDataApi, axiosConfig);

                if (response.status === 200) {
                    setData(response.data.data);
                    setUser(response.data.data);
                } else if (response.status === 400 || response.status === 401) {
                    toast.error("Please Log in First");
                    router.push("/login");
                } else {
                    toast.error("Something Broke! Please refresh");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            toast.error("Please Log in First");
                            router.push("/login");
                        } else {
                            toast.error("Something Broke! Please refresh");
                        }
                    }
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div className="font-montserrat">
            <Head>
        <title>Levels - NJATH</title>
      </Head>
            <ToastContainer autoClose={2000} />
            <Nav />

            <div className="app-background" />
            <div className="flex-start flex-col w-full p-20 max-sm:p-5">
                <div className="max-md:text-sm gap-4 flex-between text-lg font-bold w-full tracking-wide my-4 mt-10">
                    <p>Levels</p>
                    <p className="align-right">
                        Your Score: <span className="text-njathgold">{data ? data.points : "0"}</span>
                    </p>
                </div>
                <div className="flex-start w-full">{data ? <LeveLAccordians levelDetail={data.levelDetail} /> : <Loading />}
                </div>
            </div>
        </div>
    );
};

export default Levels;
