import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import QuestionList from "@components/QuestionList/QuestionList";
import Loading from "@components/Loading/Loading";
import Image from "next/image";

const Level = ({ unlocked, level }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const router = useRouter();
    const handleAccordionChange = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };
    const solved = 1;
    const tempcolor = unlocked ? "rgba(253, 204, 6, 1)" : "#FFFFFF8C";
    const customStyles = {
        // '--background-color': '#111A23',
        "--font-color": tempcolor,
        "--disabled-opacity": !unlocked || solved ? 0.5 : 1,
        // "--border":
    };

    const [data, setData] = useState(null);
    const levelDetailApi = `${process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/participant/get-level-details?level=${level + 1}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(levelDetailApi, { credentials: "include" });
                const data = await response.json();
                if (response.status === 200) {
                    setData(data.data);
                } else if (response.status === 401) {
                    console.log(response.data.message);
                    router.push("/login");
                } else {
                    console.error(`Failed to fetch data. Status: ${response.status}`);
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (unlocked === 1 && isAccordionOpen) {
            fetchData();
        }
    }, [isAccordionOpen, levelDetailApi, unlocked]);

    return (
        <div style={customStyles} className="font-montserrat">
            <Accordion
                disabled={!unlocked}
                onChange={handleAccordionChange}
                sx={{
                    backgroundColor: "#00000000",
                    borderColor: "#FDCC0699",
                    border: 0,
                    borderWidth: "0.25rem",
                }}
            >
                <AccordionSummary>
                    <div className="py-0 flex-between w-full self-start">
                        <Typography
                            style={{
                                color: "var(--font-color)",
                                fontFamily: "Montserrat",
                                fontWeight: "bold",
                                fontSize: "0.85em",
                                letterSpacing: "1px",
                            }}
                        >
                            Level {level + 1}
                        </Typography>

                        {unlocked ? null : (
                            <Image
                                src="/assets/Locked-Dimmed.svg"
                                alt="Check Icon"
                                width={28}
                                height={28}
                            />
                        )}
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    {data ? (
                        <QuestionList question={data.question} level={level + 1} />
                    ) : (
                        <Loading />
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Level;
