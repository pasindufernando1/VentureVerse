package com.ventureverse.server.service;



import com.ventureverse.server.model.entity.Chat;
import com.ventureverse.server.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {


    private final ChatRepository chatRepository;

    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public void saveChat(Chat chat) {
        chatRepository.save(chat);
    }

    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }


    // You can add more methods as needed, such as methods to get chats by sender or receiver, etc.
}
