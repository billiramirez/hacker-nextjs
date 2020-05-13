import fetch from "isomorphic-fetch";
import Error from "next/error";
import StoryList from "../components/storyList";
import Layout from "../components/layout";

class Index extends React.Component {
  static async getInitialProps() {
    let stories;
    try {
      const response = await fetch(
        "https://node-hnapi.herokuapp.com/news?page=1"
      );
      stories = await response.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }

    return {
      stories,
    };
  }

  render() {
    const { stories } = this.props;
    if (!stories.length) {
      return <Error statusCode={503} />;
    }

    return (
      <div>
        <Layout title="Hacker Next" description="This is a hacker new clone">
          <StoryList stories={stories} />
        </Layout>
      </div>
    );
  }
}

export default Index;
