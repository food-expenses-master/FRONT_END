
export default function Header({title} : {title : string}) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40 border-gray-200">
      <div className="max-w-[425px] mx-auto px-4 h-[60px] flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 leading-none">
          {title}
        </h1>
      </div>
    </header>
  );
}
