~function () {
    let computedRem = function () {
        let winW = document.documentElement.clientWidth || document.body.clientWidth,
            desW = 1024;    //(设计稿的宽度)          
        if (winW >= 1024) {
            document.documentElement.style.fontSize = '100px';
        }
        document.documentElement.style.fontSize = winW / desW * 100 + 'px';
    }
    computedRem();
    window.addEventListener('resize', computedRem)
}(window);