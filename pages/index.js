import fetch from "isomorphic-fetch";
import Error from "next/error";
import Link from "next/link";
import StoryList from "../components/storyList";
import Layout from "../components/layout";

class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;
    try {
      page = Number(query.page) || 1;
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
      stories = await response.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }

    return {
      stories,
      page,
    };
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(" service worker succesfull ", registration);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const { stories, page } = this.props;
    if (!stories.length) {
      return <Error statusCode={503} />;
    }

    return (
      <div>
        <Layout title="Hacker Next" description="This is a hacker new clone">
          <StoryList stories={stories} />
          <footer>
            <Link href={`/?page=${page + 1}`}>
              <a>Next Page ({page + 1})</a>
            </Link>
          </footer>
          <style jsx>{`
            footer {
              padding: 1em;
            }

            footer a {
              font-weight: bold;
              color: black;
              text-decoration: none;
            }
          `}</style>
        </Layout>
      </div>
    );
  }
}

export default Index;
