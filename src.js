let buttSearch = document.querySelector(".buttsearch");
let buttClear = document.querySelector(".buttclear");
const myJSON =
    "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";

function sendReq(method, url) {
    return new Promise((resolve, reject) => {
        const arrUn = new XMLHttpRequest();
        arrUn.open(method, url);
        arrUn.responseType = "json";
        arrUn.onload = () => {
            if (arrUn.status >= 400) {
                reject(arrUn.response);
            } else {
                resolve(arrUn.response);
            }
        };
        arrUn.send();
    });
}

sendReq("GET", myJSON).then((data) => {
    let allCount = data
        .filter((city) => city.country)
        .map((country) => {
            return `${country.country}`;
        });
    let allCountList = [...new Set(allCount)];

    for (let j = 0; j < allCountList.length; j++) {
        let li = document.createElement("div");
        li.setAttribute("id", "buttcount");
        li.innerHTML = `${allCountList[j]}`;
        document.querySelector(".countlist").appendChild(li);
        buttCount = document.querySelectorAll("#buttcount");
        let searchBtn = document.querySelector("#input");
        buttCount[j].onclick = () => {
            let searchButtCount = buttCount[j].innerHTML;
            searchBtn.value = `${searchButtCount}`;
        };
    }

    buttSearch.onclick = () => {
        let searchText = document.querySelector("#input").value.toLowerCase();
        const newArrCountr = data.filter(
            (city) => city.country.toLowerCase() == searchText
        );
        let spanArr = document.querySelectorAll("span");
        if (spanArr.length >= 1) {
            for (let i = 0; i < spanArr.length; i++) {
                document.querySelector("span").remove();
            }
        }
        if (newArrCountr.length >= 1) {
            let head = document.querySelector(".how-much");
            head.innerHTML = `
				<span>Total: ${newArrCountr.length}</span>
				<span><input id="searchuniver" type="text" placeholder="University..."/></span>
			`;

            for (let i = 0; i < newArrCountr.length; i++) {
                let row = document.createElement("span");
                row.setAttribute("class", "listunivers");
                row.innerHTML = `
					<div class="id">${i + 1}</div>
					<div class="name">${newArrCountr[i].name}</div>
					<div class="country">${newArrCountr[i].country}</div>
					<div class="alpha_two_code">${newArrCountr[i].alpha_two_code}</div>
					<div class="web"><a href="${
                        newArrCountr[i].web_pages[0]
                    }" target=”_blank”>link</a></div>`;
                document.querySelector(".content").appendChild(row);

                document.querySelector("#searchuniver").oninput = function () {
                    let val = this.value.substr(1);
                    let allUniversName = document.querySelectorAll(".name");
                    if (val != "") {
                        allUniversName.forEach(function (elem) {
                            if (elem.innerText.search(val) == -1) {
                                elem.classList.add("del");
                                elem.innerHTML = elem.innerText;
                            } else {
                                elem.classList.remove("del");
                                let str = elem.innerText;
                                elem.innerHTML = insertMark(
                                    str,
                                    elem.innerText.search(val),
                                    val.length
                                );
                            }
                        });
                    } else {
                        allUniversName.forEach(function (elem) {
                            elem.classList.remove("del");
                            elem.innerHTML = elem.innerText;
                        });
                    }
                };
                function insertMark(string, pos, len) {
                    return (
                        string.slice(0, pos) +
                        "<span>" +
                        string.slice(pos, pos + len) +
                        "</span>" +
                        string.slice(pos + len)
                    );
                }
            }
        } else {
            let noResult = document.querySelector(".how-much");
            noResult.innerHTML = `Такой страны не существует! Проверьте правильность ввода.`;
        }

        document.querySelector(".countlist").classList.add("hide");
    };
});

buttClear.onclick = () => {
    let span = document.querySelectorAll("span");
    for (let i = 0; i < span.length; i++) {
        document.querySelector("span").remove();
    }
};

document.querySelector("#input").oninput = function () {
    let onInput = this.value.trim().toLowerCase().substr(1);
    let allListCount = document.querySelectorAll(".countlist div");
    let wrapCount = document.querySelector(".countlist");
    if (onInput != "") {
        wrapCount.classList.remove("hide");
        allListCount.forEach(function (el) {
            if (el.innerText.search(onInput) == -1) {
                el.classList.add("hide");
            } else {
                el.classList.remove("hide");
            }
        });
    } else {
        wrapCount.classList.add("hide");
        allListCount.forEach(function (el) {
            if (el.innerText.search(onInput) == -1) {
                el.classList.remove("hide");
            }
        });
    }
};
