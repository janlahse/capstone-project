import Link from "next/link";
import styled from "styled-components";
import PetDisplay from "@/components/PetDisplay";
import NeedsBar from "./NeedsBar";

export default function PetCard({ pet }) {
  return (
    <Link href={`/pets/${pet._id}`} passHref>
      <Card>
        <PetDisplay appearance={pet.appearance} />
        <PetName>{pet.name}</PetName>
          <NeedsWrapper>
            {Object.entries(pet.needs).map(([need, value]) => (
              <NeedsBar key={need} need={need} value={value} />
            ))}
          </NeedsWrapper>
      </Card>
    </Link>
  );
}

function getColor(value) {
  if (value < 30) return "#e74c3c"; 
  if (value < 70) return "#f39c12"; 
  return "#2ecc71"; 
}

const Card = styled.div`
  background: white;
  border: 2px solid #4a90e2;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
`;

const PetName = styled.div`
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const NeedsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NeedBar = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;
