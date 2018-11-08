import { APIPATH } from './config'

export const getUrl = (url) => {


     let altObj = {};
     
     altObj["/notes/one"] = "/notes/one.json";
     altObj["/notes"] = "/notes/notes.json";
     altObj["/notes/tag"] = "/notes/tag.json";
     altObj["/notes/new"] = "/notes/new.json";
     altObj["/notes/update"] = "/notes/update.json";
     altObj["/notes/delete"] = "/notes/delete.json";
     
     altObj["/tags"] = "/tags/tags.json";

    
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