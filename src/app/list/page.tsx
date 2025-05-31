import Header from "../_components/Header";

export default function ListPage() {
  return (
    <main>
      <Header title={"장리스트"}/>
      <p className="text-gray-600 text-sm">
        필요한 식재료를 체크하고 비교하세요.
      </p>
    </main>
  );
}