//------------------------------------------------ Variables --------------------------------------------------------------//
const buttons = Array.from(document.getElementsByTagName("button"));
const list = document.getElementById("list");
const averege = document.querySelector(".averege");

//------------------------------------------------ Functions --------------------------------------------------------------//

//-------------- 1st BTN --------------//
const countriesList = () => {
    list.classList.remove("row");
    const countries = randomPersonData.map((person) => person.region);
    const countrieList = countries.filter((land, index) => {
        return countries.indexOf(land) === index;
    });
    const sortedCountriesList = countrieList.sort();
    sortedCountriesList.map((land) => {
        list.appendChild(document.createElement("li")).textContent = land;
    });
};

//-------------- 2nd BTN --------------//

const capricornWomen = () => {
    list.classList.remove("row");
    let capricornWomenOver30 = randomPersonData.filter((person) => {
        const birthdayString = person.birthday.mdy.split("/");
        if (
            (birthdayString[0] === "12" && birthdayString[1] >= 22) ||
            (birthdayString[0] === "01" && birthdayString[1] <= 19)
        ) {
            if (person.gender === "female" && parseInt(birthdayString[2]) < 1990) {
                return person;
            }
        }
    });
    let sortedWomen = capricornWomenOver30.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    sortedWomen.map((woman) => {
        list.appendChild(document.createElement("li")).innerHTML =
            `<div class="woman">
        <p class="woman__name" >${woman.name} ${woman.surname}</p> <img class="photo" src="${woman.photo}" alt="photo" />
        </div>`;
    });
};

//-------------- 3rd BTN --------------//

const expiringCards = () => {
    list.classList.remove("row");
    const almostExpiredCardsPeople = randomPersonData.filter((person) => {
        const now = new Date();
        const creditCardDateString = person.credit_card.expiration.split("/");
        const creditCardDate = new Date(
            parseInt("20" + creditCardDateString[1]),
            parseInt(creditCardDateString[0])
        );
        if (
            creditCardDate > now &&
            creditCardDate.getFullYear() === now.getFullYear() + 1
        ) {
            const birthyear = new Date(person.birthday.mdy).getFullYear();
            const yearNow = now.getFullYear();
            if (yearNow - birthyear >= 18) {
                return person;
            }
        }
    });
    const sortedPeople = almostExpiredCardsPeople.sort((a, b) => {
        if (
            parseInt(a.credit_card.expiration.split("/")[0]) <
            parseInt(b.credit_card.expiration.split("/")[0])
        )
            return -1;
        else if (
            parseInt(a.credit_card.expiration.split("/")[0]) >
            parseInt(b.credit_card.expiration.split("/")[0])
        )
            return 1;
        return 0;
    });
    const peopleToCall = sortedPeople.map((person) => {
        list.appendChild(document.createElement("li")).innerHTML = `
        <div class="expiringcards">
            <ul class="contactInfo">
                <li>First Name: ${person.name}</li>
                <li>Last Name: ${person.surname}</li>
                <li>Phone Number: ${person.phone}</li>
            </ul>
            <ul class="creditInfo">
                <li>Creditcard nummer: ${person.credit_card.number}</li>
                <li>Expiration Date: ${person.credit_card.expiration}</li>
            </ul>
        </div>
            `;
    });
};

//-------------- 4th BTN --------------//

