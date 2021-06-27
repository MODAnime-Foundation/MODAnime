<script>
  import IcoGear from '../Icons/IcoGear.svelte';
  import IcoMusicNote from '../Icons/IcoMusicNote.svelte';
  import IcoDownload from '../Icons/IcoDownload.svelte';
</script>

<div class="text-gray-400 font">
  <IcoGear width="80" height="80" />
  <br /><br />
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mr-12">
    <div class="grid-option text-green-600 hover:bg-green-600 border-green-600">
      <IcoMusicNote /> &nbsp;&nbsp; Music settings
    </div>
    <div
      class="grid-option text-indigo-500 hover:bg-indigo-500 border-indigo-500"
    >
      <IcoDownload /> &nbsp;&nbsp; Download settings
    </div>
  </div>
</div>

<style lang="postcss">
  .grid-option {
    @apply flex flex-row border rounded-md p-4 justify-center;
    &:hover {
      @apply text-white shadow-lg;
    }
  }
</style>
