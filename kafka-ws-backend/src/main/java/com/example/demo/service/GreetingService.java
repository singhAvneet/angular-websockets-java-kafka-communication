package com.example.demo.service;

import com.example.demo.model.Model;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

@Service
public class GreetingService {

	public Model greet() {
		StringBuilder sb = new StringBuilder();

		String message = "Have a Good Day";

		sb.append(message).append(" - ").append(generateNumber());


		Model model=new Model();
		model.setMessage(sb.toString());

		return model;
	}

	private String generateNumber() {
		DecimalFormat df2 = new DecimalFormat("#.#");
//		String uuid = UUID.randomUUID().toString();
		double x = (Math.random()*((10-0)+1))+0;
		return df2.format(x);
	}

}
