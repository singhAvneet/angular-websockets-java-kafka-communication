package com.example.demo.kafka;

import com.example.demo.Constants;
import com.example.demo.model.Model;
import com.example.demo.service.GreetingService;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.util.UUID;

@Component
@EnableScheduling
public class MessageProducer {

	@Autowired
	private GreetingService greetingService;

	@Autowired
	private KafkaTemplate<String, Model> kafkaTemplate;

	@Scheduled(fixedRate = 1000)
	public void produce() {
		Model model = greetingService.greet();




		this.kafkaTemplate
				.send(Constants.KAFKA_TOPIC, UUID.randomUUID().toString(), model);
	}





}


