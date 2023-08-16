package com.ventureverse.server.model.normal;

import com.ventureverse.server.enumeration.Chat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PayLoadDTO {

    public String sender;
    public String receiver;
    public String message;
    public String time;
    public Chat type;

}
