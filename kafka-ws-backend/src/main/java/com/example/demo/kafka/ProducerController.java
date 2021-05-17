package com.example.demo.kafka;

import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Constants;
import com.example.demo.model.Model;

/**
 * Generate sample messages.
 *
 * Use: GET /kafla/sample/{amount}.
 */
@RestController
@RequestMapping(value = "/api/kafka")
public class ProducerController {

	private static final Logger LOG = LoggerFactory.getLogger(ProducerController.class);

	private ProducerCallback producerCallback = new ProducerCallback();

	@Autowired
	private KafkaTemplate<String, Model> kafkaTemplate;

	@RequestMapping(value = "/sample", method = RequestMethod.POST)
	public void generateMessages(@RequestBody Model model) {
		System.out.println(model.toString());
		sendToKafka(model);
	}

	private void sendToKafka(Model model) {
		this.kafkaTemplate
			.send(Constants.KAFKA_TOPIC, UUID.randomUUID().toString(), model)
			.addCallback(this.producerCallback);
	}

	class ProducerCallback implements ListenableFutureCallback<SendResult<String, Model>> {
		@Override
		public void onSuccess(SendResult<String, Model> result) {
			RecordMetadata record = result.getRecordMetadata();
			LOG.info("Sending {} to topic {} - partition {}",
					result.getProducerRecord().key(),
					result.getProducerRecord().topic(),
					record.partition());
		}

		@Override
		public void onFailure(Throwable ex) {
			LOG.error("Producer Failure", ex);
		}
	}

}
