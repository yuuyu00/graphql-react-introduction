import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Home } from "./screens/Home";
import { ArticleDetail, ArticleList } from "./screens";

const App = () => {
  const apolloClient = new ApolloClient({
    uri: "http://localhost:9000",
    cache: new InMemoryCache(),
  });

  return (
    <div className="bg-background  min-h-screen min-w-screen text-title px-16 py-12">
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="articles" element={<ArticleList />}></Route>
            <Route path="articles/:id" element={<ArticleDetail />}></Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
};

export default App;
