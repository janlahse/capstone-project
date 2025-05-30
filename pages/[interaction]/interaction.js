import styled from "styled-components";
import PetNav from "@/components/PetNav";
import PetDisplay from "@/components/PetDisplay";

const hannelore = {
  appearance: {
    colors: ["#eee", "#afa", "#199"],
    height: 120,
    width: 100,
    shape: 10,
    borderColor: "#abc",
    borderStrength: 2,
    borderStyle: "solid",
  },
  details: {
    name: "Hannelore",
    age: 0,
    character: "relaxed",
    description: "Likes to go hiking even when it's cloudy outside",
  },
  needs: {
    hunger: 100,
    energy: 100,
    entertainment: 100,
  },
  _id: "68382456fed4bef789127f59",
  __v: 0,
};

export default function InteractionPage() {
  return (
    <>
      <StyledMain>
        <StyledHeader>Pet Name</StyledHeader>
        <PetDisplay appearance={hannelore.appearance} />
        <StyledButtonContainer>
          <StyledButton>Interact</StyledButton>
          <StyledButton>Interact</StyledButton>
          <StyledButton>Interact</StyledButton>
        </StyledButtonContainer>
      </StyledMain>
      <PetNav />
    </>
  );
}

const StyledMain = styled.main`
  display: grid;
  place-items: center;
`;

const StyledHeader = styled.h2`
  padding: 15px;
  width: 200px;
  text-align: center;
  border-bottom: 3px solid #5885da;
`;

const StyledButtonContainer = styled.section`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const StyledButton = styled.button`
  font-family: inherit;
  font-size: 1rem;
  background-color: white;
  padding: 5px 20px;
  border-radius: 2px;
  border: 2px solid #333;
`;
