import { APIPATH } from './config'

// для отладки на заглушках
export const getUrl = (url) => {


     let altObj = {};
     
     //altObj["/.."] = "/...json";

    
    if(/localhost:3000/gi.test(document.location.href)) {
        url = '/api'  + altObj[url];
    } else {
        url = APIPATH + url;
    }

    
    return url; 
};

export const getMethod = (method) => {
    
    if(/localhost:3000/gi.test(document.location.href)) {
        method = 'GET';
    }
    
    return method; 
};