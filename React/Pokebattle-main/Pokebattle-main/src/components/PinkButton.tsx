const PinkButton = ({ 
  buttonClick,
  label
}) => {
  return (
    <button data-testid="fight-button"  className="btn-grad"
      style={{
        color: "white",
        fontSize: 24
      }}
      onClick={buttonClick}
    >
      {label}  
    </button>

  )
}
export default PinkButton;

