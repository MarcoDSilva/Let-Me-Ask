import { Link } from 'react-router-dom'; // Link is used as the traditional anchor <a>

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import {Button} from '../components/Button'
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'

export function NewRoom() {
  // const { user } = useAuth();

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
          <p>Do you want to enter on an existent room? <Link to="/">Click here</Link></p>
        </div>
      </main>
    </div>
  )
}