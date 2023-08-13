import { toast } from 'react-toastify';
import api from './api';

export async function getHotel(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);
  return response.data;
}

export async function getHotelWithRooms(token, hotelId) {
  const response = await api.get(`/hotels/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getBookingByUserId(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getBookingsByRoomId(token, roomId) {
  const response = await api.get(`/booking/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function postBooking(token, roomId) {
  try {
    await api.post('/booking', { roomId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    toast('Quarto reservado com sucesso');
  } catch (error) {
    toast('Erro ao fazer a reserva do quarto');
  }
};

export async function updateBooking(token, roomId, bookingId) {
  try {
    await api.put(`/booking/${bookingId}`, { roomId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    toast('Quarto reservado com sucesso');
  } catch (error) {
    toast('Erro ao fazer a reserva do quarto');
  }
};
