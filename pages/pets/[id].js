import { useRouter } from "next/router";
import useSWR from "swr";
import PetDisplay from "@/components/PetDisplay";
import PetHappiness from "@/components/PetHappiness";
import NeedsBar from "@/components/NeedsBar";
import PetNav from "@/components/PetNav";
import styled from "styled-components";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PetDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: pet, error, isLoading } = useSWR(
    id ? `/api/pets/${id}` : null,
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load pet data</p>;
  if (!pet) return <p>No pet found.</p>;

  return (
    <>
      <StyledHeading>Details</StyledHeading>
      <h2>{pet.name}</h2>

      <StyledWrapperFirstDetails>
        <PetDisplay appearance={pet.appearance} />
        <PetHappiness needs={pet.needs} />
      </StyledWrapperFirstDetails>

      <StyledWrapperSecondDetails>
        <p>
          <strong>Age:</strong> {pet.age}
        </p>
        <p>
          <strong>Character:</strong> {pet.character}
        </p>
        <p>
          <strong>Description:</strong> {pet.description}
        </p>
      </StyledWrapperSecondDetails>

      <StyledNeedsWrapper>
        <NeedsBar need="hunger" value={pet.needs.hunger} />
        <NeedsBar need="energy" value={pet.needs.energy} />
        <NeedsBar need="entertainment" value={pet.needs.entertainment} />
      </StyledNeedsWrapper>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button>Eat</button>
        <button>Sleep</button>
        <button>Play</button>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <StyledButtonModify>Edit Pet</StyledButtonModify>
        <StyledButtonDelete>Release Pet</StyledButtonDelete>
      </div>

      <PetNav />
    </>
  );
}

const StyledHeading = styled.h1`
  text-align: center;
  font-size: 1.75rem;
  width: 100px;
  margin: 0 auto 1em;
  padding-bottom: 0.4rem;
  border-bottom: 3px solid #5885da;
`;

const StyledWrapperFirstDetails = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledWrapperSecondDetails = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const StyledNeedsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const StyledButtonModify = styled.button`
  border: 3px #5885da solid;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: 600;
`;

const StyledButtonDelete = styled(StyledButtonModify)`
  border: 3px #ff3021 solid;
`;
