import { React, useEffect, useState } from "react";
import styles from "./tracker.module.css";
import Draggable from "react-draggable";

export default function Tracker() {
    const pos = { x: 0.5, y: 0.5 };
    const [controlledPosition, setPosition] = useState({ x: 0.5, y: 0.5 });

    const saveCursorPosition = function (x, y) {
        pos.x = (x / window.innerWidth).toFixed(3);
        pos.y = (y / window.innerHeight).toFixed(3);
        const trackerElem = document.getElementsByClassName(styles.tracker).item(0);
        if (pos.x > 0.75 || pos.x < 0.25 || pos.y > 0.75 || pos.y < 0.25) {
            trackerElem.classList.add(styles.out);
            trackerElem.classList.remove(styles.in);
        } else if (pos.x > 0.725 || pos.x < 0.275 || pos.y > 0.725 || pos.y < 0.275) {
            trackerElem.classList.remove(styles.out);
            trackerElem.classList.add(styles.in);
        } else {
            trackerElem.classList.remove(styles.in);
            trackerElem.classList.remove(styles.out);
        }

        document.documentElement.style.setProperty("--x", pos.x);
        document.documentElement.style.setProperty("--y", pos.y);
    };

    useEffect(() => {
        document.documentElement.style.setProperty("--x", pos.x);
        document.documentElement.style.setProperty("--y", pos.y);
        document.addEventListener("mousemove", (e) => {
            saveCursorPosition(e.clientX, e.clientY);
        });
    });
    return (
        <>
            {/* Mouse Tracker For Desktop */}
            <div className={styles.tracker + " " + styles.mouse} />
            {/* Draggable Tracker For Touch Devices  */}
            <Draggable
                position={controlledPosition}
                bounds="parent"
                positionOffset={{ x: "calc(25vw - 50px)", y: "25vh" }}
                onDrag={(e, position) => {
                    const { x, y } = position;
                    setPosition({ x, y });
                }}
            >
                <div className={styles.tracker + " " + styles.tracker2 + " " + styles.touch} />
            </Draggable>
            <Draggable position={controlledPosition} positionOffset={{ x: "25vw", y: "25vh" }}>
                <div className={styles.tracker + " " + styles.touch} />
            </Draggable>
        </>
    );
}
