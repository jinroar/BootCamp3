const ProgressBar = (props) => {
    let { bgcolor, completed, hp } = props;
  
if(completed<(hp/8)){
    bgcolor=`##d5a6bd`;
}
if(completed<(hp/2)){
    bgcolor=`#eda612`;
}
if(completed<30){
    bgcolor=`#ff0000`;
}

    const containerStyles = {
      height: 20,
      width: 90,
      borderRadius: 50,

    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
      transition: 'width 1s ease-in-out',
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{completed}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;