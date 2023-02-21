<template>
  <div class="flex flex-col gap-3 py-6 w-full h-screen items-center justify-center overflow-y-hidden bg-input">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
          <Suspense>
            <!-- main content -->
            <div v-auto-animate>
              <component :is="Component" class="w-[48rem]"></component>
            </div>

            <!-- loading state -->
            <template #fallback>
              Loading...
            </template>
          </Suspense>
      </template>
    </RouterView>
  </div>
</template>