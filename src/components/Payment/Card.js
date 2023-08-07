import React, { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import check from '../../assets/images/check-icon.png';
import { paymentTicket } from '../../services/paymentApi';
import { CardContainer, CardForm, ConfirmedContainer, ExpiricyForm, FormDiv, PaymentButton, PaymentContainer, Subtitle, TicketContainer } from '.';

export default function Card(props) {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const [confirmed, setConfirmed] = useState(false);
  
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    let body = {
      ticketId: props.ticket.id,
      cardData: {
        issuer: 'MasterCard',
        number: state.number,
        name: state.name,
        expirationDate: state.expiry,
        cvv: state.cvc
      }
    };
    await paymentTicket(body, props.token)
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
        <p>{props.modality === 'Online' ? props.modality : `${props.modality} + ${props.hotel}`}</p>
        <span>R$ {props.price}</span>
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
              <input
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
