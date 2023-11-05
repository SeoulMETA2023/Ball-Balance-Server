// 팝업 열기
document.getElementById("openPopup").addEventListener("click", function () {
    const popup = document.getElementById("popup");
    const openButton = document.getElementById("openPopup");

    const slideSpeed = 0.5; // 열기와 닫기의 슬라이딩 속도 설정

    let popupBottom = -100;
    let buttonBottom = 0;

    const openSlide = () => {
        if (popupBottom >= 0) {
            clearInterval(slideIntervalOpen);
        } else {
            popupBottom += slideSpeed;
            buttonBottom += slideSpeed;
            popup.style.bottom = popupBottom + "%";
            openButton.style.bottom = buttonBottom + "%";
        }
    };

    let slideIntervalOpen = setInterval(openSlide, 10);
    popup.style.display = "block";

    document.querySelector(".notch").addEventListener("click", function() {
        // 팝업 닫는 코드 추가
        const popup = document.getElementById("popup");
        const slideSpeedClose = -0.5; // 열기와 반대로 슬라이딩 속도 설정
        let popupBottomClose = 0;
        openButton.style.display = "block";
    
        const closeSlide = () => {
            if (popupBottomClose <= -100) {
                clearInterval(slideIntervalClose);
            } else {
                popupBottomClose += slideSpeedClose;
                popup.style.bottom = popupBottomClose + "%";
            }
        };
    
        let slideIntervalClose = setInterval(closeSlide, 10);
    });
    
});
