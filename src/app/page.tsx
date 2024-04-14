"use client";
import styled from "styled-components";

const RedText = styled.span`
  color: red;
`;

export default function page() {
  return <RedText className="text-3xl">Test!</RedText>;
}
