const request = require('supertest');
const { sequelize, Message } = require('../models');

// Mock app import sem iniciar o servidor
let app;
beforeAll(async () => {
  app = require('../index');
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Messages API', () => {
  beforeEach(async () => {
    await Message.destroy({ where: {}, truncate: true });
  });

  describe('POST /messages', () => {
    it('should create a user message and system response', async () => {
      const res = await request(app)
        .post('/messages')
        .send({ content: 'Olá' })
        .expect(201);

      expect(res.body).toHaveProperty('userMessage');
      expect(res.body).toHaveProperty('systemMessage');
      expect(res.body.userMessage.content).toBe('Olá');
      expect(res.body.userMessage.owner).toBe('User');
      expect(res.body.systemMessage.owner).toBe('System');
      expect(res.body.systemMessage.content).toMatch(/recebida/i);
    });

    it('should return 400 if content is empty', async () => {
      const res = await request(app)
        .post('/messages')
        .send({ content: '' })
        .expect(400);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Content is required');
    });

    it('should return 400 if content is missing', async () => {
      const res = await request(app)
        .post('/messages')
        .send({})
        .expect(400);

      expect(res.body).toHaveProperty('error');
    });

    it('should trim content whitespace', async () => {
      const res = await request(app)
        .post('/messages')
        .send({ content: '  Olá  ' })
        .expect(201);

      expect(res.body.userMessage.content).toBe('Olá');
    });
  });

  describe('GET /messages', () => {
    it('should return empty array when no messages', async () => {
      const res = await request(app)
        .get('/messages')
        .expect(200);

      expect(res.body).toEqual([]);
    });

    it('should return all messages in chronological order', async () => {
      // Create messages directly
      await Message.create({ content: 'First', owner: 'User' });
      await Message.create({ content: 'Second', owner: 'System' });
      await Message.create({ content: 'Third', owner: 'User' });

      const res = await request(app)
        .get('/messages')
        .expect(200);

      expect(res.body).toHaveLength(3);
      expect(res.body[0].content).toBe('First');
      expect(res.body[1].content).toBe('Second');
      expect(res.body[2].content).toBe('Third');
    });

    it('should include message metadata (id, owner, timestamps)', async () => {
      await Message.create({ content: 'Test', owner: 'User' });

      const res = await request(app)
        .get('/messages')
        .expect(200);

      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('content');
      expect(res.body[0]).toHaveProperty('owner');
      expect(res.body[0]).toHaveProperty('createdAt');
      expect(res.body[0]).toHaveProperty('updatedAt');
    });
  });
});

