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
      noteBorderColor: ''
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
            document.querySelector('.side').style.backgroundColor = `#${storageSettings[0].navColor}`; // Set the color
            // Aside 
            document.querySelector('.notes-column').style.backgroundColor = `hsl(0, 0%, ${storageSettings[0].asideColor}%)`;
            // Notes
            for(let i = 0; i < document.querySelectorAll('.note-thumbnail').length; i++)
            document.querySelectorAll('.note-thumbnail')[i].style.backgroundColor = storageSettings[0].noteColors;
            // Note titles
            for(let i = 0; i < document.getElementsByClassName('noteTitle').length; i++)
            document.getElementsByClassName('noteTitle')[i].style.fontSize = storageSettings[0].titleSizes + 'px';
            // Note contents
            for(let i = 0; i < document.getElementsByClassName('noteContent').length; i++)
            document.getElementsByClassName('noteContent')[i].style.fontSize = storageSettings[0].contentSizes + 'px';
            // Note borders
            if(storageSettings[0].noteBorderSwitch == 'true'){
                for(let i = 0; i < document.getElementsByClassName('note-thumbnail').length; i++)
                document.getElementsByClassName('note-thumbnail')[i].style.border = `${storageSettings[0].noteBorderType} 2px hsl(0, 0%, ${storageSettings[0].noteBorderColor}%)`;
            }
        }, 100);
    }
};
fetchStorageData();