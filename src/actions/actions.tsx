export enum ACTION_NAME {
  INCREASE_QUANTITY = 'increase-quantity',
  DECREASE_QUANTITY = 'decrease-quantity',
  REMOVE_FROM_CART = 'remove-from-cart',
}

const { INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_FROM_CART } = ACTION_NAME;

export type Actions = 
  | { type: typeof INCREASE_QUANTITY; payload: number }
  | { type: typeof DECREASE_QUANTITY; payload: number }
  | { type: typeof REMOVE_FROM_CART; payload: number }