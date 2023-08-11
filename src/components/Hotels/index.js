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
  width: 864px;
  height: 600px;
  font-family: Roboto;
  font-style: normal;
`;

export const Title = styled.h1`
  color: #000;
  font-size: 34px;
`;

export const AllHotelContainer = styled.div`
  width: 620px;
  height: 264px; 
  margin-top: 20px;

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
