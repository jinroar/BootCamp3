const PinkButton = ({
  buttonClick,
  label
}) => {
  return (
    <button className="center bg-blend-color-burnble-gum hover:bg-poke-yellow  text-purple font-bold py-2 px-4 rounded"
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

