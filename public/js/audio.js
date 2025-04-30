const image = document.querySelector("#qr-image");
const form = document.querySelector("#upload_form");
const qr_btn = document.querySelector(".qr-btn");
const input = document.getElementById("inp_file");
const opt = document.getElementById("opt");
const label = document.querySelector(".custom-upload");

input.addEventListener('change', () => {
  const file = input.files[0]

  if (file.size > 1024 * 1024 * 10) {
    alert("FileSize Max 10 MB");
    input.value = ""; 
    label.textContent = "Upload Audio File";
    return;
  }
  if (file) {
    if (file && file.type !== "audio/mpeg") {
      alert("Please Upload Audio File(mp3)");
      input.value = "";
      label.textContent = "Upload Audio File"
    } else {
      label.textContent = file.name
    }

  } else {
    label.textContent = "No File Selected"
  }

});


form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const file = input.files[0];
  const formData = new FormData();
  formData.append("user_file", file);

  document.getElementById("loader").style.display = "inline";

  try {
    const response = await fetch("/sub", {
      method: "POST",
      body: formData
    });

    const fileUrl = await response.text();
    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(fileUrl)}`;
    image.src = qrApi;
    document.getElementById("qr-download").style.display = "block";
  } catch (error) {
    alert("Upload or QR generation failed!");
  } finally {
    document.getElementById("loader").style.display = "none";
  }
});

qr_btn.addEventListener("click", function () {
  const imageUrl = image.src;
  if (!imageUrl) return alert("QR not generated yet!");

  fetch(imageUrl)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = (opt.value.trim() || `qr_${Date.now()}.png`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
});
