import { useRouter } from "next/router";
import useSWR from "swr";
import PetDisplay from "@/components/PetDisplay";
import PetNav from "@/components/PetNav";
import PetForm from "@/components/PetForm";
import styled from "styled-components";
import { useState } from "react";
import PetHeader from "@/components/PetHeader";

export default function PetDetails() {
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
    router.push("/");
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
            {pet.details.age === 1 ? "year" : "years"}
          </DetailText>
          <DetailText>
            <strong>Character:</strong> {pet.details.character}
          </DetailText>
          <DetailText>
            <strong>Description:</strong> {pet.details.description}
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
            Edit Pet
          </StyledButton>
          <StyledButton
            $variant="delete"
            onClick={() =>
              showDeleteBox
                ? setShowDeleteBox(false)
                : (setShowDeleteBox(true), setShowPetForm(false))
            }
          >
            Release Pet
          </StyledButton>
        </ButtonWrapper>
        {showDeleteBox && (
          <StyledDeleteBox>
            <p>Do you really want to release your pet?</p>
            <StyledButton $variant="delete" onClick={handleConfirm}>
              YES
            </StyledButton>
            <StyledButtonQuit
              $variant="no"
              onClick={() => setShowDeleteBox(false)}
            >
              NO
            </StyledButtonQuit>
          </StyledDeleteBox>
        )}
        {showPetForm && (
          <PetForm
            onSubmit={handleEditPet}
            onClose={() => setShowPetForm(false)}
            currentData={pet}
          />
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
      <PetNav />
    </>
  );
}

const Container = styled.section`
  padding:  0 24px 0 ;
`;

const StyledWrapperFirstDetails = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledWrapperSecondDetails = styled.section`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
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
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: 600;
  margin-bottom: 5%;
`;

const ButtonWrapper = styled.section`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const StyledDeleteBox = styled.div`
  z-index: 1;
  background-color: #fff;
  border: 2px solid #ff3021;
  padding: 1rem;
  margin-top: 0;
  text-align: center;
`;

const StyledButtonQuit = styled.button`
  border: 3px solid #aaa;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: 600;
  margin-bottom: 5%;
  margin-left: 1em;
`;
