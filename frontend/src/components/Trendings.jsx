import React from 'react';

const Trendings = () => {
    return (
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-2 md:gap-7 gap-10 max-w-screen-2xl rounded-xl px-10 pb-7 pt-5 sm:px-20 mb-20 mx-auto">
            <div className="w-full rounded-2xl flex flex-col sm:flex-row items-center justify-center transition-all duration-300 ease-in-out 
                transform hover:scale-95 shadow-[0px_4px_6px_0px_rgba(236,_72,_153,_0.5)] cursor-pointer hover:shadow-[0px_4px_6px_0px_rgba(34,_197,_94,_0.5)] h-full text-center">
                <img className="md:max-w-[300px] sm:w-auto w-full" src="/assets/images/products/x-box-two.png" alt="PlayStation 5" />
                <div className="mt-5 sm:mt-0 sm:ml-5">
                    <h3 className="text-lg font-semibold text-white">PlayStation 5</h3>
                    <p className="price text-cyan-500">$499.99</p>
                </div>
            </div>
            <div className="w-full rounded-2xl flex flex-col sm:flex-row items-center justify-center transition-all duration-300 ease-in-out 
                transform hover:scale-95 shadow-[0px_4px_6px_0px_rgba(236,_72,_153,_0.5)] cursor-pointer hover:shadow-[0px_4px_6px_0px_rgba(34,_197,_94,_0.5)] h-full text-center">
                <img className="md:max-w-[450px] sm:w-auto w-full" src="/assets/images/products/laptop-one.png" alt="Tablet Product" />
                <div className="mt-5 sm:mt-0 sm:ml-5">
                    <h3 className="text-lg font-semibold text-white">Tablet Product</h3>
                    <p className="price text-cyan-500">$499.99</p>
                </div>
            </div>
        </div>
    );
};

export default Trendings;
