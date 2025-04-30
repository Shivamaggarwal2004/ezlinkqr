document.addEventListener('DOMContentLoaded', function () {
    const text_email = document.querySelector("#text-email");
    const text_subject = document.querySelector("#text-subject");
    const text_body = document.querySelector("#text-body");
    const loader = document.querySelector("#loader");
    const qr_image = document.querySelector("#qr-image");
    const qr_btn = document.querySelector(".qr-btn");
    const qr_downloadDiv = document.querySelector("#qr-download");
    const opt = document.querySelector("#opt"); // opt bhi define kiya ab

    function getval() {
        const email_val = text_email.value.trim();
        const subj_val = text_subject.value.trim();
        const body_val = text_body.value.trim();

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!pattern.test(email_val)) {
            alert("Please Enter a Valid Email");
            return;
        }

        if (email_val) {
            loader.style.display = "block";
            qr_downloadDiv.style.display = "none";
            const data = `mailto:${email_val}?subject=${encodeURIComponent(subj_val)}&body=${encodeURIComponent(body_val)}`;

            const api = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;

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

                    text_email.value = "";
                    text_subject.value = "";
                    text_body.value = "";
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





