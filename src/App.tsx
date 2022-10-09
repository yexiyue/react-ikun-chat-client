import {Routes,Route} from 'react-router-dom'
import { Layout } from './components/layouts/layout'
import { NeedAuth } from './components/NeedAuth/NeedAuth'
import { HomePage } from './pages/home/home'
import { LoginPage } from './pages/login/login'
import { Chat } from './pages/main/chat/chat'
import { MainPage } from './pages/main/main'
import { Modify } from './pages/main/modify/modify'
import { MyContent } from './pages/main/my/my'
import { RegisterPage } from './pages/register/register'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/main' element={
          <NeedAuth>
            <MainPage></MainPage>
          </NeedAuth>
        }>
          <Route path='chat' element={<Chat></Chat>}></Route>
          <Route path='my' element={<MyContent></MyContent>}></Route>
          <Route path='modify' element={<Modify></Modify>}></Route>
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
