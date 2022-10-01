/**
 * 存储数据
 */
export const setItem = (key,value) => {
    //将数组 对象数据转换为JSON 字符串
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key,value)
}

/**
 * 获取
 */
export const getItem = key => {

    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

/**
 * 删除
 */
 export const delItem = key => {
    window.localStorage.removeItem(key)
}