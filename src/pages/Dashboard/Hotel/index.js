import { useEffect, useState } from 'react';
import { StyledContainer, Title, Description, AllHotelContainer, HotelContainer } from '../../../components/Hotels';
import useToken from '../../../hooks/useToken';
import { getHotel } from '../../../services/hotelApi';

export default function Hotel() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  useEffect(async() => {
    try {
      const result = await getHotel(token);
      setHotels(result);
      console.log(result);
    } catch(err) {
      console.log(err.data);}
  }, []);

  const [selectedDiv, setSelectedDiv] = useState(null);

  const handleClick = (divId) => {
    if (selectedDiv === divId) return setSelectedDiv(null);
    setSelectedDiv(divId);
  };

  return (
    <>
      <StyledContainer>
        <Title>Escolha de hotel e quarto</Title>
        <Description>Primeiro, escolha seu hotel</Description>
        <AllHotelContainer>
          {hotels.map(hotel => {
            return(
              <HotelContainer key = {hotel.id} selected={selectedDiv === 1} onClick={() => handleClick(1)}>
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
      </StyledContainer>
    </>
  );
}
