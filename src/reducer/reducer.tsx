import { CartItem } from '../interfaces/CartItemModel';
import { Actions } from '../actions/actions';
import { ACTION_NAME } from '../actions/action-name';

export const cartReducer = ( state: CartItem[], action: Actions ): CartItem[] => {
  
  const { INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_FROM_CART } = ACTION_NAME;

  switch (action.type) {

    case INCREASE_QUANTITY:
      const actionId = action.payload;
      if ( state.find( item => item.id === actionId ) == null) {
        return [ ...state, { id: actionId, quantity: 1 }]
      } else {
        return state.map( item => {
          if ( item.id === actionId ) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }

    case DECREASE_QUANTITY:
      const id = action.payload;
      if ( state.find( item => item.id === id )?.quantity === 1) {
        return state.filter( item => item.id !== id )
      } else {
        return state.map( item => {
          if ( item.id === id ) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }

    case REMOVE_FROM_CART:
      return state.filter( item => item.id !== action.payload );
   
    default:
      return state;
  }
}