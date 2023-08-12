import { useEffect, useState } from 'react';
import Room from '../../../components/Room/Room';
import { getHotelWithRooms } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';
import { Rooms } from './style';

export default function Hotel() {
  const token = useToken();

  const [rooms, setRooms] = useState([]);
  const [roomSelect, setRoomSelect] = useState(0);

  const hotelId = '1';

  useEffect(async() => {
    try {
      const hotelWithRooms = await getHotelWithRooms(token, hotelId);
      setRooms(hotelWithRooms.Rooms); 
    } catch {
      console.log('deu ruim');
    }
  }, []);

  return (
    <>
      <Rooms>
        {rooms.map((room) => {
          return <Room key={room.name} id={room.id} roomSelect={roomSelect} 
            setRoomSelect={setRoomSelect} name={room.name} capacity={room.capacity} token={token}>
          </Room>;
        })}
      </Rooms>
    </>
  );
};
