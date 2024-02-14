function getNoteAge(noteDate){
    let monthsList = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

    let noteDayTemp = noteDate.split(',')[0];
    let noteDay = noteDayTemp.split(' ')[1]; // ex. 1

    let noteMonthName = noteDate.split(' ')[0]; // ex. juni
    let noteMonth = monthsList.indexOf(noteMonthName) + 1; // ex. 6

    let noteYear = noteDate.split(' ')[2]; // ex. 2024

    let nowDay = new Date().getDate();
    let nowMonth = new Date().getMonth() + 1; // Since January is 0
    let nowYear = new Date().getFullYear();

    //Get exactly how many days the note is old
    let nmOfDays = ((nowDay - noteDay) + ((nowMonth - noteMonth)*30) + ((nowYear - noteYear)*365));

    if (nmOfDays >= 365)
        nmOfDays = Math.floor(nmOfDays/365) + ' year old note';
    else if (nmOfDays >= 30)
        nmOfDays = Math.floor(nmOfDays/30) + ' month old note';
    else if (nmOfDays < 30 && nmOfDays > 0)
        nmOfDays = nmOfDays + ' day old note';
    else if(nmOfDays == 0)
        nmOfDays = 'Note is created today';
    return nmOfDays;
}

let settingsObj = [
    {
      navColor: '',
      asideColor: '',
      noteColors: '',
      titleSizes: '',
      contentSizes: '',
      noteBorderSwitch: false,
      noteBorderType: 'solid',
      noteBorderColor: '',
      fontFamily: ''
    }
  ];

let storageSettings = JSON.parse(localStorage.getItem('settings'));

function getStorageSettings(){
    if(storageSettings != null)
    settingsObj = storageSettings;
}
getStorageSettings();

function fetchStorageData() {
    if(storageSettings != null){
        setTimeout(() => {
            // Navbar
            document.querySelector('.side').style.backgroundColor = `#${settingsObj[0].navColor}`; // Set the color
            // Aside 
            document.querySelector('.notes-column').style.backgroundColor = `hsl(0, 0%, ${settingsObj[0].asideColor}%)`;
            // Notes
            for(let i = 0; i < document.querySelectorAll('.note').length; i++)
            document.querySelectorAll('.note')[i].style.backgroundColor = storageSettings[0].noteColors;
            // Note titles
            for(let i = 0; i < document.getElementsByClassName('noteTitle').length; i++)
            document.getElementsByClassName('noteTitle')[i].style.fontSize = settingsObj[0].titleSizes + 'px';
            // Note contents
            for(let i = 0; i < document.getElementsByClassName('noteContent').length; i++)
            document.getElementsByClassName('noteContent')[i].style.fontSize = settingsObj[0].contentSizes + 'px';
            // Note borders
            if(storageSettings[0].noteBorderSwitch == 'true'){
                for(let i = 0; i < document.getElementsByClassName('note').length; i++)
                document.getElementsByClassName('note')[i].style.border = `${storageSettings[0].noteBorderType} 2px hsl(0, 0%, ${storageSettings[0].noteBorderColor}%)`;
            }
            // Font family
            document.documentElement.style.setProperty('--fontFamily', `${settingsObj[0].fontFamily}`);
        }, 10);
    }
};
fetchStorageData();



// Nav button

navButton.addEventListener('click', () => {
    if (navClicked === false){
        document.querySelector('.side').style.display = 'flex';
        navClicked = true;
        navButtonShape('translate(10%, 100%) rotate(45deg)', 'none', 'translate(10%, -100%) rotate(-45deg)', 'white'); // Change the shape of the mobile nav button from 3 lines to cross
    } else {
        document.querySelector('.side').style.display = 'none';
        navClicked = false;
        navButtonShape('rotate(0deg) translate(0%, 0%)', 'block', 'rotate(0deg) translate(0%, 0%)', 'black'); // Change the shape of the mobile nav button from cross to 3 lines
    }
})

function navButtonShape(f, s, t, color){
    let div = navButton.getElementsByTagName('div');
    div[0].style.transform = f;
    div[1].style.display = s;
    div[2].style.transform = t;
    for(let i = 0; i < div.length; i++)
        div[i].style.background = color;
}