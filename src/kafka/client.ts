import { Consumer, Producer, Kafka, ProducerRecord } from "kafkajs";

class KafkaClient {
  producer: Producer;
  consumer: Consumer;
  kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: "restaurant-api",
      brokers: ["localhost:19092"],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "api-consumer" });
  }

  public async sendMessage(topic: string, message: string) {
    await this.producer.connect();
    const payload: ProducerRecord = { topic, messages: [{ value: message }] };
    await this.producer.send(payload);
  }

  public async consumeMessage(
    topic: string,
    callback: (message: string | undefined) => void
  ) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        callback(message.value?.toString());
      },
    });
  }
}

export const kafkaClient = new KafkaClient();
