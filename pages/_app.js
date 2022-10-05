import '../styles/globals.css';
import '../styles/App.scss';
import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withRouter(MyApp)
