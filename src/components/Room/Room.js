import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import { Icons, RoomCard } from '.';
import { useEffect, useState } from 'react';
import { getBookingsByRoomId } from '../../services/hotelApi';

export default function Room({ token, id, name, capacity, roomSelect, setRoomSelect }) {
  const [bookings, setBookings] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(async() => {
    try {
      const bookings = await getBookingsByRoomId(token, id);
      if (bookings.length === capacity) {
        setDisabled(true);
      }
      setBookings(bookings);
      console.log(roomSelect);
    } catch (err) {
      console.log(err);
    }
  }, []);

  function handleRoom() {
    if(disabled) {
      console.log('nada');
    } else {
      setRoomSelect(Number(id));
    }
  };

  return (
    <>
      <RoomCard disabled={disabled} onClick={handleRoom}
        selected={roomSelect === id}
      >
        <p>{name}</p>
        <Icons>
          {
            Array.from({ length: capacity }, (_, index) => {
              const reversedIndex = capacity - 1 - index;
              if (bookings[reversedIndex]) {
                return <IoPerson></IoPerson>;
              } else if (roomSelect === id && reversedIndex === bookings.length) {
                return <IoPerson style={{ color: '#ff4791' }}></IoPerson>;
              } else {
                return <IoPersonOutline></IoPersonOutline>;
              }
            })
          }
        </Icons>
      </RoomCard>
    </>
  );
};
