import express from 'express';

const app = express();

import {Kafka} from 'kafkajs';

const kafka = new Kafka({
  clientId: 'app node js',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()

const sendProducer = async () => {
  await producer.connect();
  await producer.send({
    topic: 'teste',
    messages: [
      { value: 'pedido 01 foi criado pelo usuário' },
    ],
  })
  
  await producer.disconnect()  
}

app.get('/order', async (req, res) => {
  await sendProducer();

  return res.end('dsad');

})

app.listen(3000, () => {
  console.log('server is running');
});