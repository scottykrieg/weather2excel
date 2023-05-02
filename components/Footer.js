import {
  SiSass,
  SiJavascript,
  SiNextdotjs,
  SiFirebase,
  SiMicrosoftexcel,
} from "react-icons/si";
import styles from "styles/footer.module.sass";

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <h3>Created by Scotty Krieg</h3>
        <h4>Technologies used:</h4>
      </div>
      <div className={styles.iconRow}>
        <SiMicrosoftexcel />
        <SiNextdotjs />
        <SiFirebase />
        <SiJavascript />
        <SiSass />
      </div>
    </>
  );
}
