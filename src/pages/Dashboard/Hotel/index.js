import { useEffect } from 'react';
import Room from '../../../components/Room/Room';
import { getHotel } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const token = useToken();

  const hotelId = '1';

  useEffect(async() => {
    try {
      const hotelWithRooms = await getHotel(token);
      console.log(hotelWithRooms);
    } catch {
      console.log('deu ruim');
    }
  }, []);

  return (
    <>
      <div>Opa</div>
      <Room></Room>
    </>
  );
};
