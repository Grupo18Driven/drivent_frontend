import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import { Icons, RoomCard } from '.';
import { useEffect, useState } from 'react';
import { getBookingsByRoomId } from '../../services/hotelApi';

export default function Room({ token, id, name, capacity, roomSelect, 
  setRoomSelect, choosenRoomId, rooms }) {
  const [bookings, setBookings] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(async() => {
    try {
      setLoading(false);
      const bookings = await getBookingsByRoomId(token, id);
      if (bookings.length === capacity && choosenRoomId !== id) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
      setBookings(bookings);
    } catch (err) {
      console.log(err);
    }
    setLoading(true);
  }, [rooms]);

  function handleRoom() {
    if(disabled) {
      console.log('nada');
    } else {
      setRoomSelect(Number(id));
    }
  };

  return (
    <>
      {loading ?
        <RoomCard disabled={disabled} onClick={handleRoom}
          selected={roomSelect === id}
        >
          <p>{name}</p>
          <Icons>
            {
              Array.from({ length: capacity }, (_, index) => {
                const reversedIndex = capacity - 1 - index;
                if ((bookings[reversedIndex] && choosenRoomId !== id) || 
                (bookings[reversedIndex] && reversedIndex < bookings.length-1)) {
                  return <IoPerson></IoPerson>;
                } else if ((roomSelect === id && reversedIndex === bookings.length)
                  || (choosenRoomId === id && roomSelect === id)) {
                  return <IoPerson style={{ color: '#ff4791' }}></IoPerson>;
                } else {
                  return <IoPersonOutline></IoPersonOutline>;
                }
              })
            }
          </Icons>
        </RoomCard>
        :
        <></>
      }
    </>
  );
};
