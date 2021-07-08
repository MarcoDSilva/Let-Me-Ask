import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';

export const Room = () => {
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeas" />
          <RoomCode />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>React Room</h1>
          <span>4 Questions</span>
        </div>

        <form action="">
          <textarea
            placeholder="What do you want to ask?"
          />
          <div className="form-footer">
            <span><button>Login</button> to ask a question</span>
            <Button type="submit">Send Question</Button>
          </div>
        </form>
      </main>
    </div>
  )
}