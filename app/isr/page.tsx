// app/page.js (App Router example)
export const revalidate = 60; // ISR enabled, revalidate every 60s

export default async function Page() {
  return <h1>{new Date().toISOString()}</h1>;
}
