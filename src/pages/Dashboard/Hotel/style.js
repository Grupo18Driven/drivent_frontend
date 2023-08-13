import styled from 'styled-components';

export const Description = styled.h2`
color: #8E8E8E;
font-size: 20px;
margin-top: 20px;

span{
    font-weight: 700;
}

`;

export const StyledContainer = styled.div`
  width: 100%;
  height: 600px;
  font-family: Roboto;
  font-style: normal;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b5b5b5;
  }
`;

export const Title = styled.h1`
  color: #000;
  font-size: 34px;
`;

export const Unauthorized = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 388px;
  height: 46px;

  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-size: 20px;
  color: #8E8E8E;
`;

export const AllHotelContainer = styled.div`
  width: 620px;
  height: 264px; 
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;

export const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;

  background-color: ${props => (props.selected ? '#ffeed2' : '#ebebeb')};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 168px;
    height: 235px;

    img {
      width: 168px;
      height: 109px;
      border-radius: 10px;

      margin-bottom: 7px;
    }
}

  h1 {
    font-size: 20px;
    color: #343434;
    font-weight: 700;
    margin-bottom: 14px;
  }

  h2 {
    font-size: 12px;
    color: #3c3c3c;
    font-weight: 700;
    margin-bottom: 4px;
  }

  h3 {
    font-size: 12px;
    color: #3c3c3c;
    font-weight: 400;
    margin-bottom: 17px;
  }
`;

export const Rooms = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;
`;
