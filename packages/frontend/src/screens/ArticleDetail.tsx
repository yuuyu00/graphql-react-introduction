import { useParams } from "react-router-dom";

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();

  return <div>ArticleDetail</div>;
};
