import styled from "@emotion/styled";

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
