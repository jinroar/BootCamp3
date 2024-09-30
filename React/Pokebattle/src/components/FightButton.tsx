

const FightButton = ({
  buttonClick,
  label
}) => {
  return (
    <button className="btn"
      style={{
        color: "yellow",
        fontSize: 24
      }}
      onClick={buttonClick}
    >
      {label}  
    </button>
  )
}

export default FightButton;