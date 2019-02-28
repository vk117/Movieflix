package com.cmpe275.movieflix.movieflix.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.cmpe275.movieflix.movieflix.services.UserService;


@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter{

    private final UserService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(UserService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        
    	http.csrf().disable().authorizeRequests()
        .antMatchers(HttpMethod.POST, SecurityConstants.SIGN_UP_URL)
        .permitAll()
        .antMatchers(HttpMethod.POST, SecurityConstants.SIGN_OUT_URL)
        .permitAll()
        .antMatchers(HttpMethod.GET, SecurityConstants.VERIFICATION_EMAIL_URL)
        .permitAll()
        .antMatchers(HttpMethod.POST, SecurityConstants.PASSWORD_RESET_REQUEST_URL)
        .permitAll()
        .antMatchers(HttpMethod.POST, SecurityConstants.PASSWORD_RESET_URL)
        .permitAll()
//        .antMatchers(HttpMethod.POST, SecurityConstants.SESSION_URL)
//        .permitAll()
//        .antMatchers(HttpMethod.OPTIONS, SecurityConstants.SESSION_URL)
//        .permitAll()
        .antMatchers(SecurityConstants.API)
        .permitAll()
        .anyRequest().authenticated().and()
        .addFilter(getAuthenticationFilter())
        .addFilter(new AuthorizationFilter(authenticationManager()))
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        http.headers().frameOptions().disable();
       
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }
    
    protected AuthenticationFilter getAuthenticationFilter() throws Exception {
	    final AuthenticationFilter filter = new AuthenticationFilter(authenticationManager());
	    filter.setFilterProcessesUrl("/login");
	    return filter;
	}
    
}