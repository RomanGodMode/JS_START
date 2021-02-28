import dynamic from 'next/dynamic'
import { fetchLesson } from '~client/redux/lesson-page/actions'
import { NextThunkDispatch, wrapper } from '~client/redux/store'
const Lesson = dynamic(() => import('../../components/for-student/lesson-page/lesson-page').then(mod => mod.LessonPage), { ssr: false, loading: () => <div>...</div> })
// На этом этапе я пожалел о том что взял next js
// Я не пользуюсь приемуществами ssr , а только сталкиваюсь с проблемами
// которые приходится закрывать костылями
const LessonPage = () => {
  return (
    <>
      <Lesson />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(fetchLesson(+params.num))
})

export default LessonPage
