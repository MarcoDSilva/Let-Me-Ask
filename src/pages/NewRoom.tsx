import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIco from '../assets/images/google-icon.svg'

import {Button} from '../components/Button'
import '../styles/auth.scss'

export function NewRoom() {
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration showing QA" />
        <strong>Create live Q&amp;A Rooms</strong>
        <p>Answer the questions from your viewers</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask logo" />
          <h2>Create a new room</h2>
          <form action="">
            <input
              type="text"
              placeholder="Type the room code"
            />
            <Button type="submit">
              Create room
            </Button>
          </form>
          <p>Do you want to enter on an existent room? <a href="#">Click here</a></p>
        </div>
      </main>
    </div>
  )
}