import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

// Crea una nuova opera senza immagini
export const createWork = async (
  request: FastifyRequest<{ Body: { title: string; genre: string; authorId: string | null; links: string[] } }>, 
  reply: FastifyReply
) => {
  const { title, genre, authorId, links } = request.body;

  try {
    const existingWork = await prisma.work.findFirst({ where: { title } });
    if (existingWork) {
      return reply.status(409).send({ error: 'Work with this title already exists.' });
    }

    const work = await prisma.work.create({
      data: { title, genre, authorId, links }
    });

    return reply.status(201).send(work);
  } catch (error) {
    console.error('Failed to create work:', error);
    return reply.status(400).send({ error: 'Failed to create work.' });
  }
};

// Recupera tutte le opere
export const getWorks = async (
  request: FastifyRequest, 
  reply: FastifyReply
) => {
  try {
    const works = await prisma.work.findMany({
      where: { author: { isNot: null } },
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    });

    return reply.status(200).send(works);
  } catch (error) {
    console.error('Error fetching works:', error);
    return reply.status(500).send({ error: 'Failed to fetch works' });
  }
};

// Recupera una specifica opera per ID
export const getWorkById = async (
  request: FastifyRequest<{ Params: { id: string } }>, 
  reply: FastifyReply
) => {
  const { id } = request.params;
  try {
    const work = await prisma.work.findUnique({
      where: { id },
      include: { author: true }
    });

    if (!work) {
      return reply.status(404).send({ error: 'Work not found' });
    }

    return reply.status(200).send(work);
  } catch (error) {
    console.error('Error fetching work:', error);
    return reply.status(500).send({ error: 'Failed to fetch work' });
  }
};

// Aggiorna un'opera per ID senza immagini
export const updateWork = async (
  request: FastifyRequest<{ Params: { id: string }, Body: { title: string; genre: string; authorId: string | null; links: string[] } }>, 
  reply: FastifyReply
) => {
  const { id } = request.params;
  const { title, genre, authorId, links } = request.body;

  try {
    const work = await prisma.work.update({
      where: { id },
      data: { title, genre, authorId, links }
    });

    return reply.status(200).send(work);
  } catch (error) {
    console.error('Failed to update work:', error);
    return reply.status(400).send({ error: 'Failed to update work.' });
  }
};

// Elimina un'opera per ID
export const deleteWork = async (
  request: FastifyRequest<{ Params: { id: string } }>, 
  reply: FastifyReply
) => {
  const { id } = request.params;

  try {
    await prisma.work.delete({
      where: { id }
    });

    return reply.status(204).send();
  } catch (error) {
    console.error('Error deleting work:', error);
    return reply.status(500).send({ error: 'Failed to delete work' });
  }
};
