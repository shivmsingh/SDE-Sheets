import React, { useState, useEffect } from "react";
import { Container, Row, Spacer, Text } from "@nextui-org/react";
import Head from "next/head";
import ThemeToggle from "../components/ThemeToggle";
import Accordion from "../components/Accordion";

const Home = () => {
  const [list, setList] = useState({});

  useEffect(() => {
    const tableData = window.localStorage.getItem(
      "grokking-the-coding-interview"
    );
    if (tableData) {
      setList(JSON.parse(tableData));
    } else {
      fetch("https://sde-sheets.vercel.app/api/grokking-the-coding-interview")
        .then((response) => response.json())
        .then((data) => setList(data));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(list).length !== 0) {
      window.localStorage.setItem(list.slug, JSON.stringify(list));
    }
  }, [list]);

  const handleStatusChange = (patternIndex, questionIndex, status) => {
    let tempValue = { ...list };
    tempValue.patterns[patternIndex].questions[questionIndex].status = status;
    setList(tempValue);
  };

  const handleNotesChange = (patternIndex, questionIndex, notes) => {
    let tempValue = { ...list };
    tempValue.patterns[patternIndex].questions[questionIndex].notes = notes;
    setList(tempValue);
  };

  return (
    <>
      <Head>
        <title>SDE Sheets</title>
        <meta
          name="description"
          content="A simple web app to practise LeetCode questions!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row justify="flex-end">
        <ThemeToggle />
      </Row>
      {Object.keys(list).length !== 0 && (
        <Container md>
          <Row justify="center">
            <Text h1>{list.name}</Text>
          </Row>
          <Spacer />
          <Accordion
            patterns={list.patterns}
            onStatusChange={handleStatusChange}
            onNotesChange={handleNotesChange}
          />
          <Row justify="center" css={{ py: "20px" }}>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
