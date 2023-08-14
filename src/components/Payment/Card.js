import React, { useEffect, useState } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Cards from 'react-credit-cards-2';
import check from '../../assets/images/check-icon.png';
import { getTicketByUserId, paymentTicket } from '../../services/paymentApi';
import { CardContainer, CardForm, ConfirmedContainer, ExpiricyForm, FormDiv, InputStyled, PaymentContainer, Subtitle, TicketContainer } from '.';
import Button from '../Form/Button';

export default function Card({ ticket, token, modality, hotel, price, confirmed, setConfirmed }) {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  // eslint-disable-next-line
  useEffect(async () => {
    try {
      const ticket = await getTicketByUserId(token);
      if (ticket.status === 'PAID') {
        setConfirmed(true);
      }
    } catch {

    }
  }, []);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
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
              <InputStyled
                type='number'
                name="number"
                label="Número de Cartão"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <h3 className="desc">E.g.: 49 ... , 51 ... , 36 ... , 37 ...</h3>
              <InputStyled
                type="text"
                label="Nome"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <ExpiricyForm>
                <InputStyled
                  type="tel"
                  label="Válido Até"
                  name="expiry"
                  pattern="\d\d/\d\d"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <InputStyled
                  type="number"
                  label="CVC"
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
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={state.name.length === 0 || state.number.length !== 16 || state.expiry.length !== 5 || state.cvc.length !== 3}
          style={{ width: 200 }}
        >
          FINALIZAR PAGAMENTO
        </Button>
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
