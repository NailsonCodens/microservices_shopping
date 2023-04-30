import express from 'express';
import { connect } from 'http2';
import {Kafka} from 'kafkajs';


const kafka = new Kafka({
  clientId: 'my-app-notification',
  brokers: ['localhost:9092'],
});

const app = express();


const consumer = async () => {
  const consumer = kafka.consumer({groupId: 'test'});

  await consumer.connect();

  await consumer.subscribe({ topic: 'teste'})

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value?.toString(),
      })
    },
  })
}


consumer();


app.get('/notification', (req, res) => {
  return res.end('ok');
});

app.listen(3001, () => {
  console.log('app notication is on');
});