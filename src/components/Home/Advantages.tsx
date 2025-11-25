import styled from "styled-components";
import { useGetAdvantagesQuery } from "../../api/apiSlice";
import { Container } from "../Layout/Container";
import { Loading } from "../UI/Loading";
import { ErrorMessage } from "../UI/ErrorMessage";
import { getErrorMessage } from "../../types/api";
import type { Advantage, AdvantageRaw, AdvantageData } from "../../types";

const AdvantagesSection = styled.section`
  padding: 3rem 0;

  @media (min-width: 768px) {
    padding: 4rem 0;
  }

  @media (min-width: 992px) {
    padding: 6rem 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textWhite};
  line-height: 1.1;

  @media (min-width: 480px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 992px) {
    font-size: 2.625rem;
    margin-bottom: 3rem;
    line-height: 0.97;
  }

  @media (min-width: 1200px) {
    margin-bottom: 4rem;
  }
`;

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.25rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    gap: 2rem;
    grid-template-columns: repeat(2, minmax(0, 569px));
    justify-content: center;
  }
`;

const AdvantageCard = styled.div`
  background: rgba(18, 31, 35, 0.5);
  border: 2px solid rgba(18, 31, 35, 0.5);
  padding: 1.5rem;
  border-radius: 19px;
  width: 100%;
  transition: transform ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: auto;

  @media (min-width: 768px) {
    padding: 2rem;
    gap: 1.5rem;
  }

  @media (min-width: 992px) {
    padding: 2.5rem 3.25rem;
    gap: 1.875rem;
    min-height: 245px;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const AdvantageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }

  @media (min-width: 992px) {
    gap: 1.875rem;
  }
`;

const AdvantageIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 992px) {
    width: 75px;
    height: 75px;
  }
`;

const AdvantageIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const AdvantageTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.textWhite};
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media (min-width: 992px) {
    font-size: 1.875rem;
    line-height: 1.17;
  }
`;

const AdvantageDescription = styled.p`
  color: ${({ theme }) => theme.colors.textWhite};
  line-height: 1.5;
  font-size: 0.95rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin: 0;
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 992px) {
    font-size: 1.125rem;
    line-height: 1.37;
  }
`;

const defaultAdvantages: Advantage[] = [
  {
    id: 1,
    title: "Оперативность расчётов",
    description:
      "Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки",
    icon: "📊",
  },
  {
    id: 2,
    title: "Производство полного цикла",
    description:
      "Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки",
    icon: "🏭",
  },
  {
    id: 3,
    title: "Большой опыт работы",
    description:
      "Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки",
    icon: "⭐",
  },
  {
    id: 4,
    title: "Полное соответствие чертежам",
    description:
      "Рассчитываем стоимость производства необходимого вам оборудования в течение нескольких часов после заявки",
    icon: "📐",
  },
];

function parseAdvantage(item: AdvantageRaw): Advantage | null {
  try {
    const data: AdvantageData =
      typeof item.value === "string" ? JSON.parse(item.value) : item.value;

    return {
      id: data.id || item.id,
      title: data.title || "",
      description: data.description || "",
      icon: typeof data.icon === "string" && data.icon ? data.icon : null,
    };
  } catch (error) {
    console.error("Error parsing advantage data:", error);
    return null;
  }
}

export function Advantages() {
  const {
    data: advantagesRaw,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAdvantagesQuery();

  const parsedAdvantages = Array.isArray(advantagesRaw)
    ? advantagesRaw
        .map(parseAdvantage)
        .filter((adv): adv is Advantage => adv !== null)
    : [];

  const displayAdvantages =
    parsedAdvantages.length > 0 ? parsedAdvantages : defaultAdvantages;

  if (isLoading) {
    return (
      <AdvantagesSection>
        <Container>
          <Loading fullHeight />
        </Container>
      </AdvantagesSection>
    );
  }

  if (isError && parsedAdvantages.length === 0) {
    return (
      <AdvantagesSection>
        <Container>
          <ErrorMessage
            message={
              getErrorMessage(error) || "Не удалось загрузить преимущества"
            }
            onRetry={refetch}
            fullHeight
          />
        </Container>
      </AdvantagesSection>
    );
  }

  return (
    <AdvantagesSection>
      <Container>
        <SectionTitle>Наши преимущества</SectionTitle>
        <AdvantagesGrid>
          {displayAdvantages.map((advantage, index) => (
            <AdvantageCard key={advantage.id || index}>
              <AdvantageHeader>
                <AdvantageIconWrapper>
                  {advantage.icon && typeof advantage.icon === "string" ? (
                    <AdvantageIconImage
                      src={advantage.icon}
                      alt={advantage.title || "Преимущество"}
                    />
                  ) : (
                    <span role="img" aria-hidden="true">
                      {advantage.icon && typeof advantage.icon === "string"
                        ? advantage.icon
                        : "⭐"}
                    </span>
                  )}
                </AdvantageIconWrapper>
                {advantage.title && typeof advantage.title === "string" && (
                  <AdvantageTitle>{advantage.title}</AdvantageTitle>
                )}
              </AdvantageHeader>
              {advantage.description &&
                typeof advantage.description === "string" && (
                  <AdvantageDescription>
                    {advantage.description}
                  </AdvantageDescription>
                )}
            </AdvantageCard>
          ))}
        </AdvantagesGrid>
      </Container>
    </AdvantagesSection>
  );
}
