import { notFoundError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getAllHotels(userId: number) {
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentExists) {
    throw notFoundError();
  }

  const ticketExists = await ticketRepository.findTicketByEnrollmentId(enrollmentExists.id);
  if (!ticketExists) {
    throw notFoundError();
  }

  const ticketType = ticketExists.TicketType;

  if (ticketType.isRemote === true || ticketType.includesHotel === false || ticketExists.status === 'RESERVED') {
    throw paymentRequiredError();
  }

  const hotels = await hotelRepository.findAllHotels();

  if (!hotels) {
    throw notFoundError();
  }

  return hotels;
}

async function getHotelRooms(userId: number, hotelId: number) {
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentExists) {
    throw notFoundError();
  }

  const ticketExists = await ticketRepository.findTicketByEnrollmentId(enrollmentExists.id);
  if (!ticketExists) {
    throw notFoundError();
  }

  const ticketType = ticketExists.TicketType;

  if (ticketType.isRemote === true || ticketType.includesHotel === false || ticketExists.status === 'RESERVED') {
    throw paymentRequiredError();
  }

  const hotelsRooms = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotelsRooms) {
    throw notFoundError();
  }

  return hotelsRooms;
}

const hotelsService = {
  getAllHotels,
  getHotelRooms,
};

export default hotelsService;
