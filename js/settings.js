 // gtag for reset button - Ali -------------------------------
const resetBtn = document.getElementById("resetSettings");
  
  //custom gtag event when you reset changes
  resetBtn.addEventListener("click", function () {
    gtag("event", "Reset_button", {
      event_category: "click_engagement",
      event_label: "reset_settings",
    });
  });
// -------------------------------------------------------------


function takeAll() {
  const allNotes = JSON.parse(localStorage.getItem("allNotes"));
  allNotes.forEach((e) => {
    createTumbnail(e);
  });
}

takeAll();

// Slide up the color settings 
setTimeout(() => { document.getElementById('colorSettingsSlide').click() });

const saveToStorageSettings = () => {
  localStorage.setItem('settings', JSON.stringify(settingsObj));
}

const colorList = document.getElementById('colorList');
// Hide and show the settings menu by clicking on the blue head title of the settings
document.addEventListener('click', (evt) => {
  if(evt.target.className == 'slide'){
    let wrapper = evt.target.id.slice(0, evt.target.id.length-5); // Getting the wrapper name
    let wrapperId = document.getElementById(wrapper);
    if(wrapperId.clicked != false){
      wrapperId.classList.add('hidden');
      wrapperId.clicked = false;
      document.getElementById(wrapper + 'Arrow').className = 'fas fa-chevron-up'; // Arrow direction up
    } else {
      wrapperId.classList.remove('hidden');
      wrapperId.clicked = true;
      document.getElementById(wrapper + 'Arrow').className = 'fas fa-chevron-down'; // Arrow direction down
    }
  }
  // Nav color settings
  else if (evt.target.className == 'navBackColors')
    navBackColor(evt.target.id); // evt.target.id is like navBackColors005392
});

colorList.addEventListener('change', () => {
  // Hide all radios except the ones that related to the option
  for(let i = 0; i < document.querySelectorAll('.backColorWrapper').length; i++)
    document.querySelectorAll('.backColorWrapper')[i].style.display = 'none';
  document.getElementById(colorList.options[colorList.selectedIndex].value + 'Wrapper').style.display = 'flex';
});


document.addEventListener('input', (evt) => {
  // Aside color settings
  if(evt.target.id == 'asideColorRange')
    asideBackColor(evt.target.value);
  // Note color settings
  else if (evt.target.parentNode.id == 'noteColorWrapper'){
    noteBackColor();
    document.getElementById('noteColorText').textContent = `rgb(${document.getElementById('noteColorR').value}, ${document.getElementById('noteColorG').value}, ${document.getElementById('noteColorB').value})`; // Result example: rgb(200, 50, 40)
    settingsObj[0].noteColors = document.getElementById('noteColorText').textContent;
    saveToStorageSettings();
  }
  // All size settings
  else if (evt.target.id == 'titleSizeRange')
    titleSize(evt.target.value);
  else if (evt.target.id == 'contentSizeRange')
    contentSize(evt.target.value);
});

// ------- Color settings -----------
function navBackColor(color){
  // Uncheck all radios except the chosen one
  for(let i = 0; i < document.querySelectorAll('.navBackColors').length; i++)
    document.querySelectorAll('.navBackColors')[i].checked = false;
  document.getElementById(color).checked = true; // The chosen radio is checked alone
 // To get the pure color value without string. Ex. (005392) instead of (navBackColors005392)
  document.querySelector('.side').style.backgroundColor = `#${color.slice(13, color.length)}`; // Ex. #005392
  settingsObj[0].navColor = color.slice(13, color.length);
  saveToStorageSettings();
}

function asideBackColor(color) {
  // Cahnge the color using HSL color type. Ex. hsl(0, 0%, 50)
  document.querySelector('.notes-column').style.backgroundColor = `hsl(0, 0%, ${color}%)`;
  settingsObj[0].asideColor = color;
  saveToStorageSettings();
}

function noteBackColor() {
  for(let i = 0; i < document.querySelectorAll('.note').length; i++)
  document.querySelectorAll('.note')[i].style.backgroundColor = `rgb(${document.getElementById('noteColorR').value}, ${document.getElementById('noteColorG').value}, ${document.getElementById('noteColorB').value})`; // Result example: rgb(200, 50, 40) applied to all notes
}

//------------------ Size settings --------------
function titleSize(size){
  for(let i = 0; i < document.getElementsByClassName('noteTitle').length; i++)
    document.getElementsByClassName('noteTitle')[i].style.fontSize = `${size}px`;
    settingsObj[0].titleSizes = size;
    saveToStorageSettings();
}

function contentSize(size){
  for(let i = 0; i < document.getElementsByClassName('noteContent').length; i++)
    document.getElementsByClassName('noteContent')[i].style.fontSize = `${size}px`;
    settingsObj[0].contentSizes = size;
    saveToStorageSettings();
}

