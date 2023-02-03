import { lazy, startTransition, Suspense, useState } from 'react'
import produce from 'immer'
import { useOrder } from '../context/OrderContext'
import Meal from '../components/Meal'
import Stepper from '../components/Stepper'

const orderForms = [
  // lazy(() => import('../components/Meal')),
  // 为了避免 lazy load 被 suspense 捕获, 第一个组件不进行代码分割
  Meal,
  lazy(() => import('../components/Restaurant')),
  lazy(() => import('../components/Dish')),
  lazy(() => import('../components/Review')),
]

export default function Order() {
  const { order, setOrder } = useOrder()
  const { currStageIndex, stages } = order
  const CurrForm = orderForms[currStageIndex]

  function handlePrevClick() {
    startTransition(() => {
      setOrder(
        produce((draft) => {
          draft.currStageIndex -= 1
        })
      )
    })
  }

  function handleNextClick() {
    startTransition(() => {
      setOrder(
        produce((draft) => {
          draft.currStageIndex += 1
        })
      )
    })
  }

  return (
    <div>
      {/* tab panes */}
      <Stepper currStep={0} steps={[...Object.keys(stages), 'Review']} />
      {/* startTransition work with Suspense: https://github.com/reactwg/react-18/discussions/94#discussioncomment-1406166 */}
      <Suspense fallback={<div>Loading...</div>}>
        <CurrForm />
      </Suspense>
      <div>
        <button onClick={handlePrevClick} disabled={currStageIndex === 0}>
          Prev
        </button>
        <button onClick={handleNextClick} disabled={currStageIndex === orderForms.length - 1}>
          {currStageIndex === orderForms.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}
