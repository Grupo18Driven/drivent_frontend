import { useEffect, useState } from 'react';
import Room from '../../../components/Room/Room';
import { getBookingByUserId, getBookingsByRoomId, getHotel, getHotelWithRooms, postBooking, updateBooking } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';
import { AllHotelContainer, Description, HotelContainer, Rooms, StyledContainer, Title, TitleRoom } from './style';
import Button from '../../../components/Form/Button';

export default function Hotel() {
  const token = useToken();

  const [rooms, setRooms] = useState([]);
  const [roomSelect, setRoomSelect] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelSumary, setHotelSumary] = useState(false);
  const [bookingInformation, setBookingInformation] = useState({
    nameHotel: '',
    imageHotel: '',
    nameRoom: '',
    typeRoom: '',
    bookedPeople: '', 
    roomId: '',
  });
  const [changingRoom, setChangingRoom] = useState(false);

  useEffect(async() => {
    try {
      const result = await getHotel(token);
      setHotels(result);
      const selectRoomExists = await listSelectRoom(result);
      if (selectRoomExists) setHotelSumary(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function listSelectRoom(resultHotels) {
    try {
      const result = await getBookingByUserId(token);
      const bookings = await getBookingsByRoomId(token, result.Room.id);
      let resultTypeRoom = '';
      let resultBookedPeople = '';
      if (result.Room.capacity === 1) {
        resultTypeRoom = 'Single';
      } else if (result.Room.capacity === 2) {
        resultTypeRoom = 'Double';
      } else {
        resultTypeRoom = 'Triple';
      }
      if (bookings.length > 1) {
        resultBookedPeople = `e mais ${bookings.length-1}`;
      }
      const resultBookingInformation = {
        nameHotel: resultHotels[result.Room.hotelId-1].name,
        imageHotel: resultHotels[result.Room.hotelId-1].image,
        nameRoom: result.Room.name,
        typeRoom: resultTypeRoom,
        bookedPeople: resultBookedPeople,
        roomId: result.Room.id,
        hotelId: result.Room.hotelId,
      };
      setBookingInformation(resultBookingInformation);
      return resultBookingInformation;
    } catch (err) {
      console.log(err);
    }
  }

  function chooseHotel(divId) {
    if (selectedHotel === divId) return setSelectedHotel(null);
    setSelectedHotel(divId);
    listRooms(divId);
  };

  async function listRooms(hotelId) {
    try {
      const hotelWithRooms = await getHotelWithRooms(token, hotelId);
      setRooms(hotelWithRooms.Rooms); 
    } catch (err) {
      console.log(err);
    }
  }

  async function bookRoom() {
    await postBooking(token, roomSelect);
    listSelectRoom(hotels);
    setHotelSumary(true);
  }

  async function changeRoom() {
    const result = await listSelectRoom(hotels);
    setHotelSumary(false);
    setSelectedHotel(result.hotelId);
    listRooms(result.hotelId);
    setRoomSelect(result.roomId);
    setChangingRoom(true);
  }

  async function changeBooking() {
    await updateBooking(token, roomSelect, bookingInformation.roomId);
    setHotelSumary(true);
  }

  return (
    <>
      <StyledContainer>
        <Title>Escolha de hotel e quarto</Title>
        {!hotelSumary &&
          <>
            <Description>Primeiro, escolha seu hotel</Description>
            <AllHotelContainer>
              {hotels.map((hotel, index) => {
                return(
                  <HotelContainer key = {hotel.id} selected={selectedHotel === index+1} onClick={() => chooseHotel(index+1)}>
                    <div>
                      <img src={hotel.image}></img>
                      <h1>{hotel.name}</h1>
                      <h2>Tipos de acomodação:</h2>
                      <h3>Single e Double</h3>
                      <h2>Vagas disponiveis:</h2>
                      <h3>103</h3>
                    </div>
                  </HotelContainer>
                ); 
              })}
            </AllHotelContainer>
            {selectedHotel !== null && 
            <>
              <Description>Ótima pedida! Agora escolha seu quarto</Description>
              <Rooms>
                {rooms.map((room) => {
                  return <Room key={room.name} id={room.id} roomSelect={roomSelect} 
                    choosenRoomId={bookingInformation.roomId} setRoomSelect={setRoomSelect} 
                    name={room.name} capacity={room.capacity} token={token}
                    setBookingInformation={setBookingInformation} rooms={rooms}>
                  </Room>;
                })}
              </Rooms>
              {!changingRoom ? 
                <Button disabled={roomSelect === 0} onClick={bookRoom}>RESERVAR QUARTO</Button>
                :
                <Button onClick={changeBooking}>TROCAR DE QUARTO</Button>
              }
            </>
            }
          </>
        }
        {
          (hotelSumary ?
            <>
              <Description>Você já escolheu seu quarto:</Description>
              <AllHotelContainer>
                <HotelContainer selected={true}>
                  <div>
                    <img src={bookingInformation.imageHotel}></img>
                    <h1>{bookingInformation.nameHotel}</h1>
                    <h2>Quarto Reservado:</h2>
                    <h3>{bookingInformation.nameRoom} ({bookingInformation.typeRoom})</h3>
                    <h2>Pessoas no seu quarto:</h2>
                    <h3>Você {bookingInformation.bookedPeople}</h3>
                  </div>
                </HotelContainer>
              </AllHotelContainer>
              <Button style={{ margin: 20 }} onClick={changeRoom}>TROCAR DE QUARTO</Button>
            </>
            :
            <></>
          )
        }
      </StyledContainer>
    </>
  );
};
