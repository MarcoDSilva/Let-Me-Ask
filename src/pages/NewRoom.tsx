import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Link is used as the traditional anchor <a>

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/auth.scss'

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    // if the name of the room to be created is empty we finish the click
    if (newRoom.trim() === '') {
      return;
    }

    // getting the reference from the firebase bd
    const roomReference = database.ref('rooms');

    // adding the new room to the bd
    const firebaseRoom = await roomReference.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);

    setNewRoom('');
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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Type the room name"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
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