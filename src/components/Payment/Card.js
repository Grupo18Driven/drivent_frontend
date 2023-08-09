import React, { useEffect, useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import check from '../../assets/images/check-icon.png';
import { getTicketByUserId, paymentTicket } from '../../services/paymentApi';
import { CardContainer, CardForm, ConfirmedContainer, ExpiricyForm, FormDiv, PaymentButton, PaymentContainer, Subtitle, TicketContainer } from '.';
import Input from '../Form/Input';

export default function Card({ ticket, token, modality, hotel, price, confirmed, setConfirmed }) {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  useEffect(async() => {
    try {
      const ticket = await getTicketByUserId(token);
      console.log(ticket);
      if (ticket.status === 'PAID') {
        setConfirmed(true);
      }
    } catch {
      console.log('deu ruim');
    }
  }, []);
  
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    console.log(ticket);
    let body = {
      ticketId: ticket.id,
      cardData: {
        issuer: 'MasterCard',
        number: state.number,
        name: state.name,
        expirationDate: state.expiry,
        cvv: state.cvc
      }
    };
    await paymentTicket(body, token)
      .then(() => {
        setConfirmed(true); 
      });
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <Subtitle>Ingresso escolhido</Subtitle>
      <TicketContainer>
        <p>{modality === 'Online' ? modality : `${modality} + ${hotel}`}</p>
        <span>R$ {price}</span>
      </TicketContainer>
      <Subtitle>Pagamento</Subtitle>
      {(!confirmed ? <PaymentContainer>
        <CardContainer>
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
          <CardForm>
            <FormDiv>
              <Input
                type='number'
                name="number"
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <h3 className="desc">E.g.: 49 ... , 51 ... , 36 ... , 37 ...</h3>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <ExpiricyForm>
                <input
                  type="tel"
                  placeholder="Valid Thru"
                  name="expiry"
                  pattern="\d\d/\d\d"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="number"
                  placeholder="CVC"
                  name="cvc"
                  pattern="\d{3,4}"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </ExpiricyForm>
            </FormDiv>

          </CardForm>
        </CardContainer>
        <PaymentButton
          type="submit"
          onClick={handleSubmit}
          disabled={state.name.length === 0 || state.number.length !== 16 || state.expiry.length !== 5 || state.cvc.length !== 3}
        >
          FINALIZAR PAGAMENTO
        </PaymentButton>
      </PaymentContainer> : '')}

      {(confirmed ? <ConfirmedContainer>
        <img src={check} alt='check' />
        <div>
          <p><span>Pagamento confirmado!</span></p>
          Prossiga para escolha de hospedagem e atividades
        </div>
      </ConfirmedContainer> : <div></div>)}
    </>
  );
}
