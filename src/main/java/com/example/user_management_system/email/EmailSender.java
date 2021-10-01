package com.example.user_management_system.email;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.Charset;

@Component
@AllArgsConstructor
public class EmailSender {

    @Autowired
    JavaMailSender javaMailSender;

    public MimeMessage createVerificationMessage(String address, String name, String link) throws IOException, MessagingException {
        String body = String.format(StreamUtils.copyToString(new ClassPathResource("templates/verificationEmail.html").getInputStream(), Charset.defaultCharset()), name, link);
        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(address);
        helper.setSubject("Verify your account");
        helper.setText(body, true);
        return msg;
    }

    public MimeMessage createPasswordResetMessage(String address, String link) throws IOException, MessagingException {
        String body = String.format(StreamUtils.copyToString(new ClassPathResource("templates/passwordResetEmail.html").getInputStream(), Charset.defaultCharset()), link);
        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(address);
        helper.setSubject("Reset your password");
        helper.setText(body, true);
        return msg;
    }

    public void send(MimeMessage mimeMessage) throws MailException {
        javaMailSender.send(mimeMessage);
    }

}