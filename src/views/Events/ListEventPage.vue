<template>
    <ListEvents />
    <h1 class="text-sm sm:text-xl md:text-3xl">find the perfect Events  one for you!
    </h1>
    <CategoryBarEvent/>
    <ListCardEvent></ListCardEvent>

</template>

<script setup>
import ListEvents from '@/components/Events/SearchBarEvents.vue';
import CategoryBarEvent from '@/components/Events/CategoryBarEvent.vue';
import ListCardEvent from '@/components/Events/ListCardEvent.vue';

</script>

<style scoped></style>