import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import Page from "../components/Page";
import "../styles/style.scss";
import withData from "../lib/withData";
import FavoritesList from "../components/FavoritesList";
function App({ Component, apollo, pageProps: { ...pageProps } }) {
  const [favList, setFavList] = useState([]);

  function addOrRemoveToFavList(place, clear) {
    console.log("place", place);
    if (clear) return setFavList([]);
    setFavList((prevState) => [...prevState, { ...place }]);

    const array = [...favList];
    const index = array.map((place) => place.id).indexOf(place.id);

    if (index !== -1) {
      array.splice(index, 1);
      setFavList(array);
    }
  }

  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component
          {...pageProps}
          setList={(place) => addOrRemoveToFavList(place)}
        />
        {favList.length > 0 ? (
          <FavoritesList
            favList={favList}
            addOrRemoveToFavList={addOrRemoveToFavList}
          />
        ) : null}
      </Page>
    </ApolloProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // this exposes the query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(App);
