import fastify from '../index';

describe('fastify', () => {
  it('should returns correct string', async () => {
    console.log(process.env);
    const result = await fastify.inject({
      method: 'GET',
      url: '/hello',
    });
    expect(result.body).toStrictEqual('world');
  });
});
