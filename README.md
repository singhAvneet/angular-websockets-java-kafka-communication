## Stream Kafka messages to an Angular application through Websocket with Spring Boot
Demo application that reads data from [Apache Kafka](https://kafka.apache.org/) and send it to an Angular web application.

### Set up your Kafka topic

```
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3 --topic messages
```

### Start the frontend

```
npm install

npm start
```

Open http://localhost:4200/.

### Start the backend

```
mvn spring-boot:run
```


