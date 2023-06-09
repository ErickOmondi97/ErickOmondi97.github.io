//MENU
//Show Menu
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      nav.classList.toggle('show-menu')
    })
  }
}


showMenu('nav-toggle','nav-menu')

//Remove Menu
 
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

//SCROLL
//Scroll Sections Active Link
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
  const scrollY = window.pageYOffset

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
    }else{
        document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }

  })
}

window.addEventListener('scroll', scrollActive)

//scroll top
function scrollTop(){
  const scrollTop = document.getElementById('scroll-top');
  // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

//DARK/LIGHT THEME
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

//Reduce Size and Print on an A4 Sheet
function scaleResume(){
  document.body.classList.add('scale-resume')
}

function removeResume(){
  document.body.classList.remove('scale-resume')
}

//Remove Scale
function removeScale(){
  document.body.classList.remove('scale-resume')
}

//GENERATE PDF
//PDF Generated area
let areaResume = document.getElementById('area-resume')

let resumeButton = document.getElementById('resume-button')

//html2pdf options
let opt = {
  margin:       0,
  filename:     'Erick Omondi\'s Resume.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 4 },
  jsPDF:        { format: 'a5', orientation: 'portrait'}
};


//This function calls areaResume and html2pdf options
function  generateResume(){
  html2pdf(areaResume,opt)
}

//when the resume button is clicked, it executes three function
resumeButton.addEventListener('click', () => {
  //1.class is added to body
  scaleResume()

  //2.pdf is generate
  generateResume()

  //3.scale removed from body after 5seconds to return to normal
  setTimeout(removeScale, 5000)
  }
)
