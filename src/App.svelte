<script>
  import IcoHome from './Icons/IcoHome.svelte';
  import IcoMonitor from './Icons/IcoMonitor.svelte';
  import IcoNews from './Icons/IcoNews.svelte';
  import IcoDownload from './Icons/IcoDownload.svelte';
  import IcoBargraph from './Icons/IcoBargraph.svelte';
  import IcoGear from './Icons/IcoGear.svelte';
  import IcoMusicNote from './Icons/IcoMusicNote.svelte';

  import Router, { push, pop } from 'svelte-spa-router';
  import Home from './Components/Home.svelte';
  import Watch from './Components/Watch.svelte';
  import News from './Components/News.svelte';
  import Downloads from './Components/Downloads.svelte';
  import Libstats from './Components/Libstats.svelte';
  import Settings from './Components/Settings.svelte';
  import Music from './Components/Music.svelte';

  const api = window.api,
    routes = {
      '/': Home,
      '/watch': Watch,
      '/news': News,
      '/downloads': Downloads,
      '/libstats': Libstats,
      '/settings': Settings,
      '/music': Music,
    };

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
      let key = event.key;
      if (key === 'h') push('/');
      else if (key === 'w') push('/watch');
      else if (key === 'n') push('/news');
      else if (key === 'd') push('/downloads');
      else if (key === 'l') push('/libstats');
      else if (key === 's') push('/settings');
      else if (key === 'm') push('/music');
      else if (key === 'z') pop();
    }
  });
</script>

<nav class="flex flex-row bg-gray-800 text-gray-200 p-[0.20em] fixed drag">
  <svg
    on:click={() => api.send('titlebar', 'destroy')}
    class="titlebar-icon nodrag"
  >
    <circle cx="6" cy="6" r="6" fill="#ff5c5c" />
  </svg>
  <svg
    on:click={() => api.send('titlebar', 'minimize')}
    class="titlebar-icon nodrag"
  >
    <circle cx="6" cy="6" r="6" fill="#ebbb10" />
  </svg>
  <svg
    on:click={() => api.send('titlebar', 'resize')}
    class="titlebar-icon nodrag"
  >
    <circle cx="6" cy="6" r="6" fill="#1ed960" />
  </svg>
</nav>
<br />

<div class="flex flex-row h-[96.4vh] nodrag">
  <div class="flex flex-col justify-between items-center w-16 p-6 bg-gray-800">
    <div class="flex flex-col space-y-4 text-gray-400">
      <span on:click={() => push('/')} class="sidebar-button">
        <IcoHome />
      </span>
      <br />
      <span on:click={() => push('/watch')} class="sidebar-button">
        <IcoMonitor />
      </span>
      <br />
      <span on:click={() => push('/music')} class="sidebar-button">
        <IcoMusicNote />
      </span>
      <br />
      <span on:click={() => push('/news')} class="sidebar-button">
        <IcoNews />
      </span>
      <br />
      <span on:click={() => push('/downloads')} class="sidebar-button">
        <IcoDownload />
      </span>
      <br />
      <span on:click={() => push('/libstats')} class="sidebar-button">
        <IcoBargraph />
      </span>
    </div>
    <div class="flex flex-col space-y-4 text-gray-400">
      <span on:click={() => push('/settings')} class="sidebar-button">
        <IcoGear />
      </span>
    </div>
  </div>

  <div class="flex-auto bg-gray-900 pt-4 pl-12">
    <Router {routes} />
  </div>
</div>

<style global type="text/postcss">
  @tailwind base;
  @tailwind components;
  body {
    @apply bg-gray-900;
  }
  .titlebar-icon {
    margin: 4px 2px 4px 4px;
    cursor: pointer;
    height: 0.82em;
    width: 0.82em;
  }
  .sidebar-button > svg {
    transition: color 0.15s;
  }
  .sidebar-button > svg:hover {
    @apply text-gray-600;
  }
  @tailwind utilities;
</style>
