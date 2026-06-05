function Hero() {
  return (
    <div className="bg-gray-100 min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          New Collection
        </h1>

        <p className="mb-6 text-gray-600">
          Discover modern fashion
        </p>

        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Hero;