const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto p-4 lg:p-6">
        <ul className="flex justify-center gap-8">
          {["Eventos", "Contáctanos", "Merchandising", "Blog"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="flex items-center text-black hover:text-cyan-400 transition"
              >
                {item}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;