import React from "react";

function InformationSection() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Loe mau jual mobil? jual di mobiLoe ajaa...</h2>

              <p className="mt-4 text-gray-700">Jual mobil loe di mobiLoe. Temuin orang yang mau beli mobil loe diharga yang oke. Nego teruss sampe mobil loe kejual. Seal the deal!</p>
            </div>
          </div>

          <div>
            <img src="/car3.jpg" className="rounded" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InformationSection;
