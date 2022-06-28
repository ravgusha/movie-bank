import { createAction } from "@reduxjs/toolkit";
import { ApiCard } from "../components/CardList/CardList";

export const addCardAction = createAction<ApiCard[]>('ADD_CARD');