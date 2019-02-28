package com.cmpe275.movieflix.movieflix.aop;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.cmpe275.movieflix.movieflix.model.UserEntity;

@Aspect
@Configuration
public class UserAspect {

	@Around("execution(* com.cmpe275.movieflix.movieflix.controllers.UserController.saveAdmin(..))")
	public void validate(ProceedingJoinPoint joinPoint) throws Throwable {
		
		UserEntity user = (UserEntity) joinPoint.getArgs()[0];

		String expression = "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@sjsu\\.edu$";
		Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(user.getEmail());
		//boolean matches = user.getEmail().matches(expression);
		if(!matcher.find()) {
			throw new ForbiddenException();
		}
		else {
			 joinPoint.proceed();
		}
	
	}

}


@ResponseStatus(HttpStatus.FORBIDDEN)
class ForbiddenException extends RuntimeException {}
