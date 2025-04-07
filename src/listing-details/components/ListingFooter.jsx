import React from "react";

function ListingFooter() {
  return (
    <div>
      <footer className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center  sm:justify-start">
              <img src="./../../../public/logo.png" alt="mobiloe logo" className="h-12 object-cover" />
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">Copyright &copy; 2025. Restu Muhammad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ListingFooter;
