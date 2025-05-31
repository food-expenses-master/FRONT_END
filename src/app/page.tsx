import Header from "./_components/Header";

export default function HomePage() {
  return (
    <main >
       <Header title={"홈"}/>
      <p className="text-gray-600 text-sm">
        환영합니다! 식비마스터에 잘 오셨어요.
      </p>
    </main>
  );
}