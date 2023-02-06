import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { options } from 'joi';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.business(),
    },
  });
}

export async function createHotelRooms(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId,
    },
  });
}
