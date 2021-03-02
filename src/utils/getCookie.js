/**
 * @setCookie
 */
const setCookie  = (username, value, expire)=> {
    var date = new Date();
    date.setSeconds(date.getSeconds() + expire);
    document.cookie = username + "=" + escape(value) + "; expires=" + date.toGMTString();
    console.log(document.cookie)
};

/**
 * @getCookie
 */
const getCookie  = (username)=> {
        if (document.cookie.length>0){
            let c_start=document.cookie.indexOf(username + "=");
            if (c_start!==-1){
                c_start=c_start + username.length+1;
                let c_end=document.cookie.indexOf(";",c_start);
                if (c_end===-1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
};

/**
 * @deleteCookie
 */
export function delCookie(username) {
    setCookie(username, "", -1)
}

let cookieConfig = {
    getCookie,
    setCookie,
    delCookie
};

export default cookieConfig;

