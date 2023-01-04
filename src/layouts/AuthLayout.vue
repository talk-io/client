<template>
  <div class="flex flex-col gap-3 w-full h-screen items-center justify-center bg-input">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition name="slide-up">
          <KeepAlive>
            <Suspense>
              <!-- main content -->
              <component :is="Component" class="absolute"></component>

              <!-- loading state -->
              <template #fallback>
                Loading...
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>