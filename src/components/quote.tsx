import like from "../../public/like.svg";
import dislike from "../../public/dislike.svg";
import Image from 'next/image';
interface QuoteProps {
  quote: string;
  authorName: string;
  likeNumber: number;
  dislikeNumber: number;
}

export default function Quote(props: QuoteProps) {
  return (
    <li className="flex flex-row justify-between shadow-md bg-slate-50 border-2 rounded-xl py-4 px-6 m-8">
      <div>
        <p className="text-5xl font-semibold">{props.quote}</p>
        <p className="text-lg text-gray-600">{props.authorName}</p>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col px-4">
          <p className="text-center text-xl font-semibold">{props.likeNumber}</p>
          <Image className="py-2 px-2 rounded-2xl bg-slate-200 shadow-lg hover:cursor-pointer" width={60} src={like} alt="like image"/>
        </div>
        <div className="flex flex-col px-4">
          <p className="text-center text-xl font-semibold">{props.dislikeNumber}</p>
          <Image className="py-2 px-2 rounded-2xl bg-slate-200 shadow-lg hover:cursor-pointer" width={60} src={dislike} alt="dislike image"/>
        </div>
      </div>
    </li>
  );
}
