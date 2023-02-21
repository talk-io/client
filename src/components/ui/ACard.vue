<template>
  <div class="flex gap-6 border-[1px] border-card p-6 rounded-md">
    <div class="flex flex-col gap-2 items-left w-72 justify-center border-solid border-r-2 border-hr">
      <slot name="title"/>
    </div>
    <slot/>
  </div>
</template>