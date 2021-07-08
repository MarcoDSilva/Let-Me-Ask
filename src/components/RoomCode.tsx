import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

function copyRoomCodeToClipBoard() {

}

export function RoomCode() {
  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Room #1234567</span>
    </button>
  )
}