import Level from "./level";
import styles from "@styles/levels.module.css";
export default function LeveLAccordians({ levelDetail }) {

    return (
        <div className="font-montserrat flex gap-4 items-stretch flex-col w-full">
            {levelDetail.map((element, index) => {
                const borderColor = element ? "#FDCC0699" : "#FFFFFF8C";
                const textColor = element ? "#FDCC0699" : "#FFFFFF8C";
                const styles = {
                    // margin: "30px",
                    // marginLeft: "80px",
                    // marginRight: "80px",
                    border: "2px solid",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    color: `${textColor}`,
                    borderRadius: "8px",
                    overflow: "auto",
                    borderColor: `${borderColor}`,
                };
                return (
                    <div style={styles} key={index}>
                        <Level unlocked={element} level={index} />
                    </div>
                );
            })}
        </div>
    );
}
