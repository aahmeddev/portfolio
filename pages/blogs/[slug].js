import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// This is your page component
export default function BlogPostPage(props) {
  // Pass the data from getStaticProps to the useTina hook
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  // data.post comes from your collection name: "post"
  const { post } = data;

  return (
    <main>
      {/* This component is now live-editable */}
      <article>
        <h1>{post.title}</h1>
        <div>
          <TinaMarkdown content={post.body} />
        </div>
      </article>
    </main>
  );
}

// This runs at build-time to fetch data
export const getStaticProps = async ({ params }) => {
  const { data, query, variables } = await client.queries.post({
    relativePath: `${params.slug}.md`,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};

// This tells Next.js which blog post pages to build
export const getStaticPaths = async () => {
  const { data } = await client.queries.postConnection();
  const paths = data.postConnection.edges.map((edge) => ({
    params: { slug: edge.node._sys.filename },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};