import Layout from "../components/Layout"

import '../styles/appStyle.css'


import reducer from '../redux/reducer'
import {Provider} from 'react-redux'


import {createStore} from 'redux'
const store = createStore(reducer);


export default function MyApp({Component, pageProps }) {
  return (
    // <CookiesProvider>
    <Provider store = {store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    // </CookiesProvider>
  )
}

