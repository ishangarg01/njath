import React, { useState } from "react";
import styles from "@/styles/question.module.css";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


export default function CheckAnswer({ level, order }) {
    const [answer, setAnswer] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [hintModalOpen, setHintModalOpen] = useState(false);
    const [hintDisplayModalOpen, setHintDisplayModalOpen] = useState(false);
    const [hintText, setHintText] = useState("");


    const handleCheckAnswer = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenHintModal = () => {
        setHintModalOpen(true);
    };

    const handleCloseHintModal = () => {
        setHintModalOpen(false);
    };

    const handleOpenHintDisplayModal = () => {
        setHintDisplayModalOpen(true);
    };

    const handleCloseHintDisplayModal = () => {
        setHintDisplayModalOpen(false);
    };

    const getHint = async (level, order) => {
        const axiosConfig = {
            withCredentials: true,
        };

        const data = {
            level: level,
            order: order,
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/get-hint`, data, axiosConfig);
            if (response.status === 200) {
                return response.data.data.hint;
            } else {
                throw new Error("Failed to get hint");
            }
        } catch (error) {
            throw error;
        }
    };

    const handleGetHint = async () => {
        const axiosConfig = {
            withCredentials: true,
        };

        const data = {
            level: level,
            order: order
        }

        try {
            const hint = await getHint(level, order);
            setHintText(hint);
            handleCloseHintModal();
            handleOpenHintDisplayModal();
        } catch (error) {
            console.log(error);
            toast.error("Something broke, Failed to get hint");
        }

        handleCloseHintModal();
    };

    const handleSubmitAnswer = async () => {

        const data = {
            level: level,
            order: order,
            answer: answer,
        };

        const axiosConfig = {
            withCredentials: true,
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/participant/check-answer`, data, axiosConfig);
            if (response.status === 200) {
                if (response.data.success)
                    toast.success(response.data.message);
                else
                    toast.error(response.data.message);
            } else {
                toast.error("Failed to submit the answer");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something broke, Failed to submit the answer");
        }

        handleCloseModal();
    };

    return (
        <>
            <ToastContainer autoClose={2000} />
            <div className={styles.ansBox}>
                <input
                    className={styles.ansText}
                    placeholder="Type Your Answer Here"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <div>
                    <button className={styles.hint} onClick={handleOpenHintModal}>
                        <div className={styles.CheckContent}>
                            <Image src="/assets/Bulb.svg" width={18} height={18} />
                            <div>Hint</div>
                        </div>
                    </button>
                </div>
                <div>
                    <button className={styles.Check} onClick={handleCheckAnswer}>
                        <div className={styles.CheckContent}>
                            <Image src="/assets/Check.svg" width={18} height={18} />
                            <div>Check Answer</div>
                        </div>
                    </button>
                </div>

                <Modal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="confirm-submission"
                    aria-describedby="are-you-sure"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "#111A23",
                            border: "2px solid goldenyellow",
                            borderRadius: "8px",
                            p: 4,
                            width: 350,
                            textAlign: "center",
                            color: "white",
                        }}
                    >
                        <h2>Confirm Submission</h2>
                        <p>Are you sure you want to submit the answer?</p>
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleCloseModal}
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "1px solid goldenyellow",
                                    margin: "5px",
                                }}
                            >
                                No
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmitAnswer}
                                style={{
                                    backgroundColor: "green",
                                    color: "white",
                                    border: "1px solid goldenyellow",
                                    margin: "5px",
                                }}
                            >
                                Yes
                            </Button>
                        </div>
                    </Box>
                </Modal>

                {/* Hint Modal */}
                <Modal
                    open={hintModalOpen}
                    onClose={handleCloseHintModal}
                    aria-labelledby="hint-modal"
                    aria-describedby="get-hint"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "#111A23",
                            border: "2px solid goldenyellow",
                            borderRadius: "8px",
                            p: 4,
                            width: 350,
                            textAlign: "center",
                            color: "white",
                        }}
                    >
                        <p>Are you sure you want the hint</p>
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleCloseHintModal}
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "1px solid goldenyellow",
                                    margin: "5px",
                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleGetHint}
                                style={{
                                    backgroundColor: "green",
                                    color: "white",
                                    border: "1px solid goldenyellow",
                                    margin: "5px",
                                }}
                            >
                                Get Hint
                            </Button>
                        </div>
                    </Box>
                </Modal>

                {/* Hint Display Modal */}
                <Modal
                    open={hintDisplayModalOpen}
                    onClose={handleCloseHintDisplayModal}
                    aria-labelledby="hint-display-modal"
                    aria-describedby="display-hint"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "#111A23",
                            border: "2px solid goldenyellow",
                            borderRadius: "8px",
                            p: 4,
                            width: 350,
                            textAlign: "center",
                            color: "white",
                        }}
                    >
                        <h2>Hint</h2>
                        <p>{hintText}</p>
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleCloseHintDisplayModal}
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "1px solid goldenyellow",
                                    margin: "5px",
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
