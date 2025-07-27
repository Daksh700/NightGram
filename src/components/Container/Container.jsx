import React from 'react'
import { Header } from '../index'

function Container({children}) {
    return (
        <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
            <Header />
            <div className="w-full max-w-[1200px] mx-auto px-6 py-8">
                <main>{children}</main>
            </div>
            {/* <Footer />  here we dont have a footer thats the reason it is empty*/}
        </div>
    )
}

export default Container
