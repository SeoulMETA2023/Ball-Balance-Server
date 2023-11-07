// 팝업 열기
let isShowing = false;

document.getElementById("button").addEventListener("click", function () {
    if (isShowing) {
        isShowing = false;
        popup.style.transition = 'transform 1.5s ease';
        popup.style.transform = 'translateY(0px)';
        const image = document.getElementById('arrow');
        image.style.transform = 'rotate(0deg)';
    } else {
        isShowing = true;
        popup.style.transition = 'transform 1.5s ease';
        popup.style.transform = 'translateY(-255px)';
        const image = document.getElementById('arrow');
        image.style.transform = 'rotate(180deg)';
    }

})
