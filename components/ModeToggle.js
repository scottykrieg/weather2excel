import PropTypes from "prop-types";
import styles from "@/styles/toggle.module.sass";

function ModeToggle({ mode, handleModeToggle }) {
  return (
    <div className={styles.button}>
      <button className="mode-toggle" onClick={handleModeToggle}>
        {mode === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
}

ModeToggle.propTypes = {
  mode: PropTypes.string.isRequired,
  handleModeToggle: PropTypes.func.isRequired,
};

export default ModeToggle;
