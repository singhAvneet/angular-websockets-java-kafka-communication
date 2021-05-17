package com.example.demo.kafka;

import com.fasterxml.jackson.core.JsonFactory;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.example.demo.Constants;
import com.example.demo.model.Model;

import java.util.concurrent.*;
import java.util.stream.IntStream;

@Component
public class Listener {

	private static final Logger LOG = LoggerFactory.getLogger(Listener.class);

	@Autowired
	private SimpMessagingTemplate webSocket;

	@KafkaListener(topics = Constants.KAFKA_TOPIC)
	public void processMessage(ConsumerRecord<String, Model> cr, @Payload Model content) {
//		IntStream.range(0, 1)
//				.peek(i -> this.waitFor(3))
//				.mapToObj(i -> content)
//				.forEach(this::sendToWc);
		this.webSocket.convertAndSend("/topic/component",content);

	}


		private void sendToWc(Model content){
			this.webSocket.convertAndSend("/topic/component",content);
		}

	private void waitFor(int seconds) {
		ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
		Future<Void> future = scheduler.schedule(() -> null, seconds, TimeUnit.SECONDS);
		try {
			future.get();
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
	}
}
