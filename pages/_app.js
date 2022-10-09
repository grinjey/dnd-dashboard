import '../styles/globals.css';
import '../styles/App.scss';
import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  
  return (

    <SSRProvider>

      <Component {...pageProps} /> 
    
    </SSRProvider> 

  )
    
    
}

export default MyApp;
