import React from 'react'

import './preloader.less'

export const Preloader = ({ isShow }) => {return (
    <div className={isShow?"preloader-1":"preloader-1 preloader-hide"}>
        <div>Загрузка</div>
        <span className="line line-1"></span>
        <span className="line line-2"></span>
        <span className="line line-3"></span>
        <span className="line line-4"></span>
        <span className="line line-5"></span>
        <span className="line line-6"></span>
        <span className="line line-7"></span>
        <span className="line line-8"></span>
        <span className="line line-9"></span>
    </div>
)}
