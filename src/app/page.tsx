import Header from './_components/Header'
import HomePageClientComponent from './_components/HomePageClientComponent'
import Page from './data/page'

export default function HomePage() {
  return (
    <main>
      {/* <Header title={'홈'} />
      <p className="text-gray-600 text-sm pb-60">
        환영합니다! 식비마스터에 잘 오셨어요.
      </p>
      <HomePageClientComponent /> */}
      <Page />
    </main>
  )
}
