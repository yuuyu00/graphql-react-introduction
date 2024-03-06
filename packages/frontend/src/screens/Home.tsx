export const Home = () => {
  return (
    <div className="flex flex-col gap-2">
      <a className="underline hover:text-slate-400" href="/articles">
        Articles
      </a>
      <a className="underline hover:text-slate-400" href="/articles/1">
        Articles 1
      </a>
      <a className="underline hover:text-slate-400" href="/articles/2">
        Articles 2
      </a>
      <a className="underline hover:text-slate-400" href="/articles/3">
        Articles 3
      </a>
    </div>
  );
};
