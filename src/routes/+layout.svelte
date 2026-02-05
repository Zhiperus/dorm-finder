<script lang="ts">
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';
    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

    let { data, children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<QueryClientProvider client={data.queryClient}>
    {@render children()}
    <SvelteQueryDevtools />
</QueryClientProvider>

