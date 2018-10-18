const apiKey = '6f4fa5447bb24a2687edecc4c1df43b4';
const defaultSource = 'the-washington-post';
//const sourceSelector = document.querySelector('#sources');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e => {
  //sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
  //updateNewsSources().then(() => {
    //sourceSelector.value = defaultSource;
    //updateNews();
  //});
});

window.addEventListener('online', () => updateNews(sourceSelector.value));

async function updateNewsSources() {
  const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
  const json = await response.json();
  sourceSelector.innerHTML =
    json.sources
      .map(source => `<option value="${source.id}">${source.name}</option>`)
      .join('\n');
}


