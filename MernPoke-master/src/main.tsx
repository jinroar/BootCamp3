import { createRoot } from 'react-dom/client'
import './index.css'
//import PokeReact from './PokeReact'
import Try from './Try'
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Try />
  </ThemeProvider>,
)
