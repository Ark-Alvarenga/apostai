export async function fetchSSRData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();

    return { props: { data } };
}