<template>
    <div class="mt-4 bg-white shadow">
        <!-- Header Section -->
        <div class="p-4 border-b border-gray-200">
            <div class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h2 class="text-xl font-bold text-violet-600">Event Subscribers</h2>
                    <p class="text-xs text-gray-500">View all subscribers for this event</p>
                </div>
                <div class="flex items-center gap-2">
                    <button
                        class="px-3 py-1.5 text-sm bg-violet-50 text-violet-700 rounded hover:bg-violet-100 transition-colors">
                        Export
                    </button>
                    <!-- <button
                        class="px-3 py-1.5 text-sm bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors">
                        Add New
                    </button> -->
                </div>
            </div>
        </div>

        <!-- Filters Section -->
        <div class="p-3 border-b border-gray-200">
            <div class="flex flex-col justify-between gap-3 sm:flex-row">
                <div class="relative flex-grow max-w-md">
                    <input type="text" v-model="searchQuery" placeholder="Search subscribers..."
                        class="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div class="flex items-center gap-2">
                    <input type="date" v-model="dateFilter"
                        class="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
            </div>
        </div>

        <!-- Table Section -->
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>

                        <th class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Subscriber</th>

                        <th class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Registered At</th>
                        <th class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Source</th>
                        <th class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Status</th>
                        <th class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Payment</th>
                    </tr>
                </thead>

                <tbody :v-if="filteredSubscribers.length > 0" class="bg-white divide-y divide-gray-200">
                    <tr v-for="subscriber in filteredSubscribers" :key="subscriber.id" class="hover:bg-gray-50">
                        <td class="px-4 py-2 whitespace-nowrap">
                            <div class="flex items-center">
                                <img :src="subscriber.avatar" alt="" class="w-8 h-8 rounded-full" />
                                <div class="ml-3">
                                    <div class="text-sm font-medium text-gray-900">{{ subscriber.name }}</div>
                                    <div class="text-xs text-gray-500">{{ subscriber.email }}</div>
                                </div>
                            </div>
                        </td>

                        <td class="px-4 py-2 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ subscriber.registeredAt }}</div>
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ subscriber.source }}</div>
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap">
                            <span class='px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800'>
                                {{ subscriber.status }}
                            </span>
                        </td>
                        <td class="px-4 py-2 text-sm text-gray-900 whitespace-nowrap">
                            {{ subscriber.payment }}
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
      

       </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const dateFilter = ref('')

const subscribers = ref([
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-001',
        registeredAt: '2023-12-10',
        source: 'Website',
        status: 'Confirmed',
        payment: '$99.00'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-002',
        registeredAt: '2023-12-09',
        source: 'Email',
        status: 'Pending',
        payment: '$49.00'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-003',
        registeredAt: '2023-12-08',
        source: 'Social Media',
        status: 'Confirmed',
        payment: '$75.00'
    },
    {
        id: 4,
        name: 'Bob Brown',
        email: 'bob@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-004',
        registeredAt: '2023-12-07',
        source: 'Referral',
        status: 'Cancelled',
        payment: '$0.00'
    },
    {
        id: 5,
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-005',
        registeredAt: '2023-12-06',
        source: 'Website',
        status: 'Confirmed',
        payment: '$120.00'
    },
    {
        id: 6,
        name: 'Diana Evans',
        email: 'diana@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-006',
        registeredAt: '2023-12-05',
        source: 'Email',
        status: 'Pending',
        payment: '$80.00'
    },
    {
        id: 7,
        name: 'Edward Green',
        email: 'edward@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-007',
        registeredAt: '2023-12-04',
        source: 'Social Media',
        status: 'Confirmed',
        payment: '$65.00'
    },
    {
        id: 8,
        name: 'Fiona Harris',
        email: 'fiona@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-008',
        registeredAt: '2023-12-03',
        source: 'Referral',
        status: 'Confirmed',
        payment: '$150.00'
    },
    {
        id: 9,
        name: 'George King',
        email: 'george@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-009',
        registeredAt: '2023-12-02',
        source: 'Website',
        status: 'Cancelled',
        payment: '$0.00'
    },
    {
        id: 10,
        name: 'Hannah Lee',
        email: 'hannah@example.com',
        avatar: 'https://via.placeholder.com/50',
        reference: 'EV-2023-010',
        registeredAt: '2023-12-01',
        source: 'Email',
        status: 'Confirmed',
        payment: '$95.00'
    }
]);

const filteredSubscribers = computed(() => {
    return subscribers.value.filter(subscriber => {
        const matchesSearch = subscriber.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            subscriber.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            subscriber.reference.toLowerCase().includes(searchQuery.value.toLowerCase())

        const matchesDate = !dateFilter.value || subscriber.registeredAt === dateFilter.value

        return matchesSearch && matchesDate
    })
})
</script>