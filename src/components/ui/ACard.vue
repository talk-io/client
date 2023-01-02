<template>
  <div class="flex flex-col gap-6 border-[1px] border-card p-6 rounded-md">
    <div class="flex flex-col gap-2 items-left">
      <slot name="title"/>
    </div>
    <slot/>
  </div>
</template>