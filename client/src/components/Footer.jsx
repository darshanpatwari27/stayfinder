function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold">
          🏡 StayFinder
        </h2>

        <p className="text-gray-400 mt-2">
          Find your perfect stay anywhere in the world.
        </p>

        <div className="flex gap-6 mt-4">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>

        <hr className="my-4 border-gray-700" />

        <p className="text-center text-gray-400">
          © 2026 StayFinder. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;