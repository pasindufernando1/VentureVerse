package com.ventureverse.server.controller;




import com.ventureverse.server.model.entity.Chat;
import com.ventureverse.server.model.entity.Message;
import com.ventureverse.server.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Controller

public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public ChatController(ChatService chatService, SimpMessagingTemplate simpMessagingTemplate) {
        this.chatService = chatService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message) {
        // Retrieve sender and receiver IDs based on their usernames (you might need a service)
        int senderId = retrieveUserIdByUsername(message.getSenderName());
        int receiverId = retrieveUserIdByUsername(message.getReceiverName());

        Chat chat = new Chat();
        chat.setSenderId(senderId);
        chat.setReceiverId(receiverId);
        chat.setMessage(message.getMessage());
        chat.setTime(String.valueOf(LocalDateTime.now()));
        chat.setDate(String.valueOf(LocalDate.now()));

        chatService.saveChat(chat);

        return message;
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message) {
        // Retrieve sender and receiver IDs based on their usernames (you might need a service)
        int senderId = retrieveUserIdByUsername(message.getSenderName());
        int receiverId = retrieveUserIdByUsername(message.getReceiverName());

        Chat chat = new Chat();
        chat.setSenderId(senderId);
        chat.setReceiverId(receiverId);
        chat.setMessage(message.getMessage());
        chat.setTime(String.valueOf(LocalDateTime.now()));
        chat.setDate(String.valueOf(LocalDate.now()));

        chatService.saveChat(chat);

        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        return message;
    }

    // Implement this method to retrieve user IDs based on usernames
    private int retrieveUserIdByUsername(String username) {
        // You'll need to implement this based on your application's logic
        return 0; // Placeholder value, replace with actual retrieval logic
    }
}
