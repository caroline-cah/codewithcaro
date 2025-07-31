import { Link } from "remix";
import { useLoaderData } from "remix";
import invariant from "tiny-invariant";
import styles from "~/styles/index.css";
import { datoQuerySubscription } from "~/lib/datocms";
import { responsiveImageFragment, metaTagsFragment } from "~/lib/fragments";
import { Avatar, links as avatarLinks } from "~/components/Avatar";
import { Date, links as dateLinks } from "~/components/Date";
import { Image, toRemixMeta, useQuerySubscription } from "react-datocms";
import { CodeSpan, CodeBlock, ImageBlock, Prose } from "./style";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import { useEffect } from "react";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

export function links() {
  return [
    ...avatarLinks(),
    ...dateLinks(),
    { rel: "stylesheet", href: styles },
  ];
}

export const loader = async ({ request, params }) => {
  invariant(params.slug, "expected params.slug");

  return datoQuerySubscription({
    request,
    query: `
    query PostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        seo: _seoMetaTags {
          ...metaTagsFragment
        }
        title
        slug
        youtube {
          height
          provider
          providerUid
          thumbnailUrl
          title
          url
          width
        }
        content {
          value
          blocks {
            __typename
            ... on ImageBlockRecord {
              id
              image {
                url
                alt
                title
              }
            }
          }
        }
        date
        ogImage: coverImage {
          url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
        }
        coverImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        author {
          name
          picture {
            url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
          }
        }
      }
      morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
        title
        slug
        excerpt
        date
        coverImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        author {
          name
          picture {
            url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
          }
        }
      }
    }
    ${responsiveImageFragment}
    ${metaTagsFragment}
    `,
    variables: {
      slug: params.slug,
    },
  });
};

export const meta = ({
  data: {
    datoQuerySubscription: {
      initialData: { post },
    },
  },
}) => {
  return toRemixMeta(post.seo);
};

export default function PostSlug() {
  const { datoQuerySubscription } = useLoaderData();
  const {
    data: { post, morePosts },
  } = useQuerySubscription(datoQuerySubscription);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const renderContent = (content) => {
    if (!content || !content.value || !content.value.document || !Array.isArray(content.value.document.children)) {
      return <p>No content found.</p>;
    }
    const blocksById = {};
    if (content.blocks && Array.isArray(content.blocks)) {
      for (const block of content.blocks) {
        if (block && block.id) {
          blocksById[block.id] = block;
        }
      }
    }

    return content.value.document.children.map((item, idx) => {
      if (item.type === "paragraph") {
        return (
          <p key={idx}>
            {item.children.map((child, cIdx) =>
              child.marks && child.marks.includes("code")
                ? <CodeSpan key={cIdx}>{child.value}</CodeSpan>
                : <span key={cIdx}>{child.value}</span>
            )}
          </p>
        );
      }

      if (item.type && item.type.startsWith("heading")) {
        const HeadingTag = `h${item.level}`;
        return (
          <HeadingTag key={idx}>
            {item.children.map((child, cIdx) => (
              <span key={cIdx}>{child.value}</span>
            ))}
          </HeadingTag>
        );
      }

      if (item.type === "code") {
        const language = item.language || "javascript";
        return (
          <CodeBlock className="line-numbers" key={idx}>
            <code className={`language-${language}`}>{item.code}</code>
          </CodeBlock>
        );
      }

      if (item.type === "block" && item.item) {
        const block = blocksById[item.item];
        if (block && block.image && block.image.url) {
          return (
            <ImageBlock key={block.id}>
              <img
                src={block.image.url}
                alt={block.image.alt || ""}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  margin: "2rem auto",
                  borderRadius: "12px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)"
                }}
              />
              {block.image.title && (
                <span className="caption" style={{
                  display: "block",
                  textAlign: "center",
                  color: "#888",
                  fontSize: "0.95em",
                  marginTop: "0.5em"
                }}>
                  {block.image.title}
                </span>
              )}
            </ImageBlock>
          );
        }
      }

      return null;
    });
  };


  const renderYouTubeSection = () => {
    if (!post.youtube) return null;
    const embedUrl = `https://www.youtube.com/embed/${post.youtube.providerUid}`;
    return (
      <section className="section">
        <div>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
            }}
          >
            <iframe
              src={embedUrl}
              title={post.youtube.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="container">
      <section className="section">
        <Link to="/" className="grid__link">
          <p className="section__title">CodewCaro.</p>
        </Link>
      </section>
      <section className="section">
        <h1 className="title">{post.title}</h1>
      </section>
      <section className="section">
        <Avatar name={post.author.name} picture={post.author.picture} />
      </section>
      <Image className="grid__image" data={post.coverImage.responsiveImage} />
      <section className="section--narrow">
        <Date dateString={post.date} />
      </section>
      <section className="section--narrow">
        <Prose>
          {renderContent(post.content)}
        </Prose>
      </section>
      {renderYouTubeSection()}
      <section className="section">
        <div className="section__title">More posts</div>
        <ul className="grid">
          {morePosts.map((p) => (
            <li key={p.slug} className="grid__item">
              <Link to={`/posts/${p.slug}`} className="grid__link">
                <div>
                  <Image
                    className="grid__image"
                    data={p.coverImage.responsiveImage}
                  />
                  <p className="grid__title">{p.title}</p>
                  <Date dateString={p.date} />
                  <p className="date">{p.excerpt}</p>
                  <Avatar
                    name={p.author.name}
                    picture={p.author.picture}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
