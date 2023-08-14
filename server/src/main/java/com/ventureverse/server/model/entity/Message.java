package com.ventureverse.server.model.entity;


import com.ventureverse.server.enumeration.Status;

public class Message {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Status status;

    public Message() {
    }

    public Message(final String senderName, final String receiverName, final String message, final String date, final Status status) {
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.message = message;
        this.date = date;
        this.status = status;
    }

    public String getSenderName() {
        return this.senderName;
    }

    public String getReceiverName() {
        return this.receiverName;
    }

    public String getMessage() {
        return this.message;
    }

    public String getDate() {
        return this.date;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setSenderName(final String senderName) {
        this.senderName = senderName;
    }

    public void setReceiverName(final String receiverName) {
        this.receiverName = receiverName;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public void setDate(final String date) {
        this.date = date;
    }

    public void setStatus(final Status status) {
        this.status = status;
    }

    public String toString() {
        String var10000 = this.getSenderName();
        return "Message(senderName=" + var10000 + ", receiverName=" + this.getReceiverName() + ", message=" + this.getMessage() + ", date=" + this.getDate() + ", status=" + this.getStatus() + ")";
    }
}

