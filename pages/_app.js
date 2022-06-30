import 'font-awesome/css/font-awesome.min.css';
import '../styles/globals.css'
import '../styles/tailwind.globals.css';
import '../styles/properties.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@fontsource/roboto';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  
  return(
       <Layout>
          <Component {...pageProps} />
       </Layout>

     )
  
}

export default MyApp
