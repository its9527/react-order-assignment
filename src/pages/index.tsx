import { OrderProvider } from '../context/OrderContext'
import Order from './Order'

export default function Pages() {
  return (
    <OrderProvider>
      <Order />
    </OrderProvider>
  )
}
