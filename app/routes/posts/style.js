import styled from "@emotion/styled";

export const Prose = styled.div`
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.8;
  font-size: 1.12rem;

  p {
    margin: 1.25em 0;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 2em 0 1em 0;
    font-weight: 600;
    line-height: 1.2;
  }
  ul, ol {
    margin: 1.25em 0 1.25em 2em;
    padding: 0;
  }
  img.content-image {
    display: block;
    margin: 2em auto;
    max-width: 100%;
    width: 90vw;
    max-width: 640px;
    border-radius: 18px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.05);
    object-fit: cover;
  }
  pre {
    margin: 1.5em 0;
  }
  blockquote {
    margin: 1.5em 0;
    padding: 1em;
    background: #f5f7fa;
    border-left: 4px solid #6ab7ff;
    color: #222;
    border-radius: 0 8px 8px 0;
  }
  @media (max-width: 700px) {
    font-size: 1em;
    img.content-image {
      width: 100vw;
      max-width: 98vw;
    }
  }
`;

export const ImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem 0;

  img {
    max-width: 700px;
    width: 100%;
    border-radius: 1rem;
    box-shadow: 0 4px 28px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.12);
    object-fit: cover;
    background: #eee;
  }

  .caption {
    color: #888;
    font-size: 0.95em;
    margin-top: 0.6em;
    text-align: center;
  }
  
  @media (max-width: 900px) {
    img {
      max-width: 100vw;
      border-radius: 0.6rem;
    }
  }
`;

export const CodeSpan = styled.span`
  background-color: #263238;
  color: #f8f8f2;
  padding: 0.2em 0.2em;
  border-radius: 4px;
  font-family: monospace;
`;

export const CodeBlock = styled.pre`
  background-color: #263238;
  color: #eeffff;
  padding: 1em;
  border-radius: 4px;
  font-family: "Fira Code", "Consolas", "Monaco", "Courier New", Courier,
    monospace;
  font-size: 0.9em;
  white-space: pre-wrap;
  overflow-x: auto;
  line-height: 1.5;
  &.line-numbers {
    padding-left: 3.8em;
  }

  .token.keyword {
    color: #c792ea;
  }
  .token.operator {
    color: #89ddff;
  }
  .token.string {
    color: #c3e88d;
  }
  .token.function {
    color: #82aaff;
  }
  .token.comment {
    color: #546e7a;
  }
  .token.punctuation {
    color: #89ddff;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .control,
  .directive,
  .unit {
    color: #ffcb6b;
  }
  .token.string,
  .token.inserted {
    color: #c3e88d;
  }
  .token.number {
    color: #f78c6c;
  }
  @media (max-width: 768px) {
    font-size: 0.8em;
    padding: 0.5em;
  }
`;
