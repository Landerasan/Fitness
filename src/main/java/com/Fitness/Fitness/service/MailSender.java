package com.Fitness.Fitness.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailParseException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailSender {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String username;

    public void send(String emailTo, String subject, String messageText, String fileName){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(username);
            helper.setTo(emailTo);
            helper.setSubject(subject);
            helper.setText(messageText);
            FileSystemResource file = new FileSystemResource(fileName);
            helper.addAttachment(file.getFilename(), file);
        }catch (MessagingException e) {
            throw new MailParseException(e);
        }
        mailSender.send(message);
    }
}