const mostPeople = () => {
    list.classList.remove("row");
    let peoplePerCountrie = {};
    const personPerCountrie = randomPersonData
        .map((person) => person.region)
        .sort()
        .map((countrie) => {
            peoplePerCountrie[countrie] = (peoplePerCountrie[countrie] || 0) + 1;
        });
    const string = JSON.stringify(peoplePerCountrie);
    const arrayString = string.replace(/"|{|}/g, "").split(",");
    const finishedArray = arrayString.map((countrie) => {
        return countrie.split(":");
    });
    let rankedCountries = finishedArray
        .sort((a, b) => {
            if (parseInt(a[1]) < parseInt(b[1])) return 1;
            if (parseInt(a[1]) > parseInt(b[1])) return -1;
            return 0;
        })
        .map((countriePeople) => {
            list.appendChild(
                document.createElement("li")
            ).innerHTML = `${countriePeople[0]}: ${countriePeople[1]}`;
        });
};

//-------------- 5th BTN --------------//

let age = (countrie) => {
    const ages = [];
    const peoplePerCountrie = randomPersonData.filter((person) => {
        if (person.region === countrie) {
            ages.push(person.age);
        }
    });
    const totalAges = ages.reduce((curentTotal, age) => {
        return curentTotal + age;
    }, 0);
    const roundedAveregeAge = totalAges / ages.length;
    return roundedAveregeAge.toFixed(0);
};

const displayAveregeAge = (clickedId) => {
    averege.innerHTML = `
  The average person in ${clickedId} is ${age(clickedId)} old
  `;
};

const averegeAge = () => {
    list.classList.add("row");
    const singelCountries = [
        ...new Set(randomPersonData.map((person) => person.region).sort()),
    ];
    singelCountries.map((countrie) => {
        return (list.appendChild(
            document.createElement("li")
        ).innerHTML = `<button class="averege-age-button" id="${countrie}" onClick="displayAveregeAge(this.id)">${countrie}</button>`);
    });
};

//-------------- 6th BTN --------------//

const zodiac = (person) => {
    const date = new Date(person.birthday.raw * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let zodiac = "";
    if ((month === 1 && day > 20) || (month === 2 && day < 19)) {
        zodiac = "Aquarius";
    } else if ((month === 2 && day > 18) || (month === 3 && day < 21)) {
        zodiac = "Pisces";
    } else if ((month === 3 && day > 20) || (month === 4 && day < 21)) {
        zodiac = "Aries";
    } else if ((month === 4 && day > 20) || (month === 5 && day < 22)) {
        zodiac = "Taurus";
    } else if ((month === 5 && day > 21) || (month === 6 && day < 22)) {
        zodiac = "Gemini";
    } else if ((month === 6 && day > 21) || (month === 7 && day < 24)) {
        zodiac = "Cancer";
    } else if ((month === 7 && day > 23) || (month === 8 && day < 24)) {
        zodiac = "Leo";
    } else if ((month === 8 && day > 23) || (month === 9 && day < 24)) {
        zodiac = "Virgo";
    } else if ((month === 9 && day > 23) || (month === 10 && day < 24)) {
        zodiac = "Libra";
    } else if ((month === 10 && day > 23) || (month === 11 && day < 23)) {
        zodiac = "Scorpio";
    } else if ((month === 11 && day > 22) || (month === 12 && day < 23)) {
        zodiac = "Sagittarius";
    } else if ((month === 12 && day > 22) || (month === 1 && day < 21)) {
        zodiac = "Capricorn";
    }
    return zodiac;
};

const findMatches = (personName) => {
    const personToMatch = randomPersonData.filter((person) => {
        if (personName === person.name) {
            averege.innerHTML = `<div class="persontomatchdata">
      <ul class="persontomatchdata--left">
          <li>First Name: ${person.name}</li>
          <li>Last Name: ${person.surname}</li>
          <li>Country: ${person.region}</li>
          <li>Age: ${person.age}</li>
          <li>Star sign: ${zodiac(person)}</li>
      </ul>
      <ul class="persontomatchdata--right">
          <li class="person--image"><img class="match--image" src="${person.photo
                }" alt="person photo" /></li>
      </ul>
  </div>`;
            return person;
        }
    });
    list.innerHTML = "";
    const zodiacSignOfPersonToMatch = zodiac(personToMatch[0]);
    const matches = randomPersonData.filter((person) => {
        if (
            zodiac(person) === zodiacSignOfPersonToMatch &&
            person.name != personName
        ) {
            list.appendChild(document.createElement("li")).innerHTML = `
        <div class="persondata">
            <ul class="persondata--left">
                <li>First Name: ${person.name}</li>
                <li>Last Name: ${person.surname}</li>
                <li>Country: ${person.region}</li>
                <li>Age: ${person.age}</li>
                <li>Star sign: ${zodiac(person)}</li>
            </ul>
            <ul class="persondata--middle">
                <li class="person--image"><img class="match--image" src="${person.photo
                }" alt="person photo" /></li>
            </ul>
            <ul class="persondata--right">
              <li><button class="averege-age-button" id="${person.name
                }" onClick="findMatches(this.id)">Find Matches</button></li>
            </ul>
        </div>
            `;
        }
    });
};
const makeMatch = () => {
    list.classList.remove("row");
    randomPersonData.map((person) => {
        list.appendChild(document.createElement("li")).innerHTML = `
        <div class="persondata">
            <ul class="persondata--left">
                <li>First Name: ${person.name}</li>
                <li>Last Name: ${person.surname}</li>
                <li>Country: ${person.region}</li>
                <li>Age: ${person.age}</li>
                <li>Star sign: ${zodiac(person)}</li>
            </ul>
            <ul class="persondata--middle">
                <li class="person--image"><img class="match--image" src="${person.photo
            }"/></li>
            </ul>
            <ul class="persondata--right">
              <li><button class="averege-age-button" id="${person.name
            }" onClick="findMatches(this.id)">Find Matches</button></li>
            </ul>
        </div>
            `;
    });
};

//------------------------------------------------ Changer --------------------------------------------------------------//

const changeList = (content) => {
    list.innerHTML = "";
    averege.innerHTML = "";
    const value = content.target.textContent;
    switch (value) {
        case "Country List":
            countriesList();
            break;
        case "Capricorn women":
            capricornWomen();
            break;
        case "Old Credit Cards":
            expiringCards();
            break;
        case "Most People":
            mostPeople();
            break;
        case "Average Age":
            averegeAge();
            break;
        case "Matchmaking":
            makeMatch();
            break;
        default:
            list.innerHTML = "";
    }
};

//------------------------------------------------ Event Listerners --------------------------------------------------------------//

buttons.forEach((button) => {
    button.addEventListener("click", changeList);
});