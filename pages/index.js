import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #4a90e2;
  margin-bottom: 20px;
`;

const NewsBanner = styled.div`
  background-color: #e1ecf9;
  color: #2c3e50;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  margin-bottom: 30px;
`;

const GreetingSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 30px;
`;

const TextContent = styled.div`
  flex: 1;
  min-width: 250px;
`;

const Greeting = styled.h2`
  color: #4a90e2;
  font-size: 24px;
`;

const ImagePlaceholder = styled.div`
  width: 128px;
  height: 96px;
  background-color: #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  color: ${(props) => (props.variant === "blue" ? "#4a90e2" : "#e91e63")};
  border-color: ${(props) =>
    props.variant === "blue" ? "#4a90e2" : "#e91e63"};

  &:hover {
    background-color: ${(props) =>
      props.variant === "blue" ? "#e1ecf9" : "#fce4ec"};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border: 2px solid #4a90e2;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 auto 12px;
`;

const PetName = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
`;

const NeedBar = styled.div`
  height: 8px;
  border-radius: 4px;
  margin: 3px 0;
  background-color: ${(props) => props.color};
`;

export default function HomePage() {
  const mockNews = [
    "Tier Bär hat Hunger",
    "Tier Hund will spielen",
    "Tier Drache hat Tier Essen bekommen",
  ];

  const mockPets = [
    { id: 1, name: "Bär", needs: ["red", "green", "orange"] },
    { id: 2, name: "Hund", needs: ["red", "orange"] },
    { id: 3, name: "Drache", needs: ["green", "orange"] },
  ];

  return (
    <Container>
      <Logo>LOGO</Logo>

      <NewsBanner>{mockNews.join(" | ")}</NewsBanner>

      <GreetingSection>
        <TextContent>
          <Greeting>Hallo ***</Greeting>
          <p>
            Schön, dass du wieder da bist!
            <br />
            Deine Pets warten schon auf dich
            <br />
            <br />
            Was willst du heute machen?
          </p>
        </TextContent>
        <ImagePlaceholder>Bild</ImagePlaceholder>
      </GreetingSection>

      <ButtonGroup>
        <Button variant="blue">Deine Pets</Button>
        <Button variant="pink">Neues Pet</Button>
      </ButtonGroup>

      <CardGrid>
        {mockPets.map((pet) => (
          <Card key={pet.id}>
            <Avatar />
            <PetName>{pet.name}</PetName>
            <div>
              {pet.needs.map((color, idx) => (
                <NeedBar key={idx} color={color} />
              ))}
            </div>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
}
