"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Montserrat } from "next/font/google";
import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QuestionList({ question, level }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenConfirmationModal = (link) => {
        const confirmation = window.confirm(
            "Are you sure you want to unlock this question? This will deduct 10 points."
        );

        if (confirmation) {
            window.location.href = link; // Redirect to the link
        } else {
            // The user clicked "Cancel"
            toast.error("Unlock canceled.");
        }
    };

    return (
        <>
            {question.map(({ type, title }, index) => {
                let borderColor, icon, titleColor;

                if (type === 0) {
                    borderColor = "#FFFFFF99";
                    icon = (
                        <Image
                            src="/assets/Locked-Dimmed.svg"
                            alt="Check Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "#FFFFFF99";
                } else if (type === 1 || type === 2) {
                    borderColor = "#FDCC06";

                    icon = (
                        <Image
                            src="/assets/Property 1=Unlocked Icon.svg"
                            alt="Hint Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "white";
                } else {
                    borderColor = "#FDCC0699";
                    icon = (
                        <Image
                            src="/assets/Property 1=SolvedGOld.svg"
                            alt="Lock Icon"
                            width={24}
                            height={24}
                        />
                    );
                    titleColor = "white";
                }

                const link = type === 0 ? "" : `/question?level=${level}&order=${index + 1}`;
                const divStyle = {
                    display: "flex",
                    alignItems: "center", // Align items vertically in the center
                    padding: "8px",
                    margin: "30px",
                    border: `2px solid ${borderColor}`,
                    borderRadius: "8px",
                };

                const titleStyle = {
                    fontSize: "0.85em",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    letterSpacing: "1px",
                    color: `${titleColor}`,
                };

                return (
                    <>
                        <ToastContainer autoClose={2000} />
                        <div key={index} style={divStyle}>
                            <div>{icon}</div>
                            <div className="ml-4">
                                {" "}
                                <div style={titleStyle}>
                                    <Link href={link}>{title}</Link>
                                </div>
                            </div>
                            <div className="ml-auto">
                                {" "}
                                {type === 0 && (
                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            handleOpenConfirmationModal(
                                                `/question?safe=${1}&level=${Number(level)}&order=${
                                                    index + 1
                                                }`
                                            )
                                        }
                                        style={{
                                            opacity: 0.8,
                                            color: "#FDCC06",
                                            fontWeight: "bold",
                                            backgroundColor: "#1D2D3E",
                                            fontFamily: "Montserrat",
                                        }}
                                    >
                                        Unlock
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                );
            })}
        </>
    );
}
