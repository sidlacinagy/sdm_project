package com.example.controllers.requests;

import lombok.Getter;


@Getter
public class ModifyWatchLaterRequest {

    String action;
    String movie_id;


    /*public enum Action{
        ADD, REMOVE, GET_LIST
    }*/
}
