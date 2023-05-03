import PropTypes from "prop-types";

function ModeToggle({ mode, handleModeToggle }) {
  return (
    <button className="mode-toggle" onClick={handleModeToggle}>
      {mode === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}

ModeToggle.propTypes = {
  mode: PropTypes.string.isRequired,
  handleModeToggle: PropTypes.func.isRequired,
};

export default ModeToggle;
