<template>
    <Carousel class="" :value="products" :numVisible="2" :numScroll="1" :responsiveOptions="responsiveOptions" circular
        :autoplayInterval="3000">
        <template #item="slotProps">
            <div class="p-4 m-2 rounded border-surface-200 dark:border-surface-700">
                <div class="mb-4">
                    <div class="relative mx-auto">
                        <img :src="'https://i.pinimg.com/474x/7b/35/d7/7b35d705acbf5f92cb94a20b2ce91f41.jpg'"
                            :alt="slotProps.data.name" class="rounded " />
                    </div>
                </div>
            </div>
        </template>
    </Carousel>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Carousel from 'primevue/carousel';


// Simulated ProductService
const ProductService = {
    getProductsSmall() {
        return new Promise((resolve) => {
            // Simulated product data
            const products = [
                { name: 'Product 1', image: 'product1.jpg', price: 29.99, inventoryStatus: 'INSTOCK' },
                { name: 'Product 2', image: 'product2.jpg', price: 39.99, inventoryStatus: 'LOWSTOCK' },
                { name: 'Product 3', image: 'product3.jpg', price: 19.99, inventoryStatus: 'OUTOFSTOCK' },
                { name: 'Product 4', image: 'product4.jpg', price: 49.99, inventoryStatus: 'INSTOCK' },
                { name: 'Product 5', image: 'product5.jpg', price: 59.99, inventoryStatus: 'INSTOCK' },
                { name: 'Product 6', image: 'product6.jpg', price: 89.99, inventoryStatus: 'LOWSTOCK' },
                { name: 'Product 7', image: 'product7.jpg', price: 99.99, inventoryStatus: 'INSTOCK' },
                { name: 'Product 8', image: 'product8.jpg', price: 79.99, inventoryStatus: 'OUTOFSTOCK' },
                { name: 'Product 9', image: 'product9.jpg', price: 89.99, inventoryStatus: 'INSTOCK' },
            ];
            resolve(products);
        });
    }
};

const products = ref([]);
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
});



</script>


<style scoped>
/* .p-carousel-indicator-active 
.p-carousel-indicator-button
{
    background: red !important;
} */
</style>