let inputTurnuvaName = document.querySelector("#turnuvaName");
let inputKisi = document.querySelector("#kisiValue");
let button = document.querySelector(".veri button");
let inputList = document.querySelector(".veri .cont");
let veri = document.querySelector(".veri");
let sonuc = document.querySelector(".sonuc");
let paylas = document.querySelector("footer");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  let takimSayisi = inputKisi.value;
  if (!takimSayisi) return;
  inputFunc();
});

let takimList = new Array();

async function inputFunc() {
  const takimSayisi = inputKisi.value;
  for (i = 0; i < takimSayisi; i++) {
    inputList = document.createElement("input");

    veri.appendChild(inputList);
    inputList.setAttribute("type", "text");
    inputList.setAttribute("id", `input${i}`);
    inputList.setAttribute("class", "buttonbosluk");
    inputList.setAttribute("placeholder", "Takim Giriniz");
  }
  let content = document.querySelectorAll("p");

  inputTurnuvaName.remove("input");
  inputKisi.remove("input");
  button.remove("button");
  content[2].innerHTML = "";

  content[3].innerHTML = "";
  page2();

  inputListButton.addEventListener("click", async (event) => {
    event.preventDefault();
    turnuvaName = inputTurnuvaName.value;
    let checkBoxOne = document.querySelector("#tekMac");

    if (checkBoxOne.checked == true) {
      info = document.createElement("div");
      info.innerHTML = `${turnuvaName}`;
      sonuc.appendChild(info);
      info.classList.add("turnuvaName");
      fikstur(takimSayisi);
      veri.remove("div");
      sonuc.classList.add("active");

      paylasDiv = document.createElement("div");
      paylasDiv.className = "iconpack";
      sonuc.appendChild(paylasDiv);

      screenshot = document.createElement("i");
      whatsappShare = document.createElement("i");
      paylasDiv.appendChild(screenshot);
      paylasDiv.appendChild(whatsappShare);
      screenshot.classList.add("fa-solid", "fa-file-arrow-down");
      whatsappShare.classList.add("fa-brands", "fa-whatsapp");

      screenshot.addEventListener("click", async () => {
        html2canvas(document.body.querySelector(".sonuc")).then((canvas) => {
          // onShare(canvas);
          const a = document.createElement("a");
          a.href = canvas.toDataURL("image/png");
          a.download = "image.png";
          a.click();
        });
      });

      whatsappShare.addEventListener("click", async () => {
        html2canvas(document.body.querySelector(".sonuc")).then((canvas) => {
          onShare(canvas);
        });
      });
    } else {
      infoYakında = document.createElement("div");
      infoYakında.innerHTML = `YAKINDA`;
      sonuc.appendChild(infoYakında);
      infoYakında.classList.add("yakında");
      veri.remove("div");
    }
  });
}

