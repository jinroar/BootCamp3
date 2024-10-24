import react from '@vitejs/plugin-react'

import withMT from "@material-tailwind/react/utils/withMT";

// https://vitejs.dev/config/
export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    {
      name: 'mongoose',
      configureWebpack: (config) => {
        config.externals = {
          mongoose: 'commonjs2 mongoose',
        };
      },
    }, react()],
})


