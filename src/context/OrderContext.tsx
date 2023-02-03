import { createContext, useContext, useState } from 'react'

const INITIAL_ORDER = {
  currStageIndex: 0,
  stages: {
    meal: {
      selected: '',
      numOfDiners: undefined,
    },
    restaurant: {
      selected: '',
    },
    dish: {
      selected: '',
      numOfServings: undefined,
    },
  },
}
interface TOrderContext {
  order: typeof INITIAL_ORDER
  setOrder: (order: typeof INITIAL_ORDER | ((form: typeof INITIAL_ORDER) => typeof INITIAL_ORDER)) => void
}
const OrderContext = createContext<TOrderContext>(null!)

export function OrderProvider({ children }: { children: JSX.Element }) {
  const [order, setOrder] = useState(INITIAL_ORDER)
  return <OrderContext.Provider value={{ order, setOrder }}>{children}</OrderContext.Provider>
}

export function useOrder() {
  return useContext(OrderContext)
}
