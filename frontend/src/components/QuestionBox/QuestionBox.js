import styles from "@/styles/question.module.css";
import Image from "next/image";
import CheckAnswer from "./CheckAnswer";
import Link from "next/link";

function QuestionBox({ imageUrl, title, description, order, level }) {
    // console.log(props);
    console.log(imageUrl);
    console.log(title);
    console.log(description);
    return (
        <>
            {/* <Modal open={open} handleClose={handleClose} /> */}
            <div className={styles.mainContainer}>
                
                <div className={styles.scoreBox}>
                <Link href="/levels">
                    <img src="https://github.com/melencholicmice/Reverberance2022/assets/93900332/cff984a5-3fb5-40d5-97b2-970a0d8f5af5"
                        
                    ></img></Link>
                    <div className={styles.qNo}>
                    
                        L{level} Q{order} :- {title}
                    </div>

                </div>
                <div className={styles.questionDiv}>
                    <div className={styles.descrpBox}>
                        <p>{description}</p>
                    </div>

                    {
                        imageUrl ? (<img className={styles.queimg}
                            src={imageUrl}>
                        </img>) : (<></>)
                    }


                </div>
                <CheckAnswer
                    level={level}
                    order={order}
                />
            </div>
        </>
    );
}
export default QuestionBox;
