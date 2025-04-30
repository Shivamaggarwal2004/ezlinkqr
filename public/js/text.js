
document.addEventListener('DOMContentLoaded', function () {
    const inp = document.querySelector("#inp");
    const opt = document.querySelector("#opt");
    const loader = document.querySelector("#loader");
    const qr_image = document.querySelector("#qr-image");
    const qr_btn = document.querySelector(".qr-btn");
    const qr_downloadDiv = document.querySelector("#qr-download");

    function getval() {
        const val = inp.value.trim();
        if (val.length > 1200) {
            alert("Please Enter Small Text")
            return;
        }
        if (val) {
            loader.style.display = "block";
            qr_downloadDiv.style.display = "none";

            const api = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${val}`;
            qr_image.onload = () => {
                loader.style.display = "none";
                qr_downloadDiv.style.display = "block";
            };
            qr_image.onerror = () => {
                loader.style.display = "none";
                alert("Problem to Generate QR");
            };
            qr_image.src = api;
        } else {
            alert("Please Enter Text");
        }
    }

    window.getval = getval;
    qr_btn.addEventListener("click", function () {
        const imageUrl = qr_image.src;
        if (imageUrl && imageUrl !== "") {
            fetch(imageUrl)
                .then(res => res.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = (opt.value.trim() || `qr_code_${Date.now()}.png`);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    inp.value = "";
                    opt.value = "";
                })
                .catch(() => {
                    alert("Problem to Generate QR");
                });
        } else {
            alert("First Generate QR After DOWNLOAD");
        }
    });

});
