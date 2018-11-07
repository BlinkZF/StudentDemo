/**
 * 获取滚动的左边距离和头部距离
 * scroll().left   scroll().top
 * @returns {{top: number, left: number}}
 */
function  scroll() {
    if(window.pageYOffset !=="null") {
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.compatMode ==="CSS1Compat")
    {
        return{
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }
    return {
        top: document.body.scrollTop,
        left:document.body.scrollLeft
    }
}
