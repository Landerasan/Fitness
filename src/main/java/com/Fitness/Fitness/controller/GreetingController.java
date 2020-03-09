package com.Fitness.Fitness.controller;

import com.Fitness.Fitness.service.MailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;


@Controller
public class GreetingController {
    @Autowired
    private MailSender mailSender;

    @GetMapping
    public String main(Model model) {
        return ("main");
    }

    @GetMapping("/nutrition")
    public String nutrition(Model model) {
        return "nutrition";
    }

    @GetMapping("/nutrition/{poster}")
    public String poster1(@PathVariable String poster,  Model model) {
        return poster;
    }

    @PostMapping
    public String add(@RequestParam String label, Model model){
        if(label != "")
        {
            mailSender.send(label,"Тема","Текст","/home/landerasan/1.pdf");
        }
        return "main";
    }

    @PostMapping("/verification")
    public String proverka(
            @RequestParam(name="notification_type", required = false) String notification_type,
            @RequestParam(name="operation_id",required = false) String operation_id,
            @RequestParam(name="amount",required = false) String amount,
            @RequestParam(name="withdraw_amount",required = false) String withdraw_amount,
            @RequestParam(name="datetime",required = false) String datetime,
            @RequestParam(name="sender",required = false) String sender,
            @RequestParam(name="codepro",required = false) String codepro,
            @RequestParam(name="label",required = false) String label,
            @RequestParam(name="sha1_hash",required = false) String sha1_hash,
            @RequestParam(name="unaccepted",required = false) String unaccepted,
            Model model){
        model.addAttribute("notification_type",notification_type);
        model.addAttribute("operation_id",operation_id);
        model.addAttribute("amount",amount);
        model.addAttribute("withdraw_amount",withdraw_amount);
        model.addAttribute("datetime",datetime);
        model.addAttribute("sender",sender);
        model.addAttribute("codepro",codepro);
        model.addAttribute("label",label);
        model.addAttribute("sha1_hash",sha1_hash);
        model.addAttribute("unaccepted",unaccepted);
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter("asd.txt",true));
            String str = notification_type + " " + operation_id + " " + amount + " " + withdraw_amount + " " + datetime + " " + sender + " " + codepro + " " + label + " " + sha1_hash + " " + unaccepted + "\n";
            writer.write(str);
            writer.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        if(label != "")
        {
            mailSender.send(label,"Тема","Текст","/home/landerasan/1.pdf");
        }
        return "verification";
        }

    }