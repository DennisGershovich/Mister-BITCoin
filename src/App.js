import { Header } from './pages/Header';
import { Route,Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import routes from './routes';
import { ContactDetailes } from './pages/ContactDetails';
import {EditContact} from './pages/contactEditPage'
import {SignUp} from './pages/SignupPage'
import {userService} from './services/userService.js'
import { bitcoinService } from './services/bitcoinService';
import { HomePage } from './pages/HomePage';

export const AppContext = React.createContext()

function App() {
  const [loggedUser,setLoggedUser] = useState(null)
  const [bitCoinUsdPrice,setBitCoinUsdPrice] = useState(0)

  useEffect(() => {
    setLoggedUser(userService.getUser())
    bitcoinService.getRate().then(price => setBitCoinUsdPrice(price))
  }, [])

  const logOut = () => {
    userService.logOut()
    setLoggedUser(null)
  }
    if(loggedUser){
       return <div className="App">
      <AppContext.Provider value={{logOut,loggedUser,bitCoinUsdPrice}} >
      <Header />
      <Routes>
        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
        <Route path='/Mister-BITCoin'  element={<HomePage />} />
        <Route path='contacts/edit/:id' element={<EditContact />} />
        <Route path="contacts/:id/:idx" element={<ContactDetailes />} />
      </Routes>
      </AppContext.Provider>
        </div>
      }else{
        return <SignUp setUser={setLoggedUser} />
      }
}

export default App;
