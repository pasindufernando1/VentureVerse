package com.ventureverse.server.controller;

import com.ventureverse.server.model.normal.PayLoadDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    public PayLoadDTO sendMessage(@Payload PayLoadDTO payLoadDTO) {
        simpMessagingTemplate.convertAndSendToUser(payLoadDTO.getReceiver(), "/private", payLoadDTO);
        return payLoadDTO;
    }

}
