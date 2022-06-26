import { ApiCard } from "../components/CardList/CardList"

export const addCardAction = (card: ApiCard) => {
    return {
        type: 'ADD_CARD',
        payload: card
    }
}