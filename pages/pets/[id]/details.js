import { useRouter } from "next/router";
import useSWR from "swr";
import PetDisplay from "@/components/PetDisplay";
import PetNav from "@/components/PetNav";
import PetForm from "@/components/PetForm";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import PetHeader from "@/components/PetHeader";

export default function PetDetails({ onDeleteName }) {
  const formRef = useRef(null);
  const deleteBoxRef = useRef(null);
  useEffect(() => {
    if (deleteBoxRef?.current) {
      deleteBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (formRef?.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const router = useRouter();
  const { id } = router.query;
  const {
    data: pet,
    error,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/pets/${id}/details` : null);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [showPetForm, setShowPetForm] = useState(false);

  if (!id) return <p>Warte auf ID...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load pet data</p>;
  if (!pet) return <p>No pet found.</p>;

  async function handleEditPet(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const petData = Object.fromEntries(formData);
    const formattedPetData = {
      appearance: {
        colors: [
          petData.firstColor,
          petData.secondColor,
          petData.thirdColor,
        ].filter(Boolean),
        height: parseInt(petData.height),
        width: parseInt(petData.width),
        shape: parseInt(petData.shape),
        borderColor: petData.borderColor,
        borderStrength: parseInt(petData.borderStrength),
        borderStyle: petData.borderStyle,
      },
      details: {
        name: petData.name,
        birthTime: pet.birthTime,
        character: petData.character,
        description: petData.description,
      },
    };
    const response = await fetch(`/api/pets/${id}/details`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedPetData),
    });
    if (response.ok) mutate();
    setShowPetForm(false);
  }

  async function handleConfirm() {
    const response = await fetch(`/api/pets/${pet._id}/details`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Delete failed");
      return;
    }
    onDeleteName(pet.details.name);
    router.push("/");
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <PetHeader name={pet.details.name} />

      <Container>
        <StyledWrapperFirstDetails>
          <PetDisplay
            appearance={pet.appearance}
            dimensions={250}
            hasBorder={true}
          />
        </StyledWrapperFirstDetails>

        <StyledWrapperSecondDetails>
          <DetailText>
            <strong>Age:</strong> {pet.details.age}{" "}
            {pet.details.age === 1 ? "Year" : "Years"}
          </DetailText>
          <DetailText>
            <strong>Character:</strong> {capitalize(pet.details.character)}
          </DetailText>
          <DetailText>
            <strong>Description:</strong> {capitalize(pet.details.description)}
          </DetailText>
        </StyledWrapperSecondDetails>

        <ButtonWrapper>
          <StyledButton
            $variant="modify"
            onClick={() =>
              showPetForm
                ? setShowPetForm(false)
                : (setShowPetForm(true), setShowDeleteBox(false))
            }
          >
            {showPetForm ? "Cancel" : "Edit Pet"}
          </StyledButton>
          <StyledButton
            $variant="delete"
            onClick={() =>
              showDeleteBox
                ? setShowDeleteBox(false)
                : (setShowDeleteBox(true), setShowPetForm(false))
            }
          >
            {showDeleteBox ? "Cancel" : "Release Pet"}
          </StyledButton>
        </ButtonWrapper>
        {showDeleteBox && (
          <StyledDeleteBox ref={deleteBoxRef}>
            <p>Do you really want to release your Pet?</p>
            <StyledButton $variant="delete" onClick={handleConfirm}>
              Yes
            </StyledButton>
            <StyledButtonQuit
              $variant="no"
              onClick={() => setShowDeleteBox(false)}
            >
              No
            </StyledButtonQuit>
          </StyledDeleteBox>
        )}
        {showPetForm && (
          <PetForm
            onSubmit={handleEditPet}
            onClose={() => setShowPetForm(false)}
            currentData={pet}
            formRef={formRef}
          />
        )}
      </Container>
      <PetNav />
    </>
  );
}

const Container = styled.section`
  padding: 0 24px 0;
  margin-bottom: 80px;
`;

const StyledWrapperFirstDetails = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledWrapperSecondDetails = styled.section`
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 50px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(1px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const DetailText = styled.p`
  margin: 0.5rem 0;
  line-height: 1.4;
  font-size: 0.95rem;
  color: #333;
`;

const StyledButton = styled.button`
  border: 3px solid
    ${({ $variant }) => ($variant === "delete" ? "#ff3021" : "#5885da")};
  color: ${({ $variant }) => ($variant === "delete" ? "#ff3021" : "#5885da")};
  background-color: #fff;
  font-size: 16px;
  border-radius: 6px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.1s, color 0.1s, transform 0.1s;

  &:active {
    background-color: ${({ $variant }) =>
      $variant === "delete" ? "#ff3021" : "#5885da"};
    color: white;
    transform: scale(0.95);
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StyledDeleteBox = styled.div`
  font-family: Nunito, sans-serif;
  z-index: 1;
  background-color: #fff;
  border: 3px solid #ff3021;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 10px;
  text-align: center;
`;

const StyledButtonQuit = styled.button`
  font-size: 16px;
  border: 3px solid #aaa;
  color: #aaa;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px 20px;
  font-weight: 600;
  margin-left: 1em;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.2s;

  &:active {
    background-color: #aaa;
    color: #fff;
    transform: scale(0.95);
  }
`;
