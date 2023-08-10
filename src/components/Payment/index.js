import styled from 'styled-components';
import Input from '../Form/Input';

export const UnRegisted = styled.div`
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

export const Description = styled.h2`
  color: #8E8E8E;
  font-size: 20px;
  margin-top: 20px;
  span{
      font-weight: 700;
  }
`;

export const OptionsContainer = styled.div`
  margin-top: 17px;
  margin-bottom: 35px;
  width: 314px;
  height: 144px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const OptionCard = styled.div`
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  div{
      color: #454545;
      font-size: 16px;
  }
  h2{
      color: #898989;
      font-size: 14px;
  }
  :hover{
  cursor: pointer;
  }
`;

export const Subtitle = styled.h2`
  color: #8e8e8e;
  font-size: 20px;
`;

export const TicketContainer = styled.div`
  background-color: #ffeed2;
  height: 108px;
  width: 290px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 15px;
  gap: 4px;
  p {
    color: #454545;
    font-size: 16px;
  }
  span {
    color: #898989;
    font-size: 14px;
  }
`;

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

export const CardForm = styled.form`
  display: flex;
  gap: 15px;
  transition: all 0.3s;
  align-items: center;
  width: 80%;
`;

export const InputStyled = styled(Input)`
  div {
    height: 40px;
  }
  label {
    transform: translate(14px, 13px) scale(1);
  }
`;

export const FormDiv = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  h3 {
    color: #8e8e8e;
    font-size: 14px;
  }
`;

export const ExpiricyForm = styled.div`
  display: flex;
  gap: 10px;
`;

export const PaymentButton = styled.button`
  margin-top: 30px;
  color: black;
  font-size: 14px;
  border: none;
  box-shadow: 0px 3px 5px rgb(34 35 58 / 20%);
  width: 182px;
  height: 37px;
  border-radius: 4px;
  font-weight: 500;
  :hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    filter: ${props => props.disabled ? '' : 'brightness(80%)'};
  }
`;

export const ConfirmedContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: black;
  }
  span {
    font-weight: 600;
  }
`;
