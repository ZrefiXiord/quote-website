"use client";

import Header from "@/components/header";
import Quote from "@/components/quote";
import { useEffect, useState } from "react";

interface DataState {
  quotes: any[];
}

export default function Home() {
  const [datas, setDatas] = useState<DataState>();

  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await fetch("/api/quote");
      const data = await res.json();
      setDatas(data);
    };
    fetchQuotes();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 flex-col overflow-y-auto">
        <section className="px-4 py-4">
          <ul>
            {datas?.quotes.map((elt) => (
              <Quote
                key={elt.id}
                quote={elt.content}
                authorName={elt.author.name}
                likeNumber={elt.likesNumber}
                dislikeNumber={elt.dislikesNumber}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
