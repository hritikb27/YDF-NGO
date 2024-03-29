import '../styles/globals.css'
import '../styles/pagination.scss'
import { Provider } from 'react-redux';
import store from '../app/store';

function MyApp({ Component, pageProps }) {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
