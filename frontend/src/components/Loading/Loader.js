import styles from "@/styles/slug.module.css";
import styles2 from "@/styles/loader.module.css";
import Image from "next/image";

const Loader=()=>{
    return (
        <div className={styles2.tempbg}>
        <div className="flex-center w-full h-full  fixed">
            <div className="flex-center flex-col gap-10">
            <Image
            src="/assets/images/loading.svg"
            width={80}
            height={32}
            alt="Loading Animation Dots"
            className={styles2.spinner}
           ></Image>
            <Image
            src="/assets/loading_caption.svg"
            width={500}
            height={40}
            alt="Loading Caption"
            className="px-4"
            
           ></Image>
           
           </div>
        </div>
        </div>

    )
};
export default Loader;
