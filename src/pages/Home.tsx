import { useHistory } from 'react-router-dom'; // let you access the state of the router and perform navigation from inside your components.

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIco from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  // called when btn is clicked to navigate to the new room route
  async function newRoomHandle() {

    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function joinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist!');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

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
          <button onClick={newRoomHandle} className="create-room">
            <img src={googleIco} alt="google logo" />
            Create your room with google
          </button>
          <div className="separator">or enter in another room</div>
          <form onSubmit={joinRoom}>
            <input
              type="text"
              placeholder="Type the room code"
              onChange={e => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Enter room
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}