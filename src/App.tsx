import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store'
import { Layout } from './components/layout/layout'
import { HomePage } from './pages/homePage.tsx'
import { ContactPage } from './pages/contactPage.tsx'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
