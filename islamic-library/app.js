// Tohid Islamic Library
const language = localStorage.getItem('til-lang') || 'en';
document.documentElement.lang = language;
document.documentElement.dir = ['ar','ur'].includes(language) ? 'rtl' : 'ltr';
