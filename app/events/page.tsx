import { EventType } from "@/types/EventType";

async function getData() {
    const res = await fetch(`http://localhost:3000/api/samples/events`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page() {
    const event: EventType[] = await getData();
    return <div>{JSON.stringify(event)}</div>;
}
