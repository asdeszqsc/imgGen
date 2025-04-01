import { useState } from "react";
import styled from "styled-components";
import { request } from "./interface";

const SAMPLE_TEXT =
  "Cartoon render of a gray cat with green eyes perched on a thick branch of a leafy tree, set in a suburban backyard during the day. The cat's fur is slightly ruffled by a gentle breeze, and it is looking directly at the viewer. The background features a sunny sky with a few clouds and other trees, creating a natural and serene environment. The scene is focused on the cat, with no distracting foreground elements, ensuring the cat remains the central subject of the image.";

function App() {
  const [reqText, setReqText] = useState(SAMPLE_TEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const submit = async () => {
    setIsLoading(true);
    const res = await request({
      method: "GET",
      url: `/genImage?query=${reqText}`,
    });
    if (res) {
      setIsLoading(false);
      setImageLink(res.url);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <Container>
        <ContentsBox>
          <Content>
            <Textarea
              value={reqText}
              onChange={(e) => setReqText(e.target.value)}
              placeholder={SAMPLE_TEXT}
            />
          </Content>
          <button onClick={submit}>이미지 생성하기</button>
          <a href="https://asdeszqsc.tistory.com" target="_blank">
            이미지 생성기 by asdeszqsc
          </a>
          한글도 가능합니다
        </ContentsBox>
        <ContentsBox>
          <Content>
            {isLoading ? "이미지 생성 중" : <img src={imageLink} />}
          </Content>
        </ContentsBox>
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ContentsBox = styled.div`
  height: 80%;
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > a {
    margin-top: 40px;
    width: fit-content;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 8px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  resize: none;
`;

export default App;
