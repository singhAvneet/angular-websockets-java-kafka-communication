package com.example.demo.model;

public class Model {

	private String message;
	private String destination;



	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	@Override
	public String toString() {
		return String.format("Model [message=%s]", message + " "+destination);
	}

}