// ------------ Note border settings --------------
let borderShape = 'solid';
const buttonSeek = document.getElementById('slideButtonSeek');
const borderRange = document.getElementById('borderRange');
const borderList = document.getElementById('borderList');

// The turn on-off settings button
if(buttonSeek.isOne == true)
  noteBorder(borderShape);

// Turn the border settings on and off
document.getElementById('slideButton').onclick = () => {
  if(buttonSeek.isOne != true){
    buttonSeek.isOne = true;
    buttonSeek.classList.add('buttonOn');
    settingsObj[0].noteBorderSwitch = 'true';
    for(let i = 0; i < document.getElementsByClassName('note').length; i++)
    if(storageSettings != null)
    document.getElementsByClassName('note')[i].style.border = `${storageSettings[0].noteBorderType} 2px hsl(0, 0%, ${storageSettings[0].noteBorderColor}%)`;
  } else {
    buttonSeek.isOne = false;
    buttonSeek.classList.remove('buttonOn');
    settingsObj[0].noteBorderSwitch = 'false';
    for(let i = 0; i < document.getElementsByClassName('note').length; i++)
    document.getElementsByClassName('note')[i].style.border = 'none';
  }
  saveToStorageSettings();
}

// Choose bettween border types
borderList.addEventListener('change', () => {
  borderShape = borderList.options[borderList.selectedIndex].value;
  noteBorder(borderShape);
});

// Setting the border brightness
borderRange.addEventListener('input', () => {
  noteBorder(borderShape);
});

// Giving borders to all notes
function noteBorder(border) {
  if(buttonSeek.isOne == true){
    for(let i = 0; i < document.getElementsByClassName('note').length; i++)
    document.getElementsByClassName('note')[i].style.border = `${border} 2px hsl(0, 0%, ${borderRange.value}%)`;
    settingsObj[0].noteBorderType = borderShape;
    settingsObj[0].noteBorderColor = borderRange.value;
    saveToStorageSettings();
  }
}

// Choosing font family
const fonts = document.getElementById('fonts');
fonts.addEventListener('change', function(){
  for(let i = 0; i < document.getElementsByClassName('noteTitle').length; i++){
    document.getElementsByClassName('noteTitle')[i].style.fontFamily = fonts.options[fonts.selectedIndex].value;
    document.getElementsByClassName('noteContent')[i].style.fontFamily = fonts.options[fonts.selectedIndex].value;
  }
  settingsObj[0].fontFamily = fonts.options[fonts.selectedIndex].value;
  saveToStorageSettings();
});

// Set ranges and values of the html setting page's elements according to the values from localStorage
function setSettingValues(){
  // Navbar
  if(storageSettings[0].navColor) document.getElementById('navBackColors' + storageSettings[0].navColor).checked = true; // Check the radio
  // Aside
  if(storageSettings[0].asideColor) document.getElementById('asideColorRange').value = storageSettings[0].asideColor;
  // Notes
  if(storageSettings[0].noteColors){
      const numbers = storageSettings[0].noteColors.slice(4, storageSettings[0].noteColors.length -1); // Ex. 50, 50, 50 instead of rgb(50, 50, 50)
      document.getElementById('noteColorR').value = numbers.split(',')[0]; // Ex. 50
      document.getElementById('noteColorG').value = Number(numbers.split(',')[1]); // Number used to get rig of the space before the number. Ex. ,50 instead of , 50
      document.getElementById('noteColorB').value = Number(numbers.split(',')[2]);
      noteColorText.textContent = storageSettings[0].noteColors;
  }
  // Note titles
  if(storageSettings[0].titleSizes) document.getElementById('titleSizeRange').value = storageSettings[0].titleSizes;
  // Note contents
  if(storageSettings[0].contentSizes) document.getElementById('contentSizeRange').value = storageSettings[0].contentSizes;
  // Note borders
  if(storageSettings[0].noteBorderSwitch == 'true'){
      document.getElementById('slideButtonSeek').classList.add('buttonOn');
      buttonSeek.isOne = true;
      for(let i = 0; i < document.getElementsByClassName('note').length; i++)
      document.getElementsByClassName('note')[i].style.border = `${storageSettings[0].noteBorderType} 2px hsl(0, 0%, ${storageSettings[0].noteBorderColor}%)`;
  }
  if(storageSettings[0].noteBorderType) document.getElementById('borderList').value = storageSettings[0].noteBorderType;
  if(storageSettings[0].noteBorderColor) document.getElementById('borderRange').value = storageSettings[0].noteBorderColor;
  borderShape = storageSettings[0].noteBorderType;
  // Font family
  if(storageSettings[0].fontFamily) fonts.value = storageSettings[0].fontFamily;
}
if(storageSettings != null) setSettingValues();