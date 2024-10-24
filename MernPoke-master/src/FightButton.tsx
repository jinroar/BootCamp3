//Anchor Page
//components/MyButton.js

// const MyButton = ({ to }) => {

//   return (
//       <a href={`/${to}`}>
//           <button className="my-button">
//               Take me to {to === '' ? "home" : to}
//           </button>
//       </a>
//   )
// }

// export default MyButton;

//Link
//components/MyButton.js

import { Link } from "react-router-dom";

const MyButton = ({ to }) => {

    return (
        <Link to={`/${to}`}>
            <button className="my-button">
                Take me to {to === '' ? "home" : to}
            </button>
        </Link>
    )
}

export default MyButton;


//useNavigate
//components/MyButton.js

// import { useNavigate } from "react-router-dom";

// const MyButton = ({ to }) => {

//     const navigate = useNavigate();

//     return (
//         <button className="my-button" onClick={() => 
//             { navigate(`/${to}`) }}>
//             Take me to {to === '' ? "home" : to}
//         </button>
//     )
// }

// export default MyButton;