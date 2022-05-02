
import {Routes, Route} from "react-router-dom"
import Home from "./Routes/Home/home.component"
import Authentication from "./Routes/authentication/authentication.component"

import Navigation from "./Routes/Navigation/navigation.component"
import Shop from "./Routes/Shop/Shop.component"
import Checkout from "./Routes/Checkout/checkout.component"

function App(){
  return(
    <div>
    <Routes>
      <Route path= "/" element={<Navigation/>}>
        <Route index  element={<Home/>} />
        <Route path="checkout" element={<Checkout/>}></Route>
        <Route path="Shop/*" element={<Shop/>} />
        <Route path="auth" element={<Authentication/>} />
      </Route>
    </Routes>
    </div>
  )
}
export default App