function fikstur(takimSayisi) {
  for (i = 0; i < takimSayisi; i++) {
    takimList[i] = document.querySelector(`#input${i}`).value;
  }
  macsayisi = takimList.length / 2;
  haftaSayisiNormal = takimList.length - 1;
  haftaSayisiBayli = takimList.length;
  randomindex = Math.floor(Math.random() * takimList.length);

  takimList.sort(function (a, b) {
    return 0.5 - Math.random();
  });

  if (takimSayisi % 2 == 1) {
    let fiksturList = new Array();

    for (j = 0; j < haftaSayisiBayli; j++) {
      let copyTakimList = Array.from(takimList);
      console.log(`${j + 1}.HAFTA `);

      cikar = takimList.pop();
      takimList.unshift(cikar);
      haftadiv = document.createElement("div");
      haftadiv.classList.add(`haftalar`);
      haftadiv.id = `${j + 1}hafta`;
      sonuc.appendChild(haftadiv);
      let yazdir = document.getElementById(`${j + 1}hafta`);
      yazdir.innerHTML = `${j + 1}. Hafta`;
      macdiv = document.createElement("div");
      macdiv.id = `${j + 1}mac`;
      macdiv.classList.add(`maclar`);
      haftadiv.appendChild(macdiv);
      let macyazdir = document.getElementById(`${j + 1}mac`);
      for (i = 0; i < macsayisi; i++) {
        firstValue = copyTakimList.shift();
        exitValue = copyTakimList.pop();

        if (exitValue == undefined) {
          console.log(`BAY GEÇEN TAKIM =${firstValue} `);
          fiksturList[i] = `${firstValue} VS BAY GEÇER `;
        } else {
          console.log(`${i + 1}.MAÇ  ${firstValue} VS ${exitValue}`);

          fiksturList[i] = `${firstValue} VS ${exitValue}`;
        }
      }

      macyazdir.innerHTML = fiksturList.join("<br />");
      console.log(fiksturList);
    }
  } else {
    let fiksturList = new Array();

    takım1 = takimList.splice(randomindex, 1).toString();
    for (j = 0; j < haftaSayisiNormal; j++) {
      let copyTakimList = Array.from(takimList);
      console.log(`${j + 1}.HAFTA `);

      takım2 = copyTakimList.shift().toString();
      fiksturList[0] = ` ${takım1} VS ${takım2} `;
      cikar = takimList.pop();
      takimList.unshift(cikar);

      haftadiv = document.createElement("div");
      haftadiv.classList.add(`haftalar`);
      haftadiv.id = `${j + 1}hafta`;
      sonuc.appendChild(haftadiv);
      let yazdir = document.getElementById(`${j + 1}hafta`);
      yazdir.innerHTML = `${j + 1}. Hafta`;
      macdiv = document.createElement("div");
      macdiv.id = `${j + 1}mac`;
      macdiv.classList.add(`maclar`);
      haftadiv.appendChild(macdiv);
      let macyazdir = document.getElementById(`${j + 1}mac`);

      for (i = 0; i < macsayisi - 1; i++) {
        firstValue = copyTakimList.shift();
        exitValue = copyTakimList.pop();

        console.log(`${i + 2}.MAÇ  ${firstValue} VS ${exitValue}`);
        fiksturList[i + 1] = `${firstValue} VS ${exitValue}`;
      }
      console.log(fiksturList);
      macyazdir.innerHTML = fiksturList.join("<br />");
    }
  }
}

function page2() {
  checkboxDiv = document.createElement("div");
  checkboxButton = document.createElement("input");

  veri.appendChild(checkboxDiv);
  checkboxDiv.classList.add("checkbox");

  checkboxButtonFirst = document.createElement("input");
  checkboxDiv.appendChild(checkboxButtonFirst);
  checkboxButtonFirst.setAttribute("type", "checkbox");
  checkboxButtonFirst.setAttribute("class", "form-checkbox");
  checkboxButtonFirst.setAttribute("id", "tekMac");

  checkboxButtonFirstLabel = document.createElement("label");
  checkboxButtonFirstLabel.innerHTML = "Tek Maç";
  checkboxDiv.appendChild(checkboxButtonFirstLabel);

  checkboxButtonSecond = document.createElement("input");
  checkboxDiv.appendChild(checkboxButtonSecond);
  checkboxButtonSecond.setAttribute("type", "checkbox");
  checkboxButtonSecond.setAttribute("class", "form-checkbox");
  checkboxButtonSecond.setAttribute("id", "ciftMac");

  checkboxButtonSecondLabel = document.createElement("label");
  checkboxButtonSecondLabel.innerHTML = "Çift Maç";
  checkboxDiv.appendChild(checkboxButtonSecondLabel);

  inputListButton = document.createElement("button");
  inputListButton.textContent = "Devam Et";
  veri.appendChild(inputListButton);

  formcControlCheckbox = [...document.querySelectorAll(".form-checkbox")];

  formcControlCheckbox.forEach((onebyone) => {
    onebyone.addEventListener("click", function () {
      formcControlCheckbox.forEach((onebyone) => {
        onebyone.checked = false;
      });

      onebyone.checked = true;
    });
  });
}

async function onShare(canvas) {
  const response = await fetch(canvas.toDataURL("image/png"));
  const blob = await response.blob();
  console.log(blob);

  const filesArray = [
    new File([blob], "meme.jpg", {
      type: "image/jpeg",
      lastModified: new Date().getTime(),
    }),
  ];
  const shareData = {
    files: filesArray,
  };
  console.log(filesArray);

  navigator.share(shareData).then(() => {
    console.log("Shared successfully");
  });
}
