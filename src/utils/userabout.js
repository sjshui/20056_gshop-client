// 这个函数是让用户获取到唯一的标识
// 第一步：先从localStorage当中去获取，如果米有
// 第二部：再调用uuid创建新的，并且还要存储到localStorage
import { v4 as uuidv4 } from 'uuid';

let TOKEN_KEY = 'TOKEN_KEY'

function getUserTempId(){
    let userTempId = localStorage.getItem('USERTEMPID_KEY')

    if(!userTempId){
        userTempId = uuidv4();
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    }
    return userTempId
}

function setToken(token){
    localStorage.setItem(TOKEN_KEY,token)
}

function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}

function removeToken(){
    localStorage.removeItem(TOKEN_KEY)
}

export {
    getUserTempId,
    setToken,
    getToken,
    removeToken
}