package com.springbootems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class SpringbootemsApplication {

	public static void main(String[] args) {
		try {
			Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
			dotenv.entries().forEach(e -> {
				if (System.getProperty(e.getKey()) == null && System.getenv(e.getKey()) == null) {
					System.setProperty(e.getKey(), e.getValue());
				}
			});
		} catch (Exception ignored) {
		}

		SpringApplication.run(SpringbootemsApplication.class, args);
	}

